import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './../../types/user-i-t';


interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};


export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Export reducer and actions
export default userSlice.reducer;
export const { setIsAuthenticated, setUser, setLoading } = userSlice.actions;