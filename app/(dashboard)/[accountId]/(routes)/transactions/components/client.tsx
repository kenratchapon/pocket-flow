"use client";

import { DataTable } from "@/components/ui/data-table";
import React, { useState } from "react";
import { TransactionColumn, columns } from "./column";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";


interface TransactionClientProps {
  data: TransactionColumn[]
}

const TransactionClient: React.FC<TransactionClientProps> = ({ 
	data
}) => {
	const router = useRouter()
	const params = useParams()

	return (
		<div>
			<div className="flex flex-row justify-between items-center">
				<Heading title="Transaction" description="Manage your transactions"/>
				<Button onClick={()=>router.push(`/${params.accountId}/transactions/new`)}>Create new</Button>
			</div>
			<div className="mt-3">
				<div>
					<p>Transaction</p>
					<DataTable columns={columns} data={data} searchKey='category'/>
				</div>
			</div>

		</div>
	);
};

export default TransactionClient;
