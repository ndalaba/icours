import { SERVER_PATH } from "./Constants"

export const getRequest = async (url: string) => {
    try {
        const response = await fetch(SERVER_PATH + url, {
            method: 'GET',
            credentials: "include",
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

export const postRequest = async (url: string, data: any) => {
    const response = await fetch(SERVER_PATH + url, {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    return await response.json()
}
