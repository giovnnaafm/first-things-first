export interface Message {
    title?: string
    message: string
    action?: {
        title: string
        onClick: () => void
    }
    isDanger?: boolean
}