import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const persist = JSON.parse(localStorage.getItem('persist'));

const initialState = {
    user: null,
    persist,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// register user
export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (err) {
        const message = err.response.data.name;
        return thunkAPI.rejectWithValue(message);
    }
});

// login user
export const loginUser = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (err) {
        const message = err.response.data.name;
        return thunkAPI.rejectWithValue(message);
    }
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
        setUser: (state, action) => {
            state.user = action.payload;
        },
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('persist');
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
                    state.user = action.payload?.accessToken ? action.payload : null;
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

export const { reset, setUser, setPersist, logout } = authSlice.actions;
export default authSlice.reducer;
