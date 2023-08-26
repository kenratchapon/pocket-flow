"use client"

import Image from "next/image";
import money from "../asset/money-bag-svgrepo-com.svg"
interface DashboardAccountBalanceProps {
    title: string
    data: any;
}

export const DashboardAccountBalance: React.FC<DashboardAccountBalanceProps> = ({
    title,
    data
}) =>{

    return(
    <div className='h-full w-full p-4'>
        <h1 className='font-semibold'>{title}</h1>
        <div className="flex flex-row justify-between items-center">
            <div className="space-y-2 mt-2">
                <p className="text-lg lg:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-indigo-500 via-purple-500 to-indigo-500">
                    {data.accountName}
                </p>
                <p className="text-xl lg:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-green-600 via-orange-400 to-green-600">
                    {data.totalBalance} ฿
                </p>
            </div>
            <div className="flex flex-col justify-end">
                <Image className="h-24 w-24" src = {money} alt="money"/>
            </div>
        </div>

        
    </div>
    )
}