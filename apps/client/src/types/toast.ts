export interface Toast {
  id: string;
  userId: string;
  description: string;
  date: string; // La date peut être une chaîne (ISO string) quand reçue du backend si elle est sérialisée
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
