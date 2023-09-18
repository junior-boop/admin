export const POST = async (request) => {

    const  headersList = {
        "Accept": "*/*",
    }

    const bodyContent = await request.formData()

    let response = await fetch("http://18.215.69.15:3000/api/articles", { 
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    if (response.ok){
        const data = await response.json()
        return new Response(JSON.stringify(data), {status : 201})
    } else {
        return new Response("il y a une erreur sur le serveur", { status : 501})
    }
}

// 