"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type TransactionColumn = {
    id: string
    category: string
    memo: string
    amount: number
    activity: string
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
        accessorKey: "activity",
        header: "Activity",
        cell: ({row})=>(
            <div className="flex items-center gap-x-2">
                {row.original.activity==='Income' 
                    ?<div className="h-6 w-6 rounded-full border" style={{backgroundColor: '#22c55e'}}/>
                    :<div className="h-6 w-6 rounded-full border" style={{backgroundColor: '#ef4444'}}/>}
                {row.original.activity}
            </div>
          )
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
