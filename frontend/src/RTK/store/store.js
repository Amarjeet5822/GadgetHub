import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from "../features/authUserSlice";
import loggerMiddleware from '../middleware/loggerMiddleware';
import { productApi } from "../features/CreateApi/productApiSlice";
import { filterApi } from '../features/CreateApi/filterSearchApiSlice';


export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [filterApi.reducerPath]: filterApi.reducer,
    authUser: authUserReducer,
    // bag: bagReducer,
    // wishlist: wishlistReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
  .concat( loggerMiddleware ,productApi.middleware, filterApi.middleware),

});