"use client"
import { useState } from "react"
import Container from "./container"
import { CarbonClose, CiMoreHorizontal } from "./icon"

export default function Images_content({data}){
    const [dataMore, setDataMore] = useState(null)
    const [isOpen, setIsOpen] = useState(true)
   
    const DataBase = () => {
        const table = []
        data.map(el => {
            const regex = /([{,]\s*)(\S+)\s*(:)/mg
            const convertToJson = el.value.replace(regex, '$1"$2"$3')
            const replace_1 = convertToJson.replace(/new ObjectId\(/g, '')
            const replace_2 = replace_1.replace(/\)/g, '')
            const replace_3 = replace_2.replace(/\'/g, '"')
            // console.log(replace_3)
            const json = JSON.parse(replace_3)

            const obj = {
                key : el.key,
                value : json
            }
            table.push(obj)
           
        })

        return table
    }

    const handleMore = (id) => {
        const element = DataBase().find(el => id === el.key)
        setDataMore(element)
        setIsOpen(true)
        
    }

    const handleCloseMore = () => {
        setIsOpen(false)
        setDataMore(null)
    }

    return(
        <Container>
            <div className="grid grid-cols-4 gap-2">
                {
                    DataBase().map((el) => <ImageItem srcImage={el.value.images.image_path} key = {el.key} onClick={() => handleMore(el.key)} />)
                }
            </div>
            <MoreContent data = {dataMore} isOpen = {isOpen} closeBtn={handleCloseMore} />
        </Container>
    )
}





function ImageItem({srcImage, onClick}) {
    return(
        <div className="w-full aspect-square relative rounded-md overflow-hidden border border-slate-200">
            <div className="w-full h-full overflow-hidden">
                <img src={"http://localhost:3000"+srcImage} alt="" className=" h-full w-full object-cover object-center" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full p-4">
                <button onClick={onClick} style={{ backgroundColor : '#fff5'}} className="w-10 h-10 rounded-full flex items-center justify-center">
                    <CiMoreHorizontal className = 'w-7 h-7 absolute' />
                </button>
            </div>
        </div>
    )
}

const MoreContent = ({data, isOpen, closeBtn}) =>{
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

    const infos = data !== null ? data : exemlpe
    const {images} = infos.value
    return(
        <div style = {{transform: isOpen ? 'translateX(0)': 'translateX(550px)'}} className="w-[500px] h-full fixed top-0 right-0 bg-white z-[100] border-l border-slate-200 shadow-2xl transition-all duration-300">
            <div className="h-16 border-b border-slate-200 px-4 flex items-center">
                <button onClick={closeBtn} className="w-10 h-10 border border-slate-100 rounded-full flex items-center justify-center">
                    <CarbonClose className = "w-7 h-7 text-slate-500"  />
                </button>
            </div>
            <div className=" w-full aspect-square border border-slate-100">
                <img src={"http://localhost:3000"+images.image_path} alt="" />
            </div>
            <div>
                
            </div>
        </div>
    )   
}