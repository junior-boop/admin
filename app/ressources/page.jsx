import ButtonLink from "@/components/button"
import Header from "@/components/header"
import { CarbonDocumentAdd } from "@/components/icon"
import Items, { ItemsRessources } from "@/components/items"
import ListeItems from "@/components/liste"

const getData = async () => {
    const response = await fetch('http://18.215.69.15:3000/api/ressources/', {cache : 'no-store'})
    const data = await response.json()

    if(!response.ok) throw new Error(" Il y a un probleme server")

    return data
}

export default async function Ressources(){

    const data = await getData()

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
                        data.map( el => < ItemsRessources url={`/ressources/${el.key}`} data={el.value} id={el.key} key={el.key} />)
                        }
                    </>
                ) 
                : (
                    <div className='w-full flex items-center justify-center h-48 flex-col'>
                        <div className='font-bold text-lg'>
                            Aucun Article
                        </div>
                        <div className='mb-4'>
                            Cliquez sur ce bouton pour ajouter un nouvelle article dans la base de données
                        </div>
                        <ButtonLink titre={'Nouvel Article'} url={'/articles/new'} icon={<CarbonDocumentAdd className = {'text-white w-6'} />}/>
                    </div>
                )
            }
        </ListeItems>
    )
}