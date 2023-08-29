import ArticleContent from "@/components/articles_content";
import Header from "@/components/header";
import Items from "@/components/items";
import ListeItems from "@/components/liste";

async function getData(){

    const response = await fetch('https://simple-server-e1bs.onrender.com/api/articles', { cache : "no-cache"})
    const data = await response.json()

    if(!response.ok) throw new Error('il y a une errreur dans le transfert')

    return data
}

export default async function ArticleListe(){

    const Data = await getData()

    return(
        <div>
            <Header titre={'Article'} sous={'Liste des articles du blog'} hasbtn btnTitre={'Nouvel article'} btnUrl={'/articles/new'} />
            <ArticleContent data = {Data} />
        </div>
    )
}