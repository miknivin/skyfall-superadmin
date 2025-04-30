import { combineReducers } from "redux";

import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";
import { userSlice } from "./features/authSlice";
import { adminApi } from "./api/adminApi";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
