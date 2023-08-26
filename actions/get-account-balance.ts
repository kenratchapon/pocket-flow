import { supabase } from "@/lib/supabase";

export const getAccountBalance = async (accountId: string): Promise<{ accountName: string, totalBalance: number }> => {
    const { data: account } = await supabase.from('account').select().eq('id', accountId);
    const { data: transactions } = await supabase.from('transaction').select('*,category(*)').eq('account_id', accountId);

    const accountName = account?.[0]?.name || 'Unknown Account'; // Providing a default name if account name is not found

    const totalBalance = transactions?.reduce((result, transaction) => {
        if (transaction.category.activity === 'Income') {
            result += transaction.amount;
        } else if (transaction.category.activity === 'Expense') {
            result -= transaction.amount;
        }
        return result;
    }, 0);

    return { accountName, totalBalance };
};