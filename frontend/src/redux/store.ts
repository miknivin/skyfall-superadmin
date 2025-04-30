import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { userApi } from "@/redux/api/userApi"; // import the API slice
import { authApi } from "./api/authApi";
import { adminApi } from "./api/adminApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware, 
      authApi.middleware,
      adminApi.middleware
    ),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
