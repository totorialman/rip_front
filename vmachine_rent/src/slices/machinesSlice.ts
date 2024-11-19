import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VMData } from '../services/api';

interface MachinesState {
    list: VMData[];
}

const initialState: MachinesState = {
    list: [],
};

const machinesSlice = createSlice({
    name: 'machines',
    initialState,
    reducers: {
        setMachines(state, action: PayloadAction<VMData[]>) {
            state.list = action.payload;
        },
    },
});

export const { setMachines } = machinesSlice.actions;

export default machinesSlice.reducer;
