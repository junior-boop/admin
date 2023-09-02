import Container from "@/components/container";
import Header from "@/components/header";
import Images_content from "@/components/images-content";

const getData = async () => {
    const response = await fetch('http://18.215.69.15:3000/api/images', {cache : 'no-store'})
    const data = await response.json()

    if(!response.ok) throw new Error('il y a une erreur')
    return data
}

export default async function ImagesPage(){

    const data = await getData()
    return(
        <div style={{ height : 'calc(100vh - 49px)'}} className=" overflow-hidden overflow-y-auto relative">
            <Header titre={'Images'} />
            <Images_content data  = {data} />
            <div className="h-32"></div>
        </div>
    )
}