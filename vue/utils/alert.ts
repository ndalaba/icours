type AlertType = {
    title: string,
    description: string,
    actionLabel?: string,
    callable?: Function,
    show: boolean,
    update: (options: AlertType) => AlertType,
    setVisible: (visible: boolean) => AlertType,
}

export const alertStore = reactive({
    title: '',
    description: '',
    actionLabel: '',
    show: false,
    callable: undefined,
    update(options: AlertType) {
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
} as AlertType)

export function alert(options: AlertType) {
    alertStore.update(options).setVisible(true)
}

export function close() {
    alertStore.setVisible(false)
}
