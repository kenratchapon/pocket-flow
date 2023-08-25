

import { getTransactionExpenseByMonth } from '@/actions/get-transaction-expense-by-month'
import { getTransactionIncomeByMonth } from '@/actions/get-transaction-income-by-month copy'
import { GraphLineChart } from '@/components/ui/graph-line-chart'
import { Heading } from '@/components/ui/heading'
import axios from 'axios'
import React from 'react'

interface DashboardPageProps {
    params: { accountId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const transactionIncomeByMonth = await getTransactionIncomeByMonth(params.accountId)
    const transactionExpenseByMonth = await getTransactionExpenseByMonth(params.accountId)

    return (
        <div>
            <Heading title="Overview" description="view your pocket flow" />
            <div className='space-y-4 mt-8'>
                <div className='grid grid-rows-6 grid-cols-12 gap-4 h-[350px]'>
                    <div className='rounded-xl bg-white row-span-6 col-span-8'>
                        <GraphLineChart graphData1={transactionIncomeByMonth} graphData2={transactionExpenseByMonth}/>
                    </div>
                    <div className='border-4 border-gray-300 rounded-xl bg-white row-span-2 col-span-4'>
                        Total Balance
                    </div>
                    <div className='border-4 border-gray-300 rounded-xl bg-white row-span-2 col-span-4'>
                        Total Income
                    </div>
                    <div className='border-4 border-gray-300 rounded-xl bg-white row-span-2 col-span-4'>
                        Total Expense
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-4 h-[350px]'>
                    <div className='grid grid-rows-6 grid-cols-6 gap-4 col-span-8'>
                        <div className='border-4 border-gray-300 rounded-xl bg-white row-span-6 col-span-3'>
                            Top expense category
                        </div>
                        <div className='border-4 border-gray-300 rounded-xl bg-white row-span-3 col-span-3'>
                            Recommend
                        </div>
                        <div className='border-4 border-gray-300 rounded-xl bg-white row-span-3 col-span-3'>
                            Income
                        </div>
                    </div>
                    <div className='grid grid-rows-6 col-span-4'>
                        <div className='border-4 border-gray-300 rounded-xl bg-white row-span-6'>
                            Recent transaction
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage