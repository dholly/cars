import { defineStore } from 'pinia'
import { NotificationType, type Notification } from './types'
import { ref } from 'vue'

const getDefaultTimeout = (type?: NotificationType) => {
    switch (type) {
        case NotificationType.SUCCESS:
            return 10 * 1000;

        default:
            return 20 * 1000;
    }
}

export const useNotifications = defineStore('notifications', () => {
    const notifications = ref<Notification[]>([])
    const counter = ref<number>(0)
    const counterNotifications = ref(0)
    const chatNotifications = ref(0)

    const addNotification = (notification: Omit<Notification, 'id'>) => {
        if (notification.uid){
            removeSameNotifications(notification.uid)
        }
        const id = counter.value++;
        notifications.value.push({ ...notification, id: id })
        if (!notification.timeout) notification.timeout = getDefaultTimeout(notification.type);
        setTimeout(() => {
            removeNotification(id)
        }, notification.timeout)
    }
    const removeSameNotifications = (uid)=>{
        notifications.value = notifications.value.filter((n) => n.uid !== uid)
    }
    const removeNotification = (id: number) => {
        notifications.value = notifications.value.filter((n) => n.id !== id)
    }

    return {
        notifications,
        counterNotifications,
        chatNotifications,
        addNotification,
        removeNotification
    }
})