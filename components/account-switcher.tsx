"use client"
import { Account } from '@/types/collection'
import React, { useState } from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Check, ChevronsUpDown, PlusCircle, StoreIcon, User } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useParams, useRouter } from 'next/navigation'

interface AccountSwitcherProps {
    data: Account[]
}

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({ data }) => {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();
  
    const formattedItems = data.map((item)=>({
      name: item.name,
      value: item.id
    }))
  
    const currentAccount = formattedItems.find((item)=>item.value===params.accountId)
  
    const [open, setOpen] = useState(false)
  
    const onAccountSelect = (account: {value:string, name: string}) =>{
      setOpen(false)
      router.push(`/${account.value}`);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a account"
              className="max-w-[150px] justify-between overflow-hidden"
            >
              {currentAccount?.name}
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-[150px] p-0 overflow-hidden">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search account..."/>
                <CommandEmpty>
                  No account found.
                </CommandEmpty>
                <CommandGroup heading="Accounts">
                  {formattedItems.map((account)=>(
                    <CommandItem key={account.value} onSelect={()=>onAccountSelect(account)} className="text-sm">
                      <User className="mr-2 h-4 w-4"/>
                      {account.name}
                      <Check className={cn("ml-auto h-4 w-4",currentAccount?.value === account.value ? "opacity-100" : "opacity-0")}/>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              <CommandSeparator/>
              <CommandList>
                <CommandGroup>
                  <CommandItem onSelect={()=>{
                    setOpen(false);
                    storeModal.onOpen();
                  }}>
                    <PlusCircle className="mr-2 h-5 w-4"/>
                    Create Account
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )
}

export default AccountSwitcher