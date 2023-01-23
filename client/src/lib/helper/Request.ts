import { SERVER_PATH } from "./Constants"

export const get = async (url: string) => {
    try {
        const response = await fetch(SERVER_PATH + url, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
        return await response.json()
    } catch (error) {
        return console.error(error)
    }
}

export const post = async (url: string, data:any) => {
    const response = await fetch(SERVER_PATH + url, {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: {'Content-Type': 'application/json' }
    })
    return await response.json()
}
