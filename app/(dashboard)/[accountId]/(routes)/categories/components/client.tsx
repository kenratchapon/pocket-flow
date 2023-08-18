"use client";

import { DataTable } from "@/components/ui/data-table";
import React, { useState } from "react";
import { CategoryColumn, columns } from "./column";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";


interface CategoryClientProps {
  data: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({ 
	data
}) => {
	const router = useRouter()
	const params = useParams()
	const [selectActivity,setSelectActivity] = useState("All")
	return (
		<div>
			<div className="flex flex-row justify-between items-center">
				<Heading title="Categories" description="Manage your categories"/>
				<Button onClick={()=>router.push(`/${params.accountId}/categories/new`)}>Create new</Button>
			</div>

			<div className="mt-3 md:hidden">
				{selectActivity === "All" && <p>All Categories</p>}
				{selectActivity === "Income" && <p>Income Categories</p>}
				{selectActivity === "Expense" && <p>Expense Categories</p>}
				<div className="my-2 space-x-2">
					<Button onClick={()=>setSelectActivity('All')}>All</Button>
					<Button onClick={()=>setSelectActivity('Income')}>Income</Button>
					<Button onClick={()=>setSelectActivity('Expense')}>Expense</Button>
				</div>
				{selectActivity === "All" ? <DataTable columns={columns} data={data} searchKey='name'/> 
										:<DataTable columns={columns} data={data.filter((item)=>item.activity===`${selectActivity}`)} searchKey='name'/>
				}
			</div>
			<div className="hidden md:block">
				<div className="grid grid-cols-2 gap-4 mt-3">
					<div>
						<p>Income</p>
						<DataTable columns={columns} data={data.filter((item)=>item.activity==="Income")} searchKey='name'/>
					</div>
					<div>
						<p>Expense</p>
						<DataTable columns={columns} data={data.filter((item)=>item.activity==="Expense")} searchKey='name'/>
					</div>

				</div>
			</div>
		</div>
	);
};

export default CategoryClient;
