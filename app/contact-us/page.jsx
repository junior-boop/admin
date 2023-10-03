import ButtonLink from "@/components/button"
import Header from "@/components/header"
import { CarbonDocumentAdd } from "@/components/icon"
import Items, { ItemsRessources, MessageRessource } from "@/components/items"
import ListeItems from "@/components/liste"

const getData = async () => {
    const response = await fetch('http://18.215.69.15:3000/api/contact', {cache : 'no-store'})
    const data = await response.json()

    if(!response.ok) throw new Error(" Il y a un probleme server")

    return data
}

export default async function Ressources(){

    const data = await getData()

    return(
        <div>
            <Header titre={'Ressources'} sous={'Liste des ressources enregistrées'}  />
            <MessageContent data={data} />
        </div>
    )
}

export function MessageContent({data}){

    console.log(data)

    return(
        <ListeItems>
            {
                data.length !== 0 
                ? (
                    <>
                        {
                        data.map( el => < MessageRessource url={`/contact-us/${el.key}`} data={el.value} id={el.key} key={el.key} />)
                        }
                    </>
                ) 
                : (
                    <div className='w-full flex items-center justify-center h-48 flex-col bg-slate-100'>
                        <div className='font-bold text-lg'>
                            Aucun Ressources de disponible
                        </div>
                    </div>
                )
            }
        </ListeItems>
    )
}