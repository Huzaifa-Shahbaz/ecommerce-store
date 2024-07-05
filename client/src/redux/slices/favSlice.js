import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    menuState: false,
    data:  JSON.parse(localStorage.getItem('savedProducts')) || [],
}


const favSlice = createSlice({
    name: 'favSlice',
    initialState,
    reducers: {
        favMenu: (state, action)=> {            
            
            localStorage.setItem('savedProducts', JSON.stringify(state.data));
            return {
                ...state,
                menuState: action.payload.menuState,
                data: action.payload.proData ? [...state.data, action.payload.proData] : state.data,
            };
        },
        removeFromList: (state, action)=> {
            state.data = state.data.filter((item)=> item.id !== action.payload)
            localStorage.setItem('savedProducts', JSON.stringify(state.data));
        },
    },
})


export const {favMenu, removeFromList} = favSlice.actions;
export const stateSelector = (state) => state.fav.menuState;
export const dataSelector = (state) => state.fav.data;

export default favSlice.reducer