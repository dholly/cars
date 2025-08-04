export enum NotificationType {
    ERROR = "error",
    WARNING = "warning",
    SUCCESS = "success",
    INFO = "info"
}

export interface NotificationItem {
    id: number
    message: string
    title?: string
    type?: NotificationType
    component?: Object
    componentProps?: Object
    user?: {
        avatar: string;
        name: string;
        action?: string;
    }
}

export interface Notification extends NotificationItem {
    uid?: string,
    timeout?: number;
}