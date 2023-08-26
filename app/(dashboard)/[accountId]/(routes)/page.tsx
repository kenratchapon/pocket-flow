import { getAccountBalance } from '@/actions/get-account-balance'
import { getTotalBalance } from '@/actions/get-total-balance'
import { getTotalExpense } from '@/actions/get-total-expense'
import { getTotalIncome } from '@/actions/get-total-income'
import { getTransactions, getTransactionsSort } from '@/actions/get-transaction'
import { getTransactionExpenseByMonth } from '@/actions/get-transaction-expense-by-month'
import { getTransactionIncomeByMonth } from '@/actions/get-transaction-income-by-month'
import { DashboardAccountBalance } from '@/components/ui/dashboard-account-balance'
import { DashboardTotalTab } from '@/components/ui/dashboard-total-tab'
import { GraphBarChart } from '@/components/ui/graph-bar-chart'
import { Heading } from '@/components/ui/heading'
import ProgressBarExpense from '@/components/ui/progress-bar'
import React from 'react'
import { DashboardTransactionColumn } from './components/column'
import { format, parseISO } from 'date-fns'
import DashBoardTransactionClient from './components/client'
export const revalidate = 0
interface DashboardPageProps {
    params: { accountId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const transactionIncomeByMonth = await getTransactionIncomeByMonth(params.accountId)
    const transactionExpenseByMonth = await getTransactionExpenseByMonth(params.accountId)
    const totalBalance = await getTotalBalance(params.accountId)
    const totalIncome = await getTotalIncome(params.accountId)
    const totalExpense = await getTotalExpense(params.accountId)
    const transactions = await getTransactions(params.accountId)
    const accountBalance = await getAccountBalance(params.accountId)
    const transactionsSort = await getTransactionsSort(params.accountId)

    const formattedTransactions: DashboardTransactionColumn[] = transactionsSort.map((item)=>{
        const timestamp = item.time;
        const dateObject = parseISO(timestamp);
        return{
            id: item.id,
            category: item.category.icon + item.category.name,
            memo: item.memo,
            amount: item.amount,
            activity: item.category.activity,
            time: format(dateObject, "HH:mm:ss dd/LL/yyyy")
    }
    })
    return (
        <div>
            <Heading title="Overview" description="view your pocket flow" />
            <div className='space-y-4 mt-8 grid grid-flow-row'>
                <div className='grid md:grid-rows-6 grid-cols-1 md:grid-cols-12 gap-4'>
                    <div className='rounded-xl bg-white shadow-xl row-span-6 col-span-12 md:col-span-8'>
                        <GraphBarChart graphData1={transactionIncomeByMonth} graphData2={transactionExpenseByMonth}/>
                    </div>
                    <div className='rounded-xl bg-white shadow-xl md:row-span-2 col-span-12 md:col-span-4'>
                        <DashboardTotalTab title='Balance' totalData={totalBalance}/>
                    </div>
                    <div className='rounded-xl bg-white shadow-xl md:row-span-2 col-span-12 md:col-span-4'>
                        <DashboardTotalTab title='Income' totalData={totalIncome}/>
                    </div>
                    <div className='rounded-xl bg-white shadow-xl md:row-span-2 col-span-12 md:col-span-4'>
                        <DashboardTotalTab title='Expense' totalData={totalExpense}/>
                    </div>
                </div>
                <div className='lg:grid lg:grid-cols-12 gap-4'>
                    <div className='grid grid-rows-6 grid-cols-6 gap-4 col-span-8'>
                        <div className='rounded-xl bg-white shadow-xl row-span-6 col-span-3'>
                            <ProgressBarExpense title='Top 5 Expense category' data={transactions}/>
                        </div>
                        <div className='rounded-xl bg-white shadow-xl row-span-3 col-span-3'>
                            <DashboardAccountBalance title='Account Balance' data={accountBalance}/>
                        </div>
                        <div className='rounded-xl bg-white shadow-xl row-span-3 col-span-3'>
                            AI Recommend
                        </div>
                    </div>
                    <div className='grid grid-rows-6 col-span-4 mt-4 lg:mt-0'>
                        <div className='rounded-xl bg-white shadow-xl row-span-6'>
                            <DashBoardTransactionClient data={formattedTransactions}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage