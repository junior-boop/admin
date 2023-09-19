import Container from "@/components/container";
import { HeaderBack } from "@/components/header";

const getData = async (id) => {
    const response = await fetch('http://18.215.69.15:3000/api/ressources/'+id, {cache : "no-cache"})
    const data = await response.json()

    if(!response.ok) throw new Error('il y a un probleme')

    return data
}

// 1693487988924_eXq_UF

export default async function ReadArticle({params}){
    const { id } = params
    const Data = await getData(id)
    
    const {images, titre, createdAt, createdBy, like, share, download, description, categorie} = Data

   

    // imagesAlbum[0] !== '' && imagesAlbum[0].split(',')
    return(
        <div style={{ height : 'calc(100vh - 49px)'}}  className=" overflow-hidden overflow-y-auto relative">
            <HeaderBack />
            <Container>
                <div className="w-full m-auto text-5xl font-bold mb-4">
                    {titre}
                </div>
                <div className="w-full mx-auto mb-6">
                    <div>
                        Auteur : {createdBy.name} { createdBy.surname}
                    </div>
                    <div>
                        Publié : {createdAt}
                    </div>
                </div>
                <div className="w-full m-auto  overflow-hidden mb-6">
                    <div className="text-2xl font-bold my-5"> Images</div>
                    <div className="grid grid-cols-3 gap-3">
                        {
                            images.map((el, key) => {
                                const image = el.replace(/\"/g, '')
                                return(
                                    <div className="w-full aspect-square" key={key}>
                                        <img src={"http://18.215.69.15:3000"+el} alt=""  className="w-full h-full object-cover rounded-lg"/>
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

