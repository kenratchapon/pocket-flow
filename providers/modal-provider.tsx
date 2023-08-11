"use client"

import AccountModal from "@/components/modals/account-modal";
import { useEffect,useState } from "react"

export const ModalProvider=()=>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null;
    }

    return(
        <>
            <AccountModal/>
        </>
    )
}