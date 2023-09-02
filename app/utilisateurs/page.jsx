import Header from "@/components/header";
import Items from "@/components/items";
import ListeItems from "@/components/liste";

const getData = async () => {
    const response = await fetch('http://18.215.69.15:3000/api/inscription', { cache : "no-store"})
    const data = await response.json()

    if(!response.ok) throw new Error('il y a une erreur dans le server')
    return data
}

export default async function Utilisateurs(){

    const data = await getData()

    return(
        <div>
            <Header titre={'Utilisateurs'} sous={"Liste des utilisateurs s'etant inscrit"} />
            <ListeItems>
                
            </ListeItems>
        </div>
    )
}