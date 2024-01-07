import Container from "@/components/container";
import { HeaderBack } from "@/components/header";

const getData = async (id) => {
    const response = await fetch(process.env.URL + '/ressources/'+id, {cache : "no-cache"})
    const data = await response.json()

    if(!response.ok) throw new Error('il y a un probleme')

    return data
}

// 1693487988924_eXq_UF

export default async function ReadArticle({params}){
    const { id } = params
    const Data = await getData(id)
    
    const {images, titre, createdAt, createdBy, description, categorie} = Data.ressources

   
    const album_images = JSON.parse(images)

    return(
        <div style={{ height : 'calc(100vh - 49px)'}}  className=" overflow-hidden overflow-y-auto relative">
            <HeaderBack />
            <Container>
                <div className="w-full m-auto text-5xl font-bold mb-4">
                    {titre}
                </div>
                <div className="w-full mx-auto mb-6">
                    <div className="font-medium">
                        Auteur : {Data.createdBy.user_name} { Data.createdBy.user_subname}
                    </div>
                    <div className="mb-2 font-medium">
                        Auteur id : {Data.createdBy.userId} 
                    </div>
                    <div>
                        Publié : {createdAt}
                    </div>
                </div>
                <div className="w-full m-auto  overflow-hidden mb-6">
                    <div className="text-2xl font-bold my-5"> Images</div>
                    <div className="grid grid-cols-3 gap-3">
                        {
                            album_images.map((el, key) => {
                                const element = process.env.URL + '/images' + el
                             
                                return(
                                    <div className="w-full aspect-square" key={key}>
                                        <img src={element} alt=""  className="w-full h-full object-cover rounded-lg"/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="w-full m-auto mb-6">
                    <div className="text-2xl font-bold my-5">
                    Description
                    </div>
                    <div>
                        {description}
                    </div>
                </div>
                <div className="w-full m-auto mb-6">
                    <div className="text-2xl font-bold my-5">
                    categorie
                    </div>
                    <div>
                        {categorie}
                    </div>
                </div>
                
                <div className="h-24"></div>
            </Container>
        </div>
    )
}

