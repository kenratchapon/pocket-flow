import { supabase } from "@/lib/supabase";

export const getTransactions = async (accountId: string)=> {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const { data: transactions, error } = await supabase
    .from('transaction')
    .select('*,category(*)')
    .eq('account_id', accountId)
    .gte('time', new Date(currentYear, currentMonth, 1).toISOString())
    .lte('time', new Date(currentYear, currentMonth + 1, 0).toISOString());

  if (error) {
    throw error;
  }
  const transactionExpense = transactions.filter((item)=>item.category.activity==='Expense')
  return transactionExpense;
};

export const getTransactionsSort = async (accountId: string)=> {

  const {data,error} = await supabase.from('transaction').select('*,category(*)').eq('account_id',accountId).order('time', { ascending: false })

  if (error) {
    throw error;
  }

  return data;
};
