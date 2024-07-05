import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  admin: JSON.parse(localStorage.getItem('adminInfo')) || null,  
  adminAuthenticated: JSON.parse(localStorage.getItem('adminAuthenticated')) || false,
};

const adminAuthSlice = createSlice({
  name: 'adminAuthSlice',
  initialState,
  reducers: {
    adminLogin(state, action) {
      state.admin = action.payload;
      state.adminAuthenticated = true;
      localStorage.setItem('adminInfo', JSON.stringify(action.payload))
      localStorage.setItem('adminAuthenticated', true)
    },
    adminLogout(state) {
      state.admin = null;
      state.adminAuthenticated = false;
      localStorage.setItem('adminInfo', state.admin)
      localStorage.setItem('adminAuthenticated', false)
    },
  },
});


export const { adminLogin, adminLogout } = adminAuthSlice.actions;
export const selectIsAuthenticated = (state) => state.adminAuth.adminAuthenticated;
export const selectExistingUser = (state) => state.adminAuth.admin;


export default adminAuthSlice.reducer;
