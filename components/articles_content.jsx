"use client";
import { useEffect, useState } from 'react'
import Items, { ItemsMail } from "./items";
import ListeItems from "./liste";
import ButtonLink from './button';
import { CarbonDocumentAdd } from './icon';




export default function ArticleContent({data}){

    return(
        <ListeItems>
            {
                data.length !== 0 
                ? (
                    <>
                        {
                        data.map( el => < Items url={`/articles/${el.key}`} data={el.value} id={el.key} key={el.key} />)
                        }
                    </>
                ) 
                : (
                    <div className='w-full flex items-center justify-center h-48 flex-col'>
                        <div className='font-bold text-lg'>
                            Aucun Article
                        </div>
                        <div className='mb-4'>
                            Cliquez sur ce bouton pour ajouter un nouvelle article dans la base de données
                        </div>
                        <ButtonLink titre={'Nouvel Article'} url={'/articles/new'} icon={<CarbonDocumentAdd className = {'text-white w-6'} />}/>
                    </div>
                )
            }
        </ListeItems>
    )
}


export function MailContent({data}){
    console.log(data)

    return(
        <ListeItems>
            {
                data.length !== 0 
                ? (
                    <>
                        {
                            data.map( el => {
                                return <ItemsMail mail={el.email} id={el.newsletterId} createdAt={el.createdAt} key={el.newsletterId} />
                            })
                        }
                    </>
                ) 
                : (
                    <div className='w-full flex items-center justify-center h-48 flex-col'>
                        <div className='font-bold text-lg'>
                            Aucun Article
                        </div>
                        <div className='mb-4'>
                            Cliquez sur ce bouton pour ajouter un nouvelle article dans la base de données
                        </div>
                        <ButtonLink titre={'Nouvel Article'} url={'/articles/new'} icon={<CarbonDocumentAdd className = {'text-white w-6'} />}/>
                    </div>
                )
            }
        </ListeItems>
    )
}