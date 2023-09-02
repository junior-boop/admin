"use client"

import ButtonLink from "./button";
import Container from "./container";
import { QuillArrowLeft } from "./icon";
import { useRouter } from "next/navigation";

export default function Header({titre, sous, hasbtn, btnTitre, btnUrl}){
    return(
        <div style={{ backgroundColor : '#fff5', backdropFilter : 'blur(17px)' }} className="mb-4 sticky top-0 z-50 px-4 border-b border-slate-100">
                <div className="flex justify-between items-center h-[120px] w-full px-2">
                    <div className="">
                        <div className="text-4xl font-bold font-poppins ">
                            {titre}
                        </div>
                        <div className="text-2xl text-gray-400">
                            {sous}
                        </div>
                    </div>
                    <div>
                        {hasbtn && <ButtonLink url={btnUrl} titre={btnTitre} />}
                    </div>
                </div>
        </div>
    )
}


export function HeaderBack({btnSave, onClick}){
    const route = useRouter()
    return(
        <div style={{ backgroundColor : '#fff5', backdropFilter : 'blur(17px)' }} className="mb-4 sticky top-0 z-50">
            <Container>
                <div className="flex justify-between items-center h-[120px] w-full px-2">
                    <div className="flex items-center gap-3">
                       <button onClick={() => route.back()} className="rounded-full w-14 h-14 flex items-center justify-center rounded-full border border-slate-200">
                            <QuillArrowLeft className = "w-7 h-7" />
                       </button>
                       <div className="font-semibold text-base">
                            Retour
                       </div>
                    </div>
                    <div>
                        {btnSave && <button onClick={onClick} className="px-4 py-3 rounded-md font-medium bg-slate-900 hover:bg-slate-800 text-white">Enregistrer</button>}
                    </div>
                </div>
            </Container>
        </div>
    )
}