import type {SubjectType, User, UserStoreType} from "./type";

export const UserStore = reactive({
    authenticated: false,
    user: undefined,
    loading: true,
    setUser(user: User) {
        this.user = user
        return this
    },
    setAuthenticated(auth: boolean) {
        this.authenticated = auth
        return this
    },
    setLoading(loading: boolean) {
        this.loading = loading
        return this
    }
} as UserStoreType)
export const SubjectStore = reactive({
    subjects: [],
    setSubjects(subjects: []) {
        this.subjects = subjects
        return this
    }
})
export const ClasseStore = reactive({
    classes: [],
    setClasses(classes: []) {
        this.classes = classes
        return this
    }
})