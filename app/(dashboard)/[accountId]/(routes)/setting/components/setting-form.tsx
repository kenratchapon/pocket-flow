"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Account } from "@/types/collection";
import axios from "axios";
import { Pen, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface SettingFormProps {
  initialData: Account[]
}

const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();
	const [loading, setLoading] = useState(false)
	const [accountName, setAccountName]=useState(initialData?.[0].name || '')
	

	const handleSubmit = async (e:any)=>{
		e.preventDefault()
		const body = {
			name:accountName
		}
		try {
			setLoading(true)
			await axios.patch(`/api/accounts/${params.accountId}`, body)
			window.location.assign(`/${params.accountId}/setting`)
			toast.success("Account updated.")
		} catch (error) {
			toast.error("Something went wrong.")
		}finally{
			setLoading(false)
		}

	}

	const handleDelete = async ()=>{
		try {
			setLoading(true)
			await axios.delete(`/api/accounts/${params.accountId}`)
			router.refresh()
			router.push('/')
			toast.success("Account delete.")
		} catch (error) {
			toast.error("Something went wrong.")
		}finally{
			setLoading(false)
		}

	}

	return (
		<div>
			<div className="flex justify-between items-center">
				<Heading title="Setting" description="Manage account preferences" />
				<Button onClick={handleDelete} disabled={loading} variant="destructive" type="submit" ><Trash className="w-4 h-4 mr-2"/>Delete</Button>
			</div>
			<div className="flex flex-col mt-6">
				<form onSubmit={handleSubmit} className="flex flex-col w-72 items-start gap-y-4">
					<label htmlFor="title">Account name</label>
					<input 
						type="text" 
						placeholder="account name" 
						className="p-2 border-2 rounded-md border-purple-700"
						onChange={(e)=>setAccountName(e.target.value)}
						value={accountName}
						disabled={loading}
						required
					/>
					<Button disabled={loading} type="submit" ><Pen className="w-4 h-4 mr-2"/>Change</Button>
				</form>
			</div>
		</div>
	);
};

export default SettingForm;
