import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        token: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;

        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.token = action.payload ? action.payload.token : null;
            // state.token = action.payload || action.payload.token;
            localStorage.setItem("token", state.token);
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        }
    }
})

export const { setLoading, setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;