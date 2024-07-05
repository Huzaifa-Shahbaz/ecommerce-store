import { createSlice } from "@reduxjs/toolkit"


const initialState = {    
    users: JSON.parse(localStorage.getItem('registeredUser')) || null,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addUser: (state, action)=> {
            state.users = action.payload;
            localStorage.setItem('registeredUser', JSON.stringify(action.payload))
        },
        removeUser: (state)=> {
            state.users = null;
            localStorage.setItem('registeredUser', state.users)            
        },
    },
})


export const {addUser, removeUser } = userSlice.actions
export const usersSelector = (state) => state.users.users;


export default userSlice.reducer;