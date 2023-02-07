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
    uid: string,
    id: number,
    name: string,
    description?: string,
    image?: string
}

export type ClasseType = {
    uid: string,
    id: number,
    name: string,
    description?: string,
}


export type CourseType = {
    uid: string,
    id: number,
    title: string,
    content: string,
    tag: string,
    published: boolean,
    subject: Partial<SubjectType>
    classes?: ClasseType[]
}

export type ChapterType = {
    uid: string,
    id: number,
    title: string,
    content: string,
    published: boolean,
    course: Partial<CourseType>
}


export enum Role {
    ROLE_STUDENT = 10,
    ROLE_PARENT = 20,
    ROLE_PROFESSOR = 30,
    ROLE_ADMIN = 50,
    ROLE_SUPER_ADMIN = 100
}