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
import { Category, Transaction } from '@/types/collection'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon, Trash } from 'lucide-react'
import AlertMoadal from '@/components/modals/alert-modal'
import { DateTime } from 'luxon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'

const formSchema = z.object({
    amount: z.string().min(1),
    category_id: z.string().min(1),
    memo: z.string().min(1),
    time: z.date({
        required_error: "A date is required.",
    }),
})

type TransactionFormValues = z.infer<typeof formSchema>

interface TransactionFormProps {
    initialData: Transaction
    categories: Category[] | null
}

const TransactionForm: React.FC<TransactionFormProps> = ({
    initialData,
    categories
}) => {
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const title = initialData ? "Edit transaction" : "Create transaction";
    const description = initialData ? "Edit a transaction" : "Add a new transaction";
    const toastMessage = initialData ? "Transaction updated" : "Transaction created";
    const action = initialData ? "Save changes" : "Create";

    const [date, setDate] = useState<Date>(new Date())
    const [selectedDateTime, setSelectedDateTime] = React.useState<DateTime>(
        DateTime.fromJSDate(date)
    );

    const form = useForm<TransactionFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            amount: initialData.amount.toString(),
            category_id: initialData.category_id + "",
            time: new Date(initialData.time)
        } : {
            memo: '',
            amount: '',
        }
    })

    const handleSubmit = async (data: TransactionFormValues) => {
        handleSelect(data.time)
        formatDateToCustomFormat(date)
        data.time = date
        try {
            setLoading(true)
            console.log('data', data)
            if (initialData) {
                await axios.patch(`/api/${params.accountId}/transactions/${params.transactionId}`, data)
            } else {
                await axios.post(`/api/${params.accountId}/transactions`, data)
            }

            router.refresh();
            router.push(`/${params.accountId}/transactions`)
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
            await axios.delete(`/api/${params.accountId}/transactions/${params.transactionId}`)
            router.refresh()
            router.push(`/${params.accountId}/transactions`)
            toast.success("Transaction deleted.")
        } catch (error) {
            toast.error("Make sure you removed all product using this transaction first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    function formatDateToCustomFormat(date: Date) {
        const isoString = date.toISOString();
        const year = isoString.slice(0, 4);
        const month = isoString.slice(5, 7);
        const day = isoString.slice(8, 10);
        const time = isoString.slice(11, 23); // HH:mm:ss.ssssss
        return `${year}-${month}-${day} ${time}+00`;
    }

    const handleSelect = (time: any) => {
        const selectedDay = DateTime.fromJSDate(time);
        const modifiedDay = selectedDay.set({
            hour: selectedDateTime.hour,
            minute: selectedDateTime.minute,
        });

        setSelectedDateTime(modifiedDay);
        setDate(modifiedDay.toJSDate());
    };
    const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.target;
        const hours = Number.parseInt(value.split(':')[0] || '00', 10);
        const minutes = Number.parseInt(value.split(':')[1] || '00', 10);
        const modifiedDay = selectedDateTime.set({ hour: hours, minute: minutes });

        setSelectedDateTime(modifiedDay);
        setDate(modifiedDay.toJSDate());
    };
    const formatTime = (dateTime: any) => {
        const hours = String(dateTime.hour).padStart(2, '0');
        const minutes = String(dateTime.minute).padStart(2, '0');
        return `${hours}:${minutes}`;
    };
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
            <div className="flex flex-col mt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8 w-full md:w-1/3'>
                        <div className='space-y-8'>
                            <FormField
                                control={form.control}
                                name='amount'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="0.00฿" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='category_id'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                        placeholder='Select a category'
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories?.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id + ""}
                                                    >
                                                        {category.name + " " + category.icon}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='memo'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Memo</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Note or Message" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex flex-row gap-x-4 w-full'>
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            <>{format(new Date(field.value), "PPP")}</>
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />

                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <Label>Time</Label>
                                <Input
                                    type="time"
                                    onChange={handleTimeChange}
                                    value={formatTime(selectedDateTime)}
                                />
                            </div>
                            </div>
                        </div>
                        <Button disabled={loading} className='ml-auto' type='submit'>
                            {action}
                        </Button>
                    </form>
                </Form>
            </div>
        </>

    )
}

export default TransactionForm