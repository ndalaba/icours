export type User = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    active: boolean,
    address: string,
    role: number
}

export type UserStoreType = {
    authenticated: boolean,
    user: User | undefined,
    loading: boolean
}

export type SubjectType = {
    id: number,
    subject: string,
    description: string,
    image?: string
}


export enum Role {
    ROLE_STUDENT = 10,
    ROLE_PARENT = 20,
    ROLE_PROFESSOR = 30,
    ROLE_ADMIN = 50,
    ROLE_SUPER_ADMIN = 100
}