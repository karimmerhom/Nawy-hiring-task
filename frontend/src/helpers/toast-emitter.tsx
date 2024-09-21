import { toast, ToastOptions } from 'react-toastify';

type ToastMessage = string;

export function showError(message: ToastMessage, options?: ToastOptions): void {
    toast.error(message, {
        closeOnClick: true,
        toastId: 'error',
        ...options,
    });
}

