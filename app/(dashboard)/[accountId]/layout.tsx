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

    const {data} = await supabase.from('account').select().eq('userId',userId)
    if(!data?.[0]){
        redirect('/')
    }

        return (
        <div className='flex p-2 h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffffff] via-[#a0ffff] to-[#a85cff]'>
            <Sidebar/>
            <div className='bg-gray-700 w-full rounded-xl ml-2 p-2 bg-opacity-25'>
                <div className='bg-white bg-opacity-90 w-full h-full rounded-md p-8'>
                    {children}
                </div>
            </div>
        </div>
        )
}

export default DashboardLayout