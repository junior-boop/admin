import { urlServerHoster } from "@/utiles/process";

export const POST = async({ formData }) => {
    const bodyContent = await formData()
    console.log(bodyContent)

    const response = await fetch(urlServerHoster + "/multiple_images", {
        method: "POST",
        body: bodyContent
    });

   

    return new Response(JSON.stringify(await response.json()))
}