"use client"

import { Sigma } from "lucide-react"
import { CategoryColumn } from "./column"

interface CellActionProps {
    data: CategoryColumn
}

const CellAction:React.FC<CellActionProps> = ({
    data
}) => {

    return (
        <>
            <Sigma/>
        </>

    )
}

export default CellAction