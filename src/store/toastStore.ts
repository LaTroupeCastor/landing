import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export enum ToastType {
    SUCCESS = "success",
    ERROR = "error",
}

interface ToastStore {
    type: ToastType;
    timeout: number;
    uuid: string;
    message: string;
    icon?: string;
}

interface ToastState {
    toasts: ToastStore[];
    defaultTimeout: number;
}

export const useToastStore = defineStore('toast', {
    state: (): ToastState => {
        return {
            toasts: [],
                defaultTimeout: 3000,
        }
    },
    actions: {
        addToast(message: string, type: ToastType, icon?: string, timeout?: number) {
            const toast: ToastStore = {
                type,
                message,
                icon,
                timeout: timeout || this.defaultTimeout,
                uuid: uuidv4(),
            };

            this.toasts = [...this.toasts, toast];

            setTimeout(() => {
                this.removeToast(toast.uuid)
            }, toast.timeout || this.defaultTimeout);
        },
        removeToast(uuid: string) {
            this.toasts = this.toasts.filter((toast) => toast.uuid !== uuid);
        },
    },
})
