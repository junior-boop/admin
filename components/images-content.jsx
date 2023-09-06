"use client"
import { useEffect, useState } from "react"
import Container from "./container"
import { CarbonClose, CiMoreHorizontal, IcBaselineDeleteOutline } from "./icon"
import { useRouter } from "next/navigation"

export default function Images_content({data}){
    const [dataMore, setDataMore] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [keyImage, setKeyImage] = useState('')


    const router = useRouter()

    const handleMore = (id) => {
        const element = data.find(el => id === el.key)
        setDataMore(element)
        setKeyImage(id)
        setIsOpen(true)
    }


    const handleCloseMore = () => {
        setIsOpen(false)
        setDataMore(null)
    }

    const handleSupprime = () => {
        setIsOpen(false)
        setDataMore(null)
        
        setTimeout(async () => {
            const response = await fetch("http://18.215.69.15:3000/api/images/" + keyImage, { 
                method: "DELETE",
            });
            
            router.refresh()
        }, 1000)
    }

    return(
        <Container>
            <div className="grid grid-cols-4 gap-2">
                {
                    data.map((el) => {
                        
                        if(el.value !== '[object Object]'){
                            const element = el.value
                            return <ImageItem srcImage={element.path} key = {el.key}  onClick={() => handleMore(el.key)} />
                        }
                    })
                }
            </div>
            <MoreContent data = {dataMore} isOpen = {isOpen} closeBtn={handleCloseMore} btnDelete={handleSupprime} />
        </Container>
    )
}





function ImageItem({srcImage, onClick}) {
    return(
        <div className="w-full aspect-square relative rounded-md overflow-hidden border border-slate-200">
            <div className="w-full h-full overflow-hidden">
                <img src={"http://18.215.69.15:3000"+srcImage} alt="" className=" h-full w-full object-cover object-center" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full p-4">
                <button onClick={onClick} style={{ backgroundColor : '#fff5'}} className="w-10 h-10 rounded-full flex items-center justify-center">
                    <CiMoreHorizontal className = 'w-7 h-7 absolute' />
                </button>
            </div>
        </div>
    )
}

const MoreContent = ({data, isOpen, closeBtn, btnDelete}) =>{
    const [Data, setData ] = useState(null)

    const exemlpe = {
        "key": "",
        "value": {
            "images": {
                "image_name": "",
                "image_path": "",
                "image_size": 0,
                "image_mimetype": "",
                "createdAt": "",
                "_id": ""
            },
            "_id": ""
        }
    }

    useEffect(() => {
        setData(exemlpe.value)
        if (data !== null) {
            const ville = data.value
            setData(ville)
        } else {
            setData(exemlpe.value)
        }
    }, [data])



    const infos = exemlpe.value
    return(
        <div style = {{transform: isOpen ? 'translateX(0)': 'translateX(550px)'}} className="w-[500px] h-full fixed top-0 right-0 bg-white z-[100]  shadow-2xl transition-all duration-300">
            <div className="h-16 px-4 flex items-center">
                <button onClick={closeBtn} className="w-10 h-10 border border-slate-100 rounded-full flex items-center justify-center">
                    <CarbonClose className = "w-7 h-7 text-slate-500"  />
                </button>
            </div>
            <div className=" w-full aspect-square">
                <img src={Data !== null ? "http://18.215.69.15:3000"+Data.images.image_path : "http://18.215.69.15:3000"+infos.images.image_path} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
                <div className="font-semibold">
                Nom : {Data !== null ? Data.images.image_name : infos.images.image_name}
                </div>
                <div className="">
                Taille : {Data !== null ? Data.images.image_size : infos.images.image_size} octec
                </div>
                <div className="">
                Crée le : {Data !== null ? Data.images.createdAt : infos.images.createdAt}
                </div>
                <div className="mt-10">
                    <button className="px-4 py-2 flex items-center justify-center gap-3 bg-red-700 hover:bg-red-600 rounded-md"
                        onClick={btnDelete}
                    >
                        <IcBaselineDeleteOutline className = "w-5 h-5 text-white" />
                        <div className="text-white">
                            Supprimer
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )   
}