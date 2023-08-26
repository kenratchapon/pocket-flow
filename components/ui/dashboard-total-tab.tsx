"use client"
import { useEffect, useState } from 'react';

interface DashboardTotalTabProps {
    title: string
    totalData: any[];
}

export const DashboardTotalTab: React.FC<DashboardTotalTabProps> = ({
    title,
    totalData
}) =>{

    const [compareText, setCompareText] = useState('')
    
    useEffect(() => {
        compareData()
    },)
    const compareData = () => {
        if (totalData.length >= 2) {
            const currentMonthBalance = totalData[1].total;
            const previousMonthBalance = totalData[0].total;

            if (previousMonthBalance === 0) {
                if (currentMonthBalance > 0) {
                    setCompareText(`increased from 0 to ${currentMonthBalance}฿`);
                } else {
                    setCompareText(`remained at 0`);
                }
            } else {
                const differencePercentage = ((currentMonthBalance - previousMonthBalance) / previousMonthBalance) * 100;
    
                if (currentMonthBalance > previousMonthBalance) {
                    setCompareText(`more than previous month by ${differencePercentage.toFixed(2)}%`);
                } else if (currentMonthBalance < previousMonthBalance) {
                    setCompareText(`less than previous month by ${Math.abs(differencePercentage).toFixed(2)}%`);
                } else {
                    setCompareText(`equa previous month`)
                }
            }
        }
    };
    return(
    <div className='flex flex-col justify-center items-center h-full w-full p-4'>
        <h1 className='font-semibold'>{title}</h1>
        <p className='text-3xl'>{totalData?.[1].total} ฿</p>
        <p className='text-xs'>{compareText}</p>
    </div>
    )
}