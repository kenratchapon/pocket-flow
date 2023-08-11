import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try{
        const {userId} = auth();
        const body = await req.json();


        const {name} = body

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400})
        }
        
        const { data, error } = await supabase.from('account').insert({ name: name, userId: userId }).select()

        if(error){
            return new NextResponse("insert account name error", {status: 400})
        }

        return NextResponse.json(data)

    } catch (error) {
        console.log('[STORE_POST]', error)
        return new NextResponse("Interal error", {status:500})
    }
}