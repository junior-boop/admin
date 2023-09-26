import { HeaderBack } from "@/components/header";
import { CarbonWarningAltFilled } from "@/components/icon";
import Link from "next/link";

const getData = async (id) => {
    const response = await fetch('http://18.215.69.15:3000/api/articles/edit/'+id, {cache : "no-cache"})
    const data = await response.json()

    if(!response) throw new Error('il y a un probleme')

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
                                    album.map((el, key) => <div className="w-full aspect-square overflow-hidden" key = {key}> <img src={el} alt="" width={'100%'} className="aspect-square object-cover object-center" /> </div>)
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

const ConvertEditorToDiv = (data) => {
    return data.map(el => {
        switch (el.type) {
            case 'header':
                 if(el.data.level === 1) return (<div className="text-4xl font-bold mb-4"> {el.data.text} </div>) 
                 if(el.data.level === 2) return (<div className="text-3xl font-bold mb-4"> {el.data.text} </div>) 
                 if(el.data.level === 3) return (<div className="text-2xl font-bold mb-4"> {el.data.text} </div>) 
                 if(el.data.level === 4) return (<div className="text-1xl font-bold mb-4"> {el.data.text} </div>) 
                 break;
            case 'paragraph':
                 return (<div className="text-base mb-4"> {el.data.text} </div>) 
            case 'list':
                if(el.data.style === 'ordered') {
                    
                    return(
                        <ol className="pl-6 list-disc">
                            {
                                el.data.items.map((el, key) => <li className="text-base" key={key}>{el}</li>)
                            }
                        </ol>
                    )
                }
                 return (
                        <ul>
                            {
                                el.data.items.map((el, key) => <li className="text-base" key={key}>{el}</li>)
                            }
                        </ul>
                    ) 
            case 'quote':
                 return (
                 <div className=" mb-4 p-6 bg-slate-100 rounded-md "> 
                    <div className="text-xl italic font-normal text-slate-700 text-center w-[90%] m-auto">
                        {el.data.text}
                    </div>
                    <div className="text-center mt-5 font-bold">
                        {el.data.caption}
                    </div>
                  </div>) 
            case 'warning':
                 return (
                 <div className=" mb-4 p-6 bg-red-50 rounded-md flex gap-4 items-start"> 
                    <div className=" font-normal text-red-600 w-[32px]">
                    <CarbonWarningAltFilled className = {'w-7 h-7'} />
                    </div>
                    <div className="flex-1 ">
                        <div className="text-xl font-semibold text-red-500">
                            {el.data.title}
                        </div>
                        <div>
                            {el.data.message}
                        </div>
                    </div>
                  </div>) 
            case 'delimiter':
                 return (<div className="text-5xl font-semibold my-8 text-center"> * * * </div>) 
            case 'image':
                 return (
                 <div className="text-base mb-4 py-4">
                        <div className="rounded-lg overflow-hidden">
                            <img src={el.data.file.url} width={"100%"} />
                        </div>
                        <div className="text-base italic text-slate-500 pt-2 text-center">
                            {el.data.caption}
                        </div>
                 </div>) 
            case 'link':
                const meta = el.data.meta
                
                 return (<Link href={el.data.link} className="p-6 mb-4 border border-slate-200 rounded-lg flex justify-between gap-4 mt-4"> 
                        <div>
                            <div className="text-xl font-bold ">{meta.title}</div>
                            <div className="text-base text-slate-600 ">{meta.description.length >= 100 ? meta.description.substring(0, 100) + '...' : meta.description}</div>
                            <div className="text-sm italic text-slate-600 mt-2">{el.data.link}</div>
                        </div>
                        <div>
                            <img src={meta.image.url} alt="" className="w-24 h-24" />
                        </div>
                    </Link>) 
        }
    })
}