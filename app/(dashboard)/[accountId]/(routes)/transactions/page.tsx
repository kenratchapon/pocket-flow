import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import React from 'react'
import { TransactionColumn } from './components/column'
import TransactionClient from './components/client'
const { parseISO, format } = require('date-fns');
export const revalidate = 0
interface TransactionsPageProps {
    params: {
        accountId: string
    }
}

const TransactionsPage: React.FC<TransactionsPageProps> = async ({
    params
}) => {
    const {data,error} = await supabase.from('transaction').select('*,category(*)').eq('account_id',params.accountId).order('time', { ascending: false })
    if(error){
        console.log('transaction error')
    }
    if(!data){
        redirect('/')
    }
    
    const formattedTransactions: TransactionColumn[] = data.map((item)=>{
        const timestamp = item.time;
        const dateObject = parseISO(timestamp);
        return{
            id: item.id,
            category: item.category.icon + item.category.name,
            memo: item.memo,
            amount: item.amount,
            activity: item.category.activity,
            time: format(dateObject, "MMMM d, yyyy 'at' HH:mm z")
    }
    })

    return (
        <div className='flex-col'>
            <TransactionClient data={formattedTransactions}/>
        </div>
    )
}

export default TransactionsPage