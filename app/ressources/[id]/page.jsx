import { HeaderBack } from "@/components/header";
import { CarbonWarningAltFilled } from "@/components/icon";
import Link from "next/link";

const getData = async (id) => {
    const response = await fetch('http://18.215.69.15:3000/api/ressource/'+id, {cache : "no-cache"})
    const data = await response.json()

    if(!response.ok) throw new Error('il y a un probleme')

    return data
}

// 1693487988924_eXq_UF

export default async function ReadArticle({params}){
    const { id } = params
    const Data = await getData(id)
    
    const {key, images, titre, contenu, imagesAlbum, createdAt, createdBy} = Data.Item
    const imagesv = 'http://18.215.69.15:3000'+ images[0]
    const content = contenu
    
    const album = imagesAlbum.length > 0 && imagesAlbum.split(',')
    // imagesAlbum[0] !== '' && imagesAlbum[0].split(',')
    return(
        <div style={{ height : 'calc(100vh - 49px)'}}  className=" overflow-hidden overflow-y-auto relative">
            <HeaderBack />
            <div>
                <div className="w-[650px] m-auto text-5xl font-bold mb-4">
                    {titre}
                </div>
                <div className="w-[650px] mx-auto mb-6">
                    <div>
                        Auteur : {createdBy.name}
                    </div>
                    <div>
                        Publié : {createdAt}
                    </div>
                </div>
                <div className="w-[800px] m-auto border border-slate-100 rounded-lg overflow-hidden mb-6">
                    <img src={imagesv} className="object-cover" width={'100%'} />
                </div>
                <div className="w-[650px] m-auto mb-6">
                    {
                        ConvertEditorToDiv(content.blocks)
                    }
                </div>
                {
                    imagesAlbum.length > 0 && (
                        <>
                            <div className="w-[650px] m-auto text-xl font-bold my-8">
                                Quelques images
                            </div>
                            <div className="w-[800px] mx-auto grid grid-cols-4 gap-3">
                                {
                                    album.map((el, key) => <div className="w-full aspect-square overflow-hidden" key = {key}> <img src={'http://18.215.69.15:3000'+el} alt="" width={'100%'} className="aspect-square object-cover object-center" /> </div>)
                                }
                            </div>
                        </>
                    )
                }
                <div className="h-24"></div>
            </div>
        </div>
    )
}

