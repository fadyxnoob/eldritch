import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../LocalStorage/LocalStorage";
const initialState = {
    item: getLocalStorage('orderItem') || {
        proID: '',
        price: 0,
        quantity: 0,
    },
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        order: (state, action) => {
            const { id, price, quantity } = action.payload;
            if (!id || !price || !quantity) {
                console.error('Invalid payload:', action.payload);
                return;
            }
            state.item.proID = id;
            state.item.price = price;
            state.item.quantity = quantity;
            setLocalStorage('orderItem', state.item);
        },
    },
})

export const { order } = orderSlice.actions
export default orderSlice.reducer