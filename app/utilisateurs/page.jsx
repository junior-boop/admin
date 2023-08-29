"use client"

import Header from "@/components/header";
import Items from "@/components/items";
import ListeItems from "@/components/liste";
import useFirebase from "@/firebase";
import { useEffect } from 'react'

export default function Utilisateurs(){

    const { STORAGE } = useFirebase

    useEffect(() => {
        if(typeof window !== 'undefined'){
            console.log(STORAGE);
        }
    }, [])

    return(
        <div>
            <Header titre={'Utilisateurs'} sous={"Liste des utilisateurs s'etant inscrit"} />
            <ListeItems>
                <Items />
                <Items />
                <Items />
            </ListeItems>
        </div>
    )
}