import  { MailContent } from "@/components/articles_content";
import Header from "@/components/header";

async function getData(){

    const response = await fetch('http://18.215.69.15:3000/api/newsletter', { cache : "no-cache"})
    const data = await response.json()

    if(!response.ok) throw new Error('il y a une errreur dans le transfert')

    return data
}

export default async function ArticleListe(){

    const Data = await getData()

    return(
        <div>
            <Header titre={'E-Mail'} sous={'Liste des articles du blog'} hasbtn btnTitre={'Nouvel article'} btnUrl={'/articles/new'} />
            <MailContent data = {Data} />
        </div>
    )
}