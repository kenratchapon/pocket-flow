import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: {params:{accountId:string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json();

        const {name} = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400})
        }

        if(!params.accountId){
            return new NextResponse("Store id is required", {status: 400})
        }

        const {data,error} = await supabase.from('account').update({name:name}).eq('id',params.accountId).select()

        return NextResponse.json(data)

    } catch (error) {
        console.log('[STORE_PATCH]', error)
        return new NextResponse("Interal error", {status:500})
    }
}