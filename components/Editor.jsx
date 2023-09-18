"use client";


import { useEffect, useRef, useCallback, useState } from "react"


export default function Editor({post, saved, test}){
    const [isMount, setIsMount] = useState(false)
    const editorRef = useRef()

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default
        const Header = (await import("@editorjs/header")).default
        const Embed = (await import("@editorjs/embed")).default
        const List = (await import("@editorjs/list")).default
        const Images = (await import("@editorjs/image")).default
        const Quote = (await import('@editorjs/quote')).default
        const Raw = (await import('@editorjs/raw')).default
        const Links = (await import('@editorjs/link')).default
        const Delimiter  = (await import('@editorjs/delimiter')).default
        const Warning = (await import('@editorjs/warning')).default
        const Table = (await import('editorjs-table')).default



        // const body = postPatchSchema.parse(post)
        const editor = new EditorJS({
            holder: "editor",
            placeholder: "Ecrivez votre article ici...",
            onReady() {
                console.log('je suis charger')
                test(editor)
            },
            inlineToolbar: true,
            data: post !== '' && post,
            tools: {
              header:{
                class : Header,
                inlineToolbar : true,
                config: {
                    placeholder: 'Enter a header',
                    levels: [1, 2, 3],
                    defaultLevel : 1
                  }
                },
              list: List,
              embed: Embed,
              image : {
                class : Images,
                config: {
                    endpoints: {
                      byFile: '/api/image_content', // Your backend file uploader endpoint
                      byUrl: 'http://18.215.69.15:3000/api/image_content', // Your endpoint that provides uploading by Url
                    }
                  }
              },
              link : {
                class: Links,
                config: {
                  endpoint: '/api/fetchUrl', // Your backend endpoint for url data fetching,
                }
              },
              quote : Quote,
              raw : Raw,  
              delimiter : Delimiter,
              warning : Warning,
              Table : Table
            },
          })

          editor.isReady
          .then(() => console.log('EditorJs is working well!'))
          .catch((reason) => console.log(`Editor.js initialization failed because of ${reason}`))
          
    }, [saved])

   

    useEffect(() => {
        if(typeof window !== 'undefined') setIsMount(true)
        console.log(saved)
    }, [])

    

    useEffect(() => {

        if(isMount){
            initializeEditor()

            return () => {
                editorRef.current?.destroy()
                editorRef.current = undefined
            }
        }

        
    }, [isMount, initializeEditor])
    
    return(
        <div>
            <div  id="editor" className="min-h-[500px]"></div>
        </div>
    )
}