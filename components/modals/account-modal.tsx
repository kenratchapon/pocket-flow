"use client"

import { useForm } from "react-hook-form";
import { useStoreModal } from "@/hooks/use-store-modal"
import Modal from "../ui/modal"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'

const formSchema = z.object({
    name: z.string().min(1).max(50),
})

const AccountModal = () => {
    const StoreModal = useStoreModal()
    const [loading, setLoading]=useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
    },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>)=> {
        try {
            setLoading(true)
            const response = await axios.post('/api/accounts', values)
            window.location.assign(`/${response.data?.[0].id}`)
        } catch (error) {
            toast.error("Something went wrong");
        } finally{
            setLoading(false)
        }
    }

    return (
            <Modal 
                title="Create Account" 
                description="Put your account name" 
                isOpen={StoreModal.isOpen} 
                onClose={StoreModal.onClose}
            >
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel />
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Account Name" {...field}/>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div className="pt-6  space-x-2 flex items-center justify-end w-full">
                                <Button disabled={loading} variant="outline" onClick={StoreModal.onClose}>Cancel</Button>
                                <Button disabled={loading} type="submit">Continue</Button>
                            </div>
                        </form>

                    </Form>
                </div>
            </Modal>
    )
}

export default AccountModal