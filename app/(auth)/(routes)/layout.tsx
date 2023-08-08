
export default async function AuthLayout({children}:{children:React.ReactNode}){

    return(
        <div className="flex justify-center items-center h-full bg-slate-500">
            {children}
        </div>
    )
}