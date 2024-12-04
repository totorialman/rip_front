import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("userState");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch {
        return undefined;
    }
};

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state.user);
        localStorage.setItem("userState", serializedState);
    } catch {
    }
};

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer, 
    },
    preloadedState: { user: loadState() },
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
