import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}: {params:{accountId:string, transactionId:string}}) {
    try{
        const {userId} = auth();
        const body = await req.json();

        const {amount, category_id, memo, time} = body

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!amount){
            return new NextResponse("Amount is required", {status: 400})
        }
        if(!category_id){
            return new NextResponse("Category Id is required", {status: 400})
        }
        if(!memo){
            return new NextResponse("Memo is required", {status: 400})
        }
        if(!time){
            return new NextResponse("Time is required", {status: 400})
        }
        if(!params.accountId){
            return new NextResponse("Account id is required", {status: 400})
        }
        
        const { data, error } = await supabase.from('transaction')
        .update({ 
            amount: amount, 
            category_id: category_id, 
            memo: memo, 
            time: time,
            account_id:params.accountId
        }).eq('id',params.transactionId)

        if(error){
            console.log('error', error)
            return new NextResponse("Update transaction error", {status: 400})
        }

        return NextResponse.json(data)

    } catch (error) {
        console.log('[TRANSACTION_PATCH]', error)
        return new NextResponse("Interal error", {status:500})
    }
}
export async function DELETE(req:Request,{params}: {params:{transactionId:string}}) {
    try{
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const { data, error } = await supabase.from('transaction').delete().eq('id',params.transactionId)

        if(error){
            console.log('error', error)
            return new NextResponse("Delete transaction error", {status: 400})
        }

        return NextResponse.json(data)

    } catch (error) {
        console.log('[TRANSACTION_DELETE]', error)
        return new NextResponse("Interal error", {status:500})
    }
}