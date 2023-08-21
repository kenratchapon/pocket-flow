"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type TransactionColumn = {
    id: string
    category: string
    memo: string
    amount: number
    time: string
}

export const columns: ColumnDef<TransactionColumn>[] = [
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
    },
    {
        accessorKey: "time",
        header: "Time",
    },
    {
        id: "actions",
        cell: ({row})=> <CellAction data={row.original}/>
      }
]
