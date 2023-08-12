import Sidebar from '@/components/sidebar';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

async function DashboardLayout({
    children,
    params
}:{
    children: React.ReactNode
    params: {accountId: string}
}){
    const {userId} = auth();
    if(!userId){
        redirect('/sign-in')
    }

    const {data} = await supabase.from('account').upsert({id: params})
    if(data?.[0]){
        redirect('/')
    }

    return (
      <div className='flex p-2 h-screen'>
        <Sidebar/>
        {children}
      </div>
    )
}

export default DashboardLayout