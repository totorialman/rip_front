import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

interface UserState {
    isLoggedIn: boolean;
    username: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    isLoggedIn: false,
    username: null,
    loading: false,
    error: null,
};

// Асинхронный экшен для авторизации
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.login.loginCreate(credentials, { credentials: "include" });
            if (response.status === 200) {
                return credentials.username;
            } else {
                throw new Error("Ошибка авторизации");
            }
        } catch (error: any) {
            return rejectWithValue(error.message || "Ошибка при выполнении запроса");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            state.isLoggedIn = false;
            state.username = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoggedIn = true;
                state.username = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
