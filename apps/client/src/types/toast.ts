export interface Toast {
  id: string;
  userId: string;
  description: string;
  date: string; 
  toastStatus: 'CANCELED' | 'DELAYED' | 'ON TIME';
  place: string;
}

export interface CreateToastDto {
  userId: string;
  description: string;
  date: Date;
  toastStatus: 'CANCELED' | 'DELAYED' | 'ON TIME';
  place: string;
}
