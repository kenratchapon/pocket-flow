"use client"
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { Category } from '@/types/collection'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Picker from 'emoji-picker-react'
import { Trash } from 'lucide-react'
import AlertMoadal from '@/components/modals/alert-modal'

const formSchema = z.object({
    name: z.string().min(1),
    icon: z.string().min(1),
    activity: z.string().min(1),
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
    initialData: Category
}

const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
}) => {

    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category" : "Add a new category";
    const toastMessage = initialData ? "Category updated" : "Category created";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            icon: '',
        }
    })

    const handleSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.accountId}/categories/${params.categoryId}`, data)
            } else {
                await axios.post(`/api/${params.accountId}/categories`, data)
            }

            router.refresh();
            router.push(`/${params.accountId}/categories`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.accountId}/categories/${params.categoryId}`)
            router.refresh()
            router.push(`/${params.accountId}/categories`)
            toast.success("Category deleted.")
        } catch (error) {
            toast.error("Make sure you removed all product using this category first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertMoadal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <div className='flex items-center justify-between'>
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
                        <Trash className='h-4 w-4' />
                    </Button>
                )}
            </div>
            <div className='flex flex-row justify-center relative max-w-2xl mx-auto'>
            <div className='border-8 border-gray-300 p-4 mt-20 bg-white rounded-xl w-full z-20'>
                <div className="flex flex-col mt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8 w-full'>
                            <div className='space-y-8'>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="Category name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='icon'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Icon</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="Icon" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='activity'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Activity</FormLabel>
                                            <Select
                                                disabled={loading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            defaultValue={field.value}
                                                            placeholder='Select an activity'
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem key={1} value={'Income'}>Income</SelectItem>
                                                    <SelectItem key={2} value={'Expense'}>Expense</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex flex-row justify-center'>
                                    <Button disabled={loading} className='w-40' type='submit'>
                                        {action}
                                    </Button>
                                </div>
                        </form>
                    </Form>
                </div></div></div>

        </>

    )
}

export default CategoryForm