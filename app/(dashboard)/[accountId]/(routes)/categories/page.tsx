import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import React from 'react'
import CategoryClient from './components/client'
import { CategoryColumn } from './components/column'
export const revalidate = 0
interface CategoriesPageProps {
    params: {
        accountId: string
    }
}

const CategoriesPage: React.FC<CategoriesPageProps> = async ({
    params
}) => {
    const {data,error} = await supabase.from('category').select().eq('account_id',params.accountId)
    if(error){
        console.log('category error')
    }
    if(!data){
        redirect('/')
    }
    const formattedCategories: CategoryColumn[] = data.map((item)=>({
        id: item.id,
        icon: item.icon,
        name: item.name,
        activity: item.activity
    }))

    return (
        <div className='flex-col'>
            <CategoryClient data={formattedCategories}/>
        </div>
    )
}

export default CategoriesPage