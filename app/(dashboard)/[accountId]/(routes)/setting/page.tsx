import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import SettingForm from './components/setting-form'

interface SettingPageProps {
    params: {
        accountId: string
    }
}

const SettingPage: React.FC<SettingPageProps> = async ({
    params
}) => {
    const {userId} = auth()
    
    if(!userId){
        redirect('/sign-in')
    }

    const {data} = await supabase.from('account').select().eq('id',params.accountId)
    if(!data){
        redirect('/')
    }

    return (
        <div className='flex-col'>
            <SettingForm initialData={data}/>
        </div>
    )
}

export default SettingPage