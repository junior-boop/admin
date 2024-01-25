import ButtonLink from "@/components/button"
import Header from "@/components/header"
import Items, { ItemsRessources, MessageRessource } from "@/components/items"
import ListeItems from "@/components/liste"

const getData = async () => {
    const response = await fetch(process.env.URL + '/contact', {cache : 'no-store'})
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
                        data.map( el => < MessageRessource url={`/contact-us/${el.Id}`} data={el} id={el.Id} key={el.Id} />)
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