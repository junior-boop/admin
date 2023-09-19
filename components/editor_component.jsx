'use client'
import { useState } from "react"
import { HeaderBack } from "./header"
import Editor from "./Editor"
import { MaterialSymbolsBrokenImageOutlineRounded } from "./icon"

export default function ArticlePost({post}){

    const imagesv = 'http://localhost:3000/images/'+post.Item.images[0].filename

    const [save, setSave] = useState(false)
    const [editor, setEditor] = useState()
    const [base64, setBase64] = useState([])
    const [imageP, setImageP] = useState(null)
    const [titre, setTitre] = useState(post.Item.titre)

    
    const saveArticle = async ({images_album, contenu}) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "*"
        }
           
        let bodyContent = new FormData();
        bodyContent.append('image', imageP.image_target ? imageP.image_target : 'rien')
        bodyContent.append('imagesAlbum', images_album)
        bodyContent.append('contenu', contenu)
        bodyContent.append('titre', titre)
        
        let response = await fetch("http://localhost:3000/api/articles", { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        
        if(response.ok){
            console.log('je suis la ok')
            let data = await response.json();
            console.log('save correctly', data)
        }
    }

    const handleSaveData = () => {

        setSave(true)
        editor.save()
            .then((output) => {
                (async () => {
                    let headersList = {
                        "Accept": "*/*",
                        "User-Agent": "*"
                    }
                       
                    let bodyContent = new FormData();

                    base64.forEach(element => {
                        bodyContent.append("image", element.image_target)
                    });
                    
                    let response = await fetch("http://localhost:3000/api/images", { 
                        method: "POST",
                        body: bodyContent,
                        headers: headersList
                    });
                    
                    if(response.ok){
                        let data = await response.json();

                        saveArticle({
                            images_album : data,
                            contenu : JSON.stringify(output)
                        })
                    }
                })()
            })
            .catch((reason) => console.log(reason))
    }


    const handleInputImages = ({target}) => {
        console.log('images')
        console.log(target.files)

        if (!target.files || !target.files[0]) return;


        for (let i = 0; i < target.files.length; i++) {
            let el = target.files[i]

            const FilesReader = new FileReader();
            FilesReader.readAsDataURL(el);
            FilesReader.addEventListener('load', (e) => {
                const obj = {
                    name: el.name,
                    image: e.target.result,
                    size: el.size,
                    image_id: generated_ID(),
                    image_target: el
                }
                setBase64(element => [...element, obj]);
            })
        }
    }


    const handleSuprimeImage = (id) => {
        const filter = base64.filter(el => id !== el.image_id)
        setBase64([...filter])
    }

    const handleImagePrincipale = ({target}) => {
        if (!target.files || !target.files[0]) return;
        for (let i = 0; i < target.files.length; i++) {
            let el = target.files[i]

            const FilesReader = new FileReader();
            FilesReader.readAsDataURL(el);
            FilesReader.addEventListener('load', (e) => {
                const obj = {
                    name: el.name,
                    image: e.target.result,
                    size: el.size,
                    image_id: generated_ID(),
                    image_target: el
                }
                setImageP(obj);
            })
        }
    }


    return(
        <div style={{ height : 'calc(100vh - 49px)'}}  className="overflow-hidden overflow-y-auto relative">
            <HeaderBack btnSave onClick={handleSaveData} />
            <div>
                <div className = 'w-[650px] m-auto font-semibold text-base text-gray-500 border-b border-slate-200 pb-3 cursor-default'>
                    Titre de l'article
                </div>
                
                <Textearea onChange={({target}) => setTitre(target.value)} value={titre} />
                <div style = {{ backgroundImage : `url(${imageP !== null ?  imageP.image : imagesv})`}} className = "w-[800px] m-auto border border-slate-200 min-h-[350px] mb-7 flex justify-center items-center rounded-lg bg-cover">
                    <input type="file" name="images" className = "input_images" onChange = {handleImagePrincipale}  />
                </div>
                <div className = 'w-[650px] m-auto font-semibold text-base text-gray-500 border-b border-slate-200 pb-3 cursor-default'>
                    Contenu de l'article
                </div>
                <Editor post={post.Item.contenu} saved = {save} test = {(t) => setEditor(t) } /> 
                <div className = "w-[800px] m-auto ">
                    <div className = "w-[650px] m-auto font-semibold text-base text-gray-500 border-b border-slate-200 pb-3 cursor-default">
                    gallerie image
                    </div>
                    <div className = 'w-full min-h-[150px] py-4 flex flex-wrap gap-3 flex-row'>
                        {
                            base64.map(el => <ImageItem images={el} Supprimer={() => handleSuprimeImage(el.image_id)} key = {el.image_id} />)
                        }
                        <div className = "add_image">
                            <div className  = "p-2 flex flex-col items-center justify-center">
                                <MaterialSymbolsBrokenImageOutlineRounded className = "w-7 aspect-square text-slate-700" />
                                <div className = "text-center font-semibold text-slate-500 w-[80%]">
                                    Ajouter une image
                                </div>
                            </div>
                            <input type="file" multiple name="image" className = 'add_image_btn' onChange = {handleInputImages} />
                        </div>
                    </div>
                </div>
                <div className = 'w-full h-[200px]'></div>
            </div>
        </div>
    )
}

function Textearea({onChange, value}){

    const [scrollH, setScrollH] = useState('auto')

    const Height = () => {
        if(scrollH <= 80) {setScrollH('auto'); console.log('je suis dedans')}

        return scrollH
    }

    return(
        <div className = 'flex justify-center'>
            <textarea className = "w-[650px] mx-auto border-none resize-none  h-auto text-4xl font-bold outline-none transition-all ease-in-out duration-200s my-3 textArea" onInput = {({target}) => setScrollH(target.scrollHeight)} onChange = {onChange} placeholder = {'Votre titre'} style = {{ height : Height()}} >
                {value}
            </textarea>
        </div>
    )
}


function ImageItem({ images, Supprimer }) {
    return (
        <div className="ImageRessource">
            <img src={`${images.image}`} alt="" height={'100%'} />
            <button onClick={Supprimer}>
                <MaterialSymbolsCloseRounded style={{ height: 24, width: 24 }} />
            </button>
        </div>
    )
}