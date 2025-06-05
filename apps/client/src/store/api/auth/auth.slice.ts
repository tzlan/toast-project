import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
  id: string;
  soldierId: number;
  lastName?: string;
  firstName?: string;
  status?: string;
  isAdmin?: boolean;
}

type AuthState = {
  user: UserData | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
