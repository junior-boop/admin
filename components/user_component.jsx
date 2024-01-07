"use client"
import { useEffect, useState } from "react";
import ButtonLink from "./button";
import { CarbonClose, CarbonDocumentAdd, IcBaselineDeleteOutline } from "./icon";
import ListeItems from "./liste";
import { useRouter } from "next/navigation";

export default function UserComponent({data}){
    console.log(data)
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
            const response = await fetch("http://18.215.69.15:3000/api/inscription/" + keyImage, { 
                method: "DELETE",
            });
            
            if(!response.ok)  router.refresh()
           
        }, 500)
    }
    return(
        <ListeItems>
            {
                data.map(el => <ItemsUser key = {el.userId} data={el} onClick = {() => handleMore(el.key)} />)
            }
            <MoreContent data = {dataMore} isOpen = {isOpen} closeBtn={handleCloseMore} btnDelete={handleSupprime} />
        </ListeItems>
    )
}


const ItemsUser = ({data, onClick}) => {
    return(
        <button onClick={onClick} className="item h-[85px] flex items-center justify-between px-6 bg-white hover:bg-slate-50 w-full text-left">
           <div className="flex-1">
                <div className="font-medium text-slate-500">Nom</div>
                <div className="font-semibold text-lg">{data.user_name}</div>
           </div>
           <div className="flex-1">
                <div className="font-medium text-slate-500">Prenom</div>
                <div className="font-semibold text-lg">{data.user_subname}</div>
           </div>
           <div className="flex-1">
                <div className="font-medium text-slate-500">Téléphone</div>
                <div className="font-semibold text-lg">{data.user_telephone}</div>
           </div>
           <div className="flex-1">
                <div className="font-medium text-slate-500">E-mail</div>
                <div className="font-semibold text-lg">{data.user_mail}</div>
           </div>
           <div className="flex-1">
                <div className="font-medium text-slate-500">Ville</div>
                <div className="font-semibold text-lg">{data.user_town}</div>
           </div>
        </button>
    )
}

const MoreContent = ({data, isOpen, closeBtn, btnDelete}) =>{
    const [Data, setData ] = useState(null)


    console.log(data)
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

    
    // useEffect(() => {
    //     setData(exemlpe.value)
    //     if (data !== null) {
    //         const ville = JSON.parse(data.value)
    //         setData(ville)
    //     } else {
    //         setData(exemlpe.value)
    //     }
    // }, [data])



    const infos = exemlpe.value
    return(
        <div style = {{transform: isOpen ? 'translateX(0)': 'translateX(550px)'}} className="w-[500px] h-full fixed top-0 right-0 bg-white z-[100]  shadow-2xl transition-all duration-300">
            <div className="h-16 px-4 flex items-center">
                <button onClick={closeBtn} className="w-10 h-10 border border-slate-100 rounded-full flex items-center justify-center">
                    <CarbonClose className = "w-7 h-7 text-slate-500"  />
                </button>
            </div>
            <div className="px-6">
                <div className="text-3xl font-semibold">
                    {data !== null ? data.value.name : "Nom de l'utilisateur"}
                    
                </div>
                <div className="text-2xl font-light">
                    {data !== null ? data.value.surname : "Prenom de l'utilisation"}
                </div>
            </div>
            <div className="px-6 mt-6">
                <div>
                    Mail : 
                </div>
                <div className="font-bold text-slate-600">
                    {data !== null ? data.value.mail : "exemple@compagnie.com"}
                </div>
            </div>
            <div className="px-6 mt-6">
                <div>
                    Telephone : 
                </div>
                <div className="font-bold text-slate-600">
                    {data !== null ? data.value.tel : "+237654538389"}
                </div>
            </div>
            <div className="px-6 mt-6">
                <div>
                    Ville : 
                </div>
                <div className="font-bold text-slate-600">
                    {data !== null ? data.value.town : "Votre ville"}
                </div>
            </div>
            <div className="px-6 mt-6">
                <div>
                    Créé le : 
                </div>
                <div className="font-bold text-slate-600">
                    {data !== null ? data.value.createdAt : " le jours"}
                </div>
            </div>
            
            <div className="px-6 mt-6">
                <div>
                    Identifiant : 
                </div>
                <div className="font-bold text-slate-600">
                    {data !== null ? data.key : " le jours"}
                </div>
            </div>
            <div className=" px-6 mt-10">
                    <button className="px-4 py-2 flex items-center justify-center gap-3 bg-red-700 hover:bg-red-600 rounded-md"
                        onClick={btnDelete}
                    >
                        <IcBaselineDeleteOutline className = "w-5 h-5 text-white" />
                        <div className="text-white">
                            Supprimer 
                        </div>
                    </button>
                </div>
            {/* <div className=" w-full aspect-square">
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
            </div> */}
        </div>
    )   
}