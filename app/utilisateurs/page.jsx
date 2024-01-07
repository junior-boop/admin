import Header from "@/components/header";
import UserComponent from "@/components/user_component";

const getData = async () => {
    const response = await fetch(process.env.URL + '/users', { cache : "no-store"})
    const data = await response.json()

    if(!response.ok) throw new Error('il y a une erreur dans le server')
    return data
}

export default async function Utilisateurs(){

    const data = await getData()

    return(
        <div>
            <Header titre={'Utilisateurs'} sous={"Liste des utilisateurs s'etant inscrit"} />
            <UserComponent data={data} />
        </div>
    )
}