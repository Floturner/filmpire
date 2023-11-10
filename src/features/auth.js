import { createSlice } from '@reduxjs/toolkit';
import { SESSION_ID_KEY } from '../utils';

export const ACCOUNT_ID_KEY = 'account_id';

const initialState = {
  user: {},
  isAuthenticated: false,
  sessionId: null,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem(SESSION_ID_KEY);
      localStorage.setItem(ACCOUNT_ID_KEY, action.payload.id);
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state) => state.auth;
