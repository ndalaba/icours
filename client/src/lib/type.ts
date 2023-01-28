
export type User = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
}

export type AuthStoreType = {
    auth: boolean,
    user?: User 
}