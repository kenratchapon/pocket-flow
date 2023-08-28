import { supabase } from "@/lib/supabase";

interface GraphData {
  name: string;
  total: number;
  category: string;
}

const getDaysInMonth = (year: number, month: number): number => {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  return lastDayOfMonth;
};

export const getTransactionIncomeByMonth = async (accountId: string): Promise<GraphData[]> => {
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

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const dailyBalance: { [key: number]: { total: number; category: string } } = {};

  transactions?.forEach((item) => {
    if (item.category.activity === 'Income') {
      const d = new Date(item.time);
      const day = d.getDate();
      const balanceForTransaction = item.amount;
      const category = item.category.name;

      if (!dailyBalance[day]) {
        dailyBalance[day] = { total: 0, category: '' };
      }

      dailyBalance[day].total += balanceForTransaction;
      dailyBalance[day].category = category;
    }
  });

  const graphData: GraphData[] = Array.from({ length: daysInMonth }, (_, day) => ({
    name: (day + 1).toString(),
    total: dailyBalance[day + 1]?.total || 0,
    category: dailyBalance[day + 1]?.category || '',
  }));

  return graphData;
};