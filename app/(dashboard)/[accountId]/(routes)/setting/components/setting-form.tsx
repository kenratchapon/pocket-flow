"use client";

import { Heading } from "@/components/ui/heading";
import { Account } from "@/types/collection";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface SettingFormProps {
  initialData: Account | undefined;
}

const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();
	const [loading, setLoading] = useState(false)
	const [accountName, setAccountName]=useState(initialData?.name || '')
	

	const handleSubmit = async (e:any)=>{
		e.preventDefault()
		const body = {
			name:accountName
		}
		try {
			setLoading(true)
			await axios.patch(`/api/accounts/${params.accountId}`, body)
			router.refresh()
			toast.success("Account updated.")
		} catch (error) {
			toast.error("Something went wrong.")
		}finally{
			setLoading(false)
		}

	}

	return (
		<div>
		<Heading title="Setting" description="Manage account preferences" />
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
				/>
				<button disabled={loading} type="submit" className="bg-black p-2 text-white rounded-md">Change</button>
			</form>
		</div>
		</div>
	);
};

export default SettingForm;
