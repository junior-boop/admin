"use client"
import Link from "next/link";

export default function ButtonLink({url, titre, icon}){
    return(
        <Link href={url} className="px-5 py-3 rounded-md font-semibold text-white bg-slate-900 hover:bg-slate-800 flex items-center gap-3">
            {icon}
            {titre}
        </Link>
    )
}

export function ButtonLinkWhite({url, titre, icon}){
    return(
        <Link href={url} className="px-3 py-3 rounded-md font-semibold text-gray-500 flex items-center gap-3 border border-gray-300 max-h-[46px]">
            {icon}
            {titre}
        </Link>
    )
}
export function ButtonWhite({titre, icon, onClick}){
    return(
        <button onClick={onClick} className="px-3 py-3 rounded-md font-semibold text-gray-500 flex items-center gap-3 border border-gray-300">
            {icon}
            {titre}
        </button>
    )
}