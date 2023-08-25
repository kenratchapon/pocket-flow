import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}: {params:{accountId:string}}) {
    try{
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!params.accountId){
            return new NextResponse("Account id is required", {status: 400})
        }
        
        const { data, error } = await supabase.from('transaction').select().eq('account_id',params.accountId)

        if(error){
            console.log('error', error)
            return new NextResponse("insert transaction error", {status: 400})
        }

        return NextResponse.json(data)

    } catch (error) {
        console.log('[TRANSACTION_GET]', error)
        return new NextResponse("Interal error", {status:500})
    }
}
export async function POST(req:Request,{params}: {params:{accountId:string}}) {
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
        .insert({ 
            amount: amount, 
            category_id: category_id, 
            memo: memo, 
            time: time,
            account_id:params.accountId
        }).select()

        if(error){
            console.log('error', error)
            return new NextResponse("insert transaction error", {status: 400})
        }

        return NextResponse.json(data)

    } catch (error) {
        console.log('[TRANSACTION_POST]', error)
        return new NextResponse("Interal error", {status:500})
    }
}