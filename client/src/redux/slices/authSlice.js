import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  user: JSON.parse(localStorage.getItem('userInfo')) || null,  
  userAuthenticated: JSON.parse(localStorage.getItem('userAuthenticated')) || false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.userAuthenticated = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
      localStorage.setItem('userAuthenticated', true)
    },
    logout(state) {
      state.user = null;
      state.userAuthenticated = false;
      localStorage.setItem('userInfo', state.user)
      localStorage.setItem('userAuthenticated', false)
    },
  },
});


export const { login, logout } = authSlice.actions;
export const selectUserAuthenticated = (state) => state.auth.userAuthenticated;
export const selectExistingUser = (state) => state.auth.user;

export default authSlice.reducer;
