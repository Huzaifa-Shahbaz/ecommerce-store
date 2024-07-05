import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartData: JSON.parse(localStorage.getItem('cartItems')) || [],
    prodQuantity: 1,
}


const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart: (state, action)=> {
            state.cartData.push(action.payload.proData);
            localStorage.setItem('cartItems', JSON.stringify(state.cartData));
        },
        removeFromCart: (state, action)=> {
            state.cartData = state.cartData.filter((item)=> item.id !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartData));
        },
        removeAll: (state)=> {
            state.cartData = [];
            let cartItems = JSON.parse(localStorage.getItem('cartItems'));
            cartItems = []
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
        },
        updateProdQuantity: (state, action)=> {
            state.prodQuantity = action.payload;
        },
    },
})

export const {addToCart, removeFromCart, removeAll, updateProdQuantity } = cartSlice.actions;
export const cartItemsSelector = (state)=> state.cart.cartData;
export const prodQuantitySelector = (state)=> state.cart.prodQuantity;

export default cartSlice.reducer