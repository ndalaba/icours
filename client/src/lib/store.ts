import { writable } from "svelte/store";
import type { UserStoreType } from "./type";

export const userStore = writable({ authenticated: false, user: undefined, loading: true } as UserStoreType)