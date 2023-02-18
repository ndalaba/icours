
export type Options = {
    title?: string,
    description?: string,
    actionLabel?: string,
    show?: boolean,
    callable: Function
}

type AlertType = Options & {
    update: (options: Options) => AlertType,
    setVisible: (visible: boolean) => AlertType,
}


export const alertStore = reactive<AlertType>({
    title: '',
    description: '',
    actionLabel: '',
    show: false,
    callable: Function,
    update(options: Options) {
        this.title = options.title
        this.callable = options.callable
        this.description = options.description
        this.actionLabel = options.actionLabel
        return this
    },
    setVisible(visible: boolean) {
        this.show = visible
        return this
    }
})

export function alert(options: Options) {
    alertStore.update(options).setVisible(true)
}

export function close() {
    alertStore.setVisible(false)
}
