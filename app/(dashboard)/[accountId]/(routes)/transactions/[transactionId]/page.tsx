import { supabase } from "@/lib/supabase"
import TransactionForm from "./components/transaction-form"


const CategoryPage = async ({
    params
}:{
    params: {accountId:string, transactionId: string}
}) => {
    const {data}= await supabase.from('transaction').select().eq('id',params.transactionId)

    const {data:categories}= await supabase.from('category').select().eq('account_id',params.accountId)

    return (
        <div>
            <TransactionForm initialData={data?.[0]} categories={categories}/>
        </div>
    )
}

export default CategoryPage