import { auth } from '@clerk/nextjs'
import React from 'react'
import { redirect } from "next/navigation";
import { supabase } from '@/lib/supabase';

export default async function SetupLayout({children}:{children:React.ReactNode}){
    
    const {userId} = auth()

    if(!userId){
        redirect('/sign-in')
    }

    const {data} = await supabase.from('account').select()
    if(data?.[0]){
        redirect(`/${data?.[0].id}`)
    }

    return(
        <div>
            {children}
        </div>
    )
}