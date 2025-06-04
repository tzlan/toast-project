export interface User {
  id: string;
  email: string;
  soldierId: number;
  password?: string;
  familyNameSoldier: string;
  lastName?: string; 
  firstName?: string;

  personalName: string;
  role: 'persona' | 'criminal' | 'admin';
  status?: string;
  isAdmin?: boolean;
  isStatusForced?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface CreateUserDto {
  email: string;
  soldierId: number;
  password: string;
  familyNameSoldier: string;
  personalName: string;
  role: 'persona' | 'criminal' | 'admin';
}

export interface LoginCredentials {
  soldierId: number;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: User;
}

export type UpdateUserDto = Partial<
  Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
>;
