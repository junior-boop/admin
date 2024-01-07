import Container from "@/components/container";
import Header from "@/components/header";
import Images_content from "@/components/images-content";

const getData = async () => {
    const response = await fetch(process.env.URL + '/images', {cache : 'no-cache'})
    const data = await response.json()

    if(!response.ok) throw new Error('il y a une erreur')
    return data
}

export default async function ImagesPage(){

    const data = await getData()
    console.log(data)
    return(
        <div style={{ height : 'calc(100vh - 49px)'}} className=" overflow-hidden overflow-y-auto relative">
            <Header titre={'Images'} />
            <Images_content data  = {data} url = {process.env.URL} />
            <div className="h-32"></div>
        </div>
    )
}