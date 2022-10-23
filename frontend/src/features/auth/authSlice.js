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
        const message = err.response.data.name;
        return thunkAPI.rejectWithValue(message);
    }
});

// login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (err) {
        const message = err.response.data.name;
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
        const message = err.response.data.name;
        return thunkAPI.rejectWithValue(message);
    }
});

// google login
export const loginGoogle = createAsyncThunk('auth/loginGoogle', async (code, thunkAPI) => {
    try {
        return await authService.loginGoogle(code);
    } catch (err) {
        const message = err.response.data.name;
        return thunkAPI.rejectWithValue(message);
    }
});

// facebook login
export const loginFacebook = createAsyncThunk('auth/loginFacebook', async (code, thunkAPI) => {
    try {
        return await authService.loginFacebook(code);
    } catch (err) {
        const message = err.response.data.name;
        return thunkAPI.rejectWithValue(message);
    }
});

// github login
export const loginGithub = createAsyncThunk('auth/loginGithub', async (code, thunkAPI) => {
    try {
        return await authService.loginGithub(code);
    } catch (err) {
        const message = err.response.data.name;
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
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/pending');
                },
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/fulfilled');
                },
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.user = action.payload && action.payload.token ? action.payload : null;
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/rejected');
                },
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    state.user = null;
                }
            );
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
