import ArticleContent from "@/components/articles_content";
import Header from "@/components/header";

async function getData(){

    const response = await fetch(process.env.URL + '/articles', { cache : "no-cache"})
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