import {writable} from "svelte/store";

type AlertType = {
    title: string,
    description: string,
    actionLabel?: string,
    callable?: Function,
    show: boolean
}

export const alertStore = writable({
    title: '',
    description: '',
    actionLabel: '',
    show: false,
    callable: undefined
} as AlertType)

export function alert(options: AlertType) {
    alertStore.update(_ => ({...options, show: true}))
}

export function close() {
    alertStore.update(v => ({...v, show: false}))
}
