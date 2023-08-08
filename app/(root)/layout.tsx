import { auth } from '@clerk/nextjs'
import React from 'react'
import { redirect } from "next/navigation";

export default async function SetupLayout({children}:{children:React.ReactNode}){
    const {userId} = auth()
    if(!userId){
        redirect('/sign-in')
    }

    return(
        <div>
            {children}
        </div>
    )
}