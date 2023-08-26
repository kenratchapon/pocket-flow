"use client";

import { DataTable } from "@/components/ui/data-table";
import React, { useState } from "react";
import { DashboardTransactionColumn, columns } from "./column";
import { DashboardDataTable } from "@/components/ui/dashboard-data-table";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

interface DashBoardTransactionClientProps {
  data: DashboardTransactionColumn[]
}

const DashBoardTransactionClient: React.FC<DashBoardTransactionClientProps> = ({ 
	data
}) => {
	const router = useRouter()
	const params = useParams()
	return (
		<div className="p-4">
			<div className="flex flex-row justify-between">
				<h1 className="font-semibold">Recent Transactions</h1>
				<Button onClick={()=>router.push(`/${params.accountId}/transactions`)}>more detail</Button>
			</div>
			<div className="mt-3">
				<DashboardDataTable columns={columns} data={data} searchKey='category'/>
			</div>

		</div>
	);
};

export default DashBoardTransactionClient;
