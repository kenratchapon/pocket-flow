import { supabase } from "@/lib/supabase"
import TransactionForm from "./components/transaction-form"
export const revalidate = 0

const CategoryPage = async ({
    params
}:{
    params: {accountId:string, transactionId: string}
}) => {
    const {data}= await supabase.from('transaction').select('*,category(*)').eq('id',params.transactionId,)

    const {data:categories}= await supabase.from('category').select().eq('account_id',params.accountId)

    return (
        <div>
            <TransactionForm initialData={data?.[0]} categories={categories}/>
        </div>
    )
}

export default CategoryPage