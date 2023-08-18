import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request,{params}: {params:{accountId:string}}) {
    try{
        const {userId} = auth();
        const body = await req.json();

        const {name, icon, activity} = body

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400})
        }
        if(!icon){
            return new NextResponse("Icon is required", {status: 400})
        }
        if(!activity){
            return new NextResponse("Activity is required", {status: 400})
        }
        if(!params.accountId){
            return new NextResponse("Account id is required", {status: 400})
        }
        
        const { data, error } = await supabase.from('category').insert({ name: name, icon: icon, activity: activity, account_id:params.accountId}).select()

        if(error){
            return new NextResponse("insert category name error", {status: 400})
        }

        return NextResponse.json(data)

    } catch (error) {
        console.log('[STORE_POST]', error)
        return new NextResponse("Interal error", {status:500})
    }
}