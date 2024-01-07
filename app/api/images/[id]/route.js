export const DELETE =  async (request) => {

    const url = new URL(request.url)
    const pathname = url.pathname
    const key = pathname.split('/')
    const key_value = key.at(-1)


    let response = await fetch(process.env.URL+"/images/" + key_value, { 
        method: "DELETE",
    });

    if(response.ok) {
        return new Response('ok', {status : 200})
    } else {
        return new Response('il y a une erreur dans le server', { status : 501})
    }
}