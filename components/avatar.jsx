export default function AvatarUser(){
    return(
        <div className="flex justify-start items-center p-4 w-full gap-3 border-b border-b-slate-200 mb-6">
            <div className="rounded-full w-14 aspect-square border border-gray-100 bg-slate-200"></div>
            <div>
                <div className="font-bold text-2xl">Admin</div>
            </div>
        </div>
    )
}