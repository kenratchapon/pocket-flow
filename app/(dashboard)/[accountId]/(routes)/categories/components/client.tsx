"use client";

import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { CategoryColumn, columns } from "./column";
import { Heading } from "@/components/ui/heading";


interface CategoryClientProps {
  data: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({ 
	data
}) => {

	return (
		<div>
			<Heading title="Categories" description="Manage your categories"/>

			<div className="md:grid md:grid-cols-2 gap-4 flex flex-col mt-8">
				<div>
					<p>Income</p>
					<DataTable columns={columns} data={data.filter((item)=>item.activity==='Income')} searchKey='name'/>
				</div>
				<div>
					<p>Expense</p>
					<DataTable columns={columns} data={data.filter((item)=>item.activity==='Expense')} searchKey='name'/>
				</div>
			</div>
		</div>
	);
};

export default CategoryClient;
