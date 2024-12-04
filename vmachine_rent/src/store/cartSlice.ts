import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    rent: any[];
    vmachines: any[];
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    rent: [],
    vmachines: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        fetchCartStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCartSuccess(state, action: PayloadAction<{ rent: any[]; vmachines: any[] }>) {
            state.loading = false;
            state.rent = action.payload.rent;
            state.vmachines = action.payload.vmachines;
        },
        fetchCartFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchCartStart, fetchCartSuccess, fetchCartFailure } = cartSlice.actions;

export default cartSlice.reducer;
