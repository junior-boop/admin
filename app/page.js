"use client"

import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Home() {

  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    if(pathName === '/') router.push('/articles')
  }, [])
  

  return (
   <div>
   </div> 
  )
}
