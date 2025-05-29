export interface Toast {
    id: string;
    userId: string;
    description: string;
    date: string;
    toastStatus: 'CANCELED' | 'DELAYED' | 'ON TIME';
  }
  
  export interface CreateToastDto {
    userId: string;
    description: string;
    date: string;
    toastStatus: 'CANCELED' | 'DELAYED' | 'ON TIME';
  }