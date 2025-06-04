import { ToastStatus } from '../lib/toasts-status.enum';

export interface Toast {
  id: string;
  userId: string;
  description: string;
  date: string;
  toastStatus: ToastStatus;
  place: string;
}

export interface CreateToastDto {
  userId: string;
  description: string;
  date: Date;
  toastStatus: ToastStatus;
  place: string;
}
