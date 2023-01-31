import {toast} from "@zerodevx/svelte-toast";

export const success = (message: string) => {
    toast.push(message, {
        theme: {
            '--toastBackground': '#0b956c',
            '--toastColor': '#ffffff',
            '--toastBarBackground': '#0ca678'
        }
    })
}

export const error = (message: string) => {
    toast.push(message, {
        theme: {
            '--toastBackground': '#c13333',
            '--toastColor': '#ffffff',
            '--toastBarBackground': '#d63939'
        }
    })
}

export const info = (message: string) => {
    toast.push(message, {
        theme: {
            '--toastBackground': '#3b8acb',
            '--toastColor': '#ffffff',
            '--toastBarBackground': '#4299e1'
        }
    })
}