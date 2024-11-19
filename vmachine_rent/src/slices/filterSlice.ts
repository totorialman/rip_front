import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    maxPrice: number;
}

const initialState: FilterState = {
    maxPrice: 100000,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setMaxPrice(state, action: PayloadAction<number>) {
            state.maxPrice = action.payload;
        },
    },
});

export const { setMaxPrice } = filterSlice.actions;

export default filterSlice.reducer;
