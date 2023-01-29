
export type User = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
}

export type UserStoreType = {
    authenticated: boolean,
    user: User | undefined,
    loading: boolean
}