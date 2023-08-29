
import ArticlePost from "@/components/editor_component";
import Edit from "@/components/editor_page";

const getData = async (id) => {
    const response = await fetch('http://localhost:3000/api/articles/edit/'+id, {cache : "no-cache"})
    const data = await response.json()

    if(!response.ok) throw new Error('il y a une erreur dans les modifs')

    return data
}

export default async function Pages({searchParams}){
    const { id } = searchParams
    const data = await getData(id)


    return(
        <div>
            <ArticlePost post={data} />
        </div>
    )
}

