import {writable} from "svelte/store";
import type {ClasseType, SubjectType, UserStoreType} from "./type";

export const userStore = writable({authenticated: false, user: undefined, loading: true} as UserStoreType)
export const SubjectStore = writable([] as SubjectType[])
export const ClasseStore = writable([] as ClasseType[])