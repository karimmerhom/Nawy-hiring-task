import { showError } from '@/helpers/toast-emitter';

export function globalErrorHandler(err: any): Promise<any> {
    try {
        showError(err.response.data.message);
    } catch (error) {
        showError('An Unkown error occured\nPlease check your internet connection');
    }
    return Promise.reject(err);
}