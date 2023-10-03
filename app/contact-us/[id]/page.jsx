import Container from "@/components/container";
import { HeaderBack } from "@/components/header";

const getData = async (id) => {
    const response = await fetch('http://18.215.69.15:3000/api/contact/'+id, {cache : "no-cache"})
    const data = await response.json()

    if(!response.ok) throw new Error('il y a un probleme')

    return data
}

// 1693487988924_eXq_UF

export default async function ReadArticle({params}){
    const { id } = params
    const Data = await getData(id)
    
    const {name, surname, ville, tel, mail, message, key, createdAt} = Data


    // imagesAlbum[0] !== '' && imagesAlbum[0].split(',')
    return(
        <div style={{ height : 'calc(100vh - 49px)'}}  className=" overflow-hidden overflow-y-auto relative">
            <HeaderBack />
            <Container>
                <div className="w-[650px] m-auto ">
                    Auteur
                </div>
                <div className="w-[650px] text-xl font-bold mb-4 mx-auto">
                    {name} {surname}
                </div>
                <div className="w-[650px] m-auto ">
                    Ville
                </div>
                <div className="w-[650px] text-xl font-bold mb-4 mx-auto">
                    {ville}
                </div>
                <div className="w-[650px] m-auto ">
                    Adresse e-mail
                </div>
                <div className="w-[650px] text-xl font-bold mb-4 mx-auto">
                    {mail}
                </div>
                <div className="w-[650px] m-auto ">
                    Numéro de téléphone
                </div>
                <div className="w-[650px] text-xl font-bold mb-4 mx-auto">
                    {tel}
                </div>
                <div className="w-[650px] m-auto ">
                    Créé le :
                </div>
                <div className="w-[650px] text-xl font-bold mb-4 mx-auto">
                    {createdAt}
                </div>
                <div className="w-[650px] m-auto  overflow-hidden mb-6">
                    
                </div>

                <div className="w-[650px] m-auto mb-6">
                    <div className="text-2xl font-bold mt-5">
                    Message
                    </div>
                    <div>
                        {message}
                    </div>
                </div>
                <div className="h-24"></div>
            </Container>
        </div>
    )
}

