import { supabase } from "@/lib/supabase"
import CategoryForm from "./components/category-form"
export const revalidate = 0

const CategoryPage = async ({
    params
}:{
    params: {accountId:string, categoryId: string}
}) => {
    const {data}= await supabase.from('category').select().eq('id',params.categoryId)

    return (
        <div>
            <CategoryForm initialData={data?.[0]}/>
        </div>
    )
}

export default CategoryPage