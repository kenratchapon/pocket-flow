"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type CategoryColumn = {
    id: string
    icon: string
    name: string
    activity: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
      },
    {
        accessorKey: "icon",
        header: "Icon",
    },
    {
        id: "actions",
        cell: ({row})=> <CellAction data={row.original}/>
      }
]
