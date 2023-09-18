export const GET = async (request) => {
    const { url } = request
    const Url = new URL(url).searchParams.values().next()

    const metaData = await fetch(`https://jsonlink.io/api/extract?url=${Url.value}`)
    const { title, description, images, domain} = await metaData.json()


    const response = {
        success : 1,
        link: url, 
        meta: {
            title,
            description,
            image : {
                url : images[0]
            }
        }
    }
    console.log("==> url fetching for meta data : ", response.meta.title, response.link)
    return new Response(JSON.stringify(response), { status : 200})
}