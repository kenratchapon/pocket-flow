import { supabase } from "@/lib/supabase";

export const getTotalBalance = async (accountId: string): Promise<{ month: string, total: number }[]> => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Calculate start and end dates for the current month
  const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
  const endOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0);

  // Calculate start and end dates for the previous month
  const startOfPreviousMonth = new Date(currentYear, currentMonth - 1, 1);
  const endOfPreviousMonth = new Date(currentYear, currentMonth, 0);

  const { data: currentMonthTransactions, error: currentMonthError } = await supabase
    .from('transaction')
    .select('*,category(*)')
    .eq('account_id', accountId)
    .gte('time', startOfCurrentMonth.toISOString())
    .lte('time', endOfCurrentMonth.toISOString());

  const { data: previousMonthTransactions, error: previousMonthError } = await supabase
    .from('transaction')
    .select('*,category(*)')
    .eq('account_id', accountId)
    .gte('time', startOfPreviousMonth.toISOString())
    .lte('time', endOfPreviousMonth.toISOString());

  if (currentMonthError || previousMonthError) {
    console.log('Error fetching data:', currentMonthError || previousMonthError);
    throw currentMonthError || previousMonthError;
  }

  const calculateTotalBalance = (transactions: any[]) => {
    return transactions.reduce((result: number, item: any) => {
      if (item.category.activity === 'Income') {
        result += item.amount;
      } else if (item.category.activity === 'Expense') {
        result -= item.amount;
      }
      return result;
    }, 0);
  };

  const currentMonthBalance = calculateTotalBalance(currentMonthTransactions || []);
  const previousMonthBalance = calculateTotalBalance(previousMonthTransactions || []);

  const resultArray = [
    { month: startOfPreviousMonth.toLocaleString('default', { month: 'long' }), total: previousMonthBalance },
    { month: startOfCurrentMonth.toLocaleString('default', { month: 'long' }), total: currentMonthBalance }
  ];

  return resultArray;
};
