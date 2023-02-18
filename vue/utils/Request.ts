import {SERVER_PATH} from "./Constants"

export enum PostContentType {
    JSON = 1,
    FORM_DATA = 2
}


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

export const deleteRequest = async (url: string) => {
    try {
        const response = await fetch(SERVER_PATH + url, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
        return await response.json()
    } catch (e) {
        console.error(e)
    }
}

export const postRequest = async (url: string, data: any, contentType = PostContentType.FORM_DATA) => {
    let options = {
        method: 'POST',
        credentials: "include",
        body: contentType === PostContentType.FORM_DATA ? data : JSON.stringify(data),
    } as RequestInit
    if (PostContentType.JSON===contentType) options = {...options, headers: {'Content-Type': 'application/json'}}
    try {
        const response = await fetch(SERVER_PATH + url, options)
        return await response.json()
    } catch (e) {
        console.error(e)
    }
}

export const putRequest = async (url: string, data: any, contentType = PostContentType.FORM_DATA) => {
    let options = {
        method: 'PUT',
        credentials: "include",
        body: contentType === PostContentType.FORM_DATA ? data : JSON.stringify(data),
    } as RequestInit
    if (PostContentType.JSON===contentType) options = {...options, headers: {'Content-Type': 'application/json'}}
    try {
        const response = await fetch(SERVER_PATH + url, options)
        return await response.json()
    } catch (e) {
        console.error(e)
    }
}