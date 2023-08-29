"use client"
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from "react";

export default function Routes({children, url = '/', icone}){
    const [location, setLocation] = useState(false)
    const pathname = usePathname()
    
    useEffect(() => {
        if(pathname !== url) setLocation(false) 
        else setLocation(true)
    }, [pathname])

    return(
        <Link href={url} className={`p-4 rounded-lg hover:bg-slate-100 ${location ? 'bg-slate-200' : null} w-full block font-medium flex items-center gap-3`}>
            {icone}
            {children}
        </Link>
    )
}