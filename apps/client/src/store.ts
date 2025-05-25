// client/src/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { toastsApi } from './store/api/toasts.api';  
import { usersApi } from './store/api/users.api';    

export const store = configureStore({
  reducer: {
    
    [toastsApi.reducerPath]: toastsApi.reducer,  
    [usersApi.reducerPath]: usersApi.reducer,   
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
       
      .concat(toastsApi.middleware)  
      .concat(usersApi.middleware),    
});


setupListeners(store.dispatch);

 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;