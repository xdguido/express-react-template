import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (err) {
        const message =
            (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (err) {
        const message =
            (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

// reset password
export const resetPassword = createAsyncThunk('auth/resetPassword', async (user, thunkAPI) => {
    try {
        return await authService.resetPassword(user);
    } catch (err) {
        const message =
            (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// google login
export const loginGoogle = createAsyncThunk('auth/loginGoogle', async (code, thunkAPI) => {
    try {
        return await authService.loginGoogle(code);
    } catch (err) {
        const message =
            (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(loginGoogle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
