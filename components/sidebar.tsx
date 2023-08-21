"use client"
import { cn } from '@/lib/utils'
import { ChevronLeft, KanbanSquare, List, Receipt, Settings, User, Wallet2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { SignOutButton, UserButton } from '@clerk/nextjs'
import AccountSwitcher from './account-switcher'
import axios from 'axios'
import { Account } from '@/types/collection'

const Sidebar = () => {
	const [open, setOpen] = useState(true)
	const [openMobile, setOpenMobile] = useState(false)
	const pathname = usePathname();
    const params = useParams();
	const [account, setAccount] = useState<Account[]>([])
	const routes = [
        {
            href: `/${params.accountId}`,
            label: 'Overview',
            icon: <KanbanSquare/>,
            active: pathname === `/${params.accountId}`
        },
		{
            href: `/${params.accountId}/categories`,
            label: 'Categories',
			icon: <List/>,
            active: pathname === `/${params.accountId}/billboards`
        },
        {
            href: `/${params.accountId}/transactions`,
            label: 'Transactions',
			icon: <Receipt/>,
            active: pathname === `/${params.accountId}/billboards`
        },
		{
            href: `/${params.accountId}/setting`,
            label: 'Setting',
			icon: <Settings/>,
            active: pathname === `/${params.accountId}/setting`
        },
        
    ];
	useEffect(() => {
		fetchAccount()
	}, [])
	

	const fetchAccount = async() =>{
		try {
			const response = await axios.get('/api/accounts')
			setAccount(response.data)
		} catch (error) {
			console.log('error')
		}
	}


    return (
		<>
			<div className={cn('h-full p-2 w-72 rounded-xl bg-gray-700 bg-opacity-25 relative duration-300 hidden md:block',open? "w-72": "w-20")}>
				<div className='bg-white bg-opacity-90 h-full w-full rounded-md pt-8 pl-4 flex flex-col justify-between'>
					<ChevronLeft className={cn('absolute -right-3 top-10 bg-white rounded-xl border-4 h-7 w-7 border-gray-300 cursor-pointer',open? "rotate-0": "rotate-180")} onClick={()=>setOpen(!open)}/>
					<div>
						{/* Logo */}
						<div className='inline-flex gap-2 cursor-pointer' onClick={()=>{}}>
							<div className={cn('duration-500',!open && "rotate-[360deg]")}><Wallet2 className='h-8 w-8'/></div>
							<h1 className={cn('text-black origin-left font-bold text-3xl duration-300',!open && "scale-0")}>PocketFlow</h1>
						</div>
						{/* Nav Menu */}
						<div className='flex flex-col pt-8 space-y-6 pl-1'>
							<div className='flex gap-2 items-center text-muted-foreground' >
								<div><User className='cursor-pointer' onClick={()=>setOpen(true)}/></div>
								<div className={`origin-left duration-300 ${!open && "scale-0"}`}>
									<AccountSwitcher data={account}/>
								</div>
							</div>
							{routes.map((route)=>(
								<Link 
									key={route.href}
									href={route.href} 
									className={cn("text-sm font-medium inline-flex gap-2 transition-colors hover:text-primary",
									route.active ? "text-black dark:text-white" : "text-muted-foreground",
									)}
								>
									<div>{route.icon}</div>
									<h1 className={cn('origin-left text-xl duration-300',!open && "scale-0")}>{route.label}</h1>
									
								</Link>
							))}
						</div>
					</div>
					<div className='mb-6 ml-1 flex gap-4'>
						<UserButton/>
						{open && <SignOutButton/>}
					</div>
				</div>
			</div>
			<div className={cn('h-full p-2 w-72 rounded-xl bg-gray-700 bg-opacity-25 relative duration-300 block md:hidden',openMobile? "w-72": "w-20")}>
				<div className='bg-white bg-opacity-90 h-full w-full rounded-md pt-8 pl-4 flex flex-col justify-between'>
					<ChevronLeft className={cn('absolute -right-3 top-10 bg-white rounded-xl border-4 h-7 w-7 border-gray-300 cursor-pointer',openMobile? "rotate-0": "rotate-180")} onClick={()=>setOpenMobile(!openMobile)}/>
					<div>
						{/* Logo */}
						<div className='inline-flex gap-2 cursor-pointer' onClick={()=>{}}>
							<div className={cn('duration-500',!openMobile && "rotate-[360deg]")}><Wallet2 className='h-8 w-8'/></div>
							<h1 className={cn('text-black origin-left font-bold text-3xl duration-300',!openMobile && "scale-0")}>PocketFlow</h1>
						</div>
						{/* Nav Menu */}
						<div className='flex flex-col pt-8 space-y-6 pl-1'>
							<div className='flex gap-2 items-center text-muted-foreground' >
								<div><User className='cursor-pointer' onClick={()=>setOpenMobile(true)}/></div>
								<div className={`origin-left duration-300 ${!openMobile && "scale-0"}`}>
									<AccountSwitcher data={account}/>
								</div>
							</div>
							{routes.map((route)=>(
								<Link 
									key={route.href}
									href={route.href} 
									className={cn("text-sm font-medium inline-flex gap-2 transition-colors hover:text-primary",
									route.active ? "text-black dark:text-white" : "text-muted-foreground",
									)}
								>
									<div>{route.icon}</div>
									<h1 className={cn('origin-left text-xl duration-300',!openMobile && "scale-0")}>{route.label}</h1>
									
								</Link>
							))}
						</div>
					</div>
					<div className='mb-6 ml-1 flex gap-4'>
						<UserButton/>
						{openMobile && <SignOutButton/>}
					</div>
				</div>
			</div>
		</>

    )
}

export default Sidebar