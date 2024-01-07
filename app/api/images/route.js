import { urlServerHoster } from "@/utiles/process"

export const GET = async (request) => {
    return new Response('villes')
}


export const POST =  async (request) => {

    const  headersList = {
        "Accept": "*/*",
        }

    const images = await request.formData()

    console.log(images)

    let response = await fetch(urlServerHoster + "/images", { 
        method: "POST",
        body: images,
        headers: headersList
    });

    if(response.ok) {
        const res = await response.json()
        return new Response(JSON.stringify(res), { status : 201})
    } else {
    return new Response('il y a une erreur dans le server', { status : 501})

    }
}