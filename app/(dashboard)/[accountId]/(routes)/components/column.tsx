"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type DashboardTransactionColumn = {
    id: string
    category: string
    memo: string
    amount: number
    activity: string
    time: string
}

export const columns: ColumnDef<DashboardTransactionColumn>[] = [
    {
        accessorKey: "category",
        header: "Category",
      },
    {
        accessorKey: "memo",
        header: "Memo",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({row})=>(
            <div className="flex items-center gap-x-2">
                {row.original.activity==='Income' 
                    ?<div className="text-green-600">+{row.original.amount}</div>
                    :<div className="text-red-600">-{row.original.amount}</div>}
            </div>
        )
    },
    {
        accessorKey: "time",
        header: "Time",
    },
]
