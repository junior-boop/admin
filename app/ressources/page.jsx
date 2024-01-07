import ButtonLink from "@/components/button"
import Header from "@/components/header"
import { CarbonDocumentAdd } from "@/components/icon"
import Items, { ItemsRessources } from "@/components/items"
import ListeItems from "@/components/liste"

const getData = async () => {
    const response = await fetch(process.env.URL + '/ressources', {cache : 'no-store'})
    const data = await response.json()

    if(!response.ok) throw new Error(" Il y a un probleme server")

    return data
}

export default async function Ressources(){

    const data = await getData()
    console.log(data)

    return(
        <div>
            <Header titre={'Ressources'} sous={'Liste des ressources enregistrées'}  />
            <ArticleContent data={data} />
        </div>
    )
}

export function ArticleContent({data}){

    return(
        <ListeItems>
            {
                data.length !== 0 
                ? (
                    <>
                        {
                        data.map( el => < ItemsRessources url={`/ressources/${el.Id}`} data={el} id={el.Id} key={el.Id} />)
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