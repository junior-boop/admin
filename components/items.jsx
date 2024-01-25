"use client";
import Link from "next/link";
import { ButtonLinkWhite, ButtonWhite } from "./button";
import { IcBaselineDeleteOutline, IcTwotoneEdit, IconamoonShare2, IconamoonShare2Light } from "./icon";
import { useRouter } from "next/navigation";
import moment from "moment/moment";

const calculeDataEcart = (userData) => {
    const day = ['Dim','Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Novembre', 'Décembre']

    const thisDay = moment(Date.now()).dayOfYear()
    const date = moment(userData)
    const publicationYear = date.year()
    const thisYear = moment(Date.now()).year()

    const hrs = date.hours() < 10 ? "0"+date.hours() : date.hours()
    const min = date.minutes() < 10 ? "0"+date.minutes() : date.minutes()
    

    if(thisYear === publicationYear ){
        const ecart = thisDay - date.dayOfYear()

        console.log('cette annee')
        console.log(ecart) 
        
        if(ecart === 0) return "Aujourd'hui"
        if(ecart === 1) return "hier à " + hrs + " : " + min
        if(ecart > 1) return "Il y " + ecart + " jours à " + hrs + " : " + min
    }
    if(thisYear >= publicationYear ){
        console.log('annee derniere')
        console.log('this year', thisYear) 
        console.log('publie', publicationYear)  
    }

}



export default function Items({url = '/', data, id}){
    const {titre, images, createdBy, createdAt, key, imagesAlbum} = data.Item
    const router = useRouter()

    const handleDeleteItems = async () => {
        const api = await fetch('http://18.215.69.15:3000/api/articles/'+ id, {
            method : 'DELETE',
        })

        if(api.ok) {
            router.refresh()
        } 
    }

    console.log(imagesAlbum)
    const album = imagesAlbum.length > 0 && imagesAlbum.split(',')
// 

    const imageMap = () => {
       const tb = []
        if(album){
            if(album.length > 7){
                for(let i = 0; i < 7; i++){
                    tb.push(album[i])
                }
            }
        }
        return tb
    }
    const officialMap = album.length > 7 ? imageMap() : album
    const Imagethumb = ({imagev}) => {
        return(
            <div style={{border : "3px solid white"}} className="w-8 h-8 rounded-full overflow-hidden ml-[-12px]">
                <img src={imagev} alt="" className="w-8 h-8 object-cover object-center"/>
            </div>
        )
    }

    return(
        <div className="item h-[85px] flex items-center justify-between px-6 bg-white hover:bg-slate-50">
            <Link href={url} style={{flex : 2}}>
                <div className="text-lg font-semibold ">
                    { 
                        titre.length >= 40
                        ? titre.substring(0, 40) + '...'
                        : titre
                    }
                </div>
                <div className="font-medium text-slate-500">
                    Publié : {calculeDataEcart(createdAt)}
                </div>
            </Link>
            <div className="flex-1">
                <div className="font-medium text-slate-500">Auteur</div>
                <div className="font-semibold text-lg">{createdBy.name}</div>
            </div>
            <div className="flex-1">
                <div className="font-medium text-slate-500">Album</div>
                {
                    album ? 
                    (<div className="flex pl-3">
                        {
                            album.length > 7 ? 
                            (
                                <>
                                    {
                                        officialMap.map((el, key) => <Imagethumb imagev={el} key={key} />)
                                    }
                                    <div style={{border : "3px solid white"}} className="w-8 h-8 rounded-full overflow-hidden ml-[-12px] bg-slate-800 text-white text-sm flex items-center justify-center">
                                        +{album.length - 7}
                                    </div>
                                </>
                            ) :
                            album.map((el, key) => <Imagethumb imagev={el} key={key} />)
                        }
                    </div>)
                    : (
                        <div style={{width:'max-content'}} className="px-4 bg-slate-100 text-xs py-[3px] rounded-2xl font-semibold">
                            Aucune images
                        </div>
                    )
                }
            </div>
            <div className="flex-1 flex items-center gap-3 justify-end">
                <ButtonLinkWhite  url={`/articles/edit?id=${data.Item.key}`} icon={<IcTwotoneEdit className = "w-5 h-5" />}/>
                <ButtonWhite onClick={handleDeleteItems} icon={<IcBaselineDeleteOutline className = "w-5 h-5 text-red-700" />} />
                <ButtonWhite onClick={handleDeleteItems} icon={<IconamoonShare2 className = "w-5 h-5 text-green-800" />} />
            </div>
        </div>
    )
}


export function ItemsMail({mail, id, createdAt}){
    const router = useRouter()
    const handleDeleteItems = async () => {
        const api = await fetch('/api/newsletter/'+ id, {
            method : 'DELETE',
        })

        if(api.ok) {
            router.refresh()
        } 
    }

    return(
        <div className="item w-full px-6 py-3 flex items-center justify-between bg-white hover:bg-slate-50">
             <div style={{flex : 2}}>
                <div className="text-lg font-semibold ">
                    {mail}
                </div>
            </div>
            <div className="flex-1 flex items-center">
                <div className="font-medium text-slate-500">{id}</div>
            </div>
            <div className="flex-1">
                <div className="font-medium text-slate-500">{createdAt}</div>
            </div>
            <div className="flex-1 flex items-center gap-3 justify-end">
                <ButtonWhite onClick={handleDeleteItems} icon={<IcBaselineDeleteOutline className = "w-5 h-5 text-red-700" />} />
            </div>
        </div>
    )
}

export function ItemsRessources({url = '/', data, id}){
    const {titre, images, createdBy, createdAt} = data
    const router = useRouter()

    const handleDeleteItems = async () => {
        const api = await fetch('/api/ressources/'+ id, {
            method : 'DELETE',
        })

        if(api.ok) {
            router.refresh()
        } 
    }
    const album = JSON.parse(images)

    const imageMap = () => {
        const tb = []
         if(album){
             if(album.length > 7){
                 for(let i = 0; i < 7; i++){
                     tb.push(album[i])
                 }
             }
         }
         return tb
     }
    
  
   
    const officialMap = album.length > 7 ? imageMap() : album
    const Imagethumb = ({imagev}) => {
        return(
            <div style={{border :"3px solid white"}} className="w-8 h-8 rounded-full overflow-hidden ml-[-12px]">
                <img src={`https://i3de-server.godigital.workers.dev/images${imagev}`} alt="" className="w-8 h-8 object-cover object-center"/>
            </div>
        )
    }
    
    const UserId = JSON.parse(createdBy).userId

    return(
        <div className="item h-[85px] flex items-center justify-between px-6 bg-white hover:bg-slate-50">
            <Link href={url} style={{flex : 2}}>
                <div className="text-lg font-semibold ">
                    { 
                        titre.length >= 40
                        ? titre.substring(0, 40) + '...'
                        : titre
                    }
                </div>
                <div className="font-medium text-slate-500">
                    Publié : {calculeDataEcart(createdAt)}
                </div>
            </Link>
            <div className="flex-1">
                <div className="font-medium text-slate-500">Auteur Id</div>
                <div className="font-semibold text-lg">{UserId}</div>
            </div>
            <div className="flex-1">
                <div className="font-medium text-slate-500">Album</div>
                {
                    album ? 
                    (<div className="flex pl-3">
                        {
                            imageMap().length > 7 ? 
                            (
                                <>
                                    {
                                        officialMap.map((el, key) => <Imagethumb imagev={el} key={key} />)
                                    }
                                    <div style={{border : "3px solid white"}} className="w-8 h-8 rounded-full overflow-hidden ml-[-12px] bg-slate-800 text-white text-sm flex items-center justify-center">
                                        +{album.length - 7}
                                    </div>
                                </>
                            ) :
                            officialMap.map((el, key) => <Imagethumb imagev={el} key={key} />)
                        }
                    </div>)
                    : (
                        <div style={{width:'max-content'}} className="px-4 bg-slate-100 text-xs py-[3px] rounded-2xl font-semibold">
                            Aucune images
                        </div>
                    )
                }
            </div>
            <div className="flex-1 flex items-center gap-3 justify-end">
                <ButtonWhite onClick={handleDeleteItems} icon={<IcBaselineDeleteOutline className = "w-5 h-5 text-red-700" />} />
            </div>
        </div>
    )
}

export function MessageRessource({url = '/', data, id}){
    const { Id, nom, prenom, residence, telephone, email } = data
    const router = useRouter()
    
    return(
        <div className="item h-[85px] flex items-center justify-between px-6 bg-white hover:bg-slate-50">
            <Link href={url} style={{flex : 2}}>
                <div>
                    <div className="font-medium text-slate-500">Auteur</div>
                    <div className="font-semibold text-lg">{nom} {prenom}</div>
                </div>
            </Link>
            <div className="flex-1">
                <div className="font-medium text-slate-500">ville</div>
                <div className="font-semibold text-lg">{residence}</div>
            </div>
            <div className="flex-1">
                <div className="font-medium text-slate-500">mail</div>
                <div className="font-semibold text-lg">{email}</div>
            </div>
            <div className="flex-1">
                <div className="font-medium text-slate-500">Téléphone</div>
                <div className="font-semibold text-lg">{telephone}</div>
            </div>
            <div className="flex items-center gap-3 justify-end">
                <ButtonWhite  icon={<IcBaselineDeleteOutline className = "w-5 h-5 text-red-700" />} />
            </div>
        </div>
    )
}