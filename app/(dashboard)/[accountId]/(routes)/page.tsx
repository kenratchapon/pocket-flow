
import React from 'react'

interface DashboardPageProps{
    params: {accountId:string}
}

const DashboardPage:React.FC<DashboardPageProps> = ({
    params
}) => {
    
    return (
        <div className='p-7'>
            DashBoard Page
        </div>
    )
}

export default DashboardPage