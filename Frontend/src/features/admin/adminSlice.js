import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api.js';

const initialState = {
  stats: { users: 0, stores: 0, ratings: 0 },
  users: [],
  stores: [],
  pagination: { currentPage: 1, totalPages: 1, totalItems: 0 },
  isLoading: false,
  isError: false,
  message: '',
};



export const getDashboardStats = createAsyncThunk('admin/getStats', async (_, thunkAPI) => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchAllUsers = createAsyncThunk('admin/fetchAllUsers', async (params = {}, thunkAPI) => {
  try {
    const response = await api.get('/admin/users', { params });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchAllStores = createAsyncThunk('admin/fetchAllStores', async (params = {}, thunkAPI) => {
  try {
    const response = await api.get('/admin/stores', { params });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const addNewUser = createAsyncThunk('admin/addUser', async (userData, thunkAPI) => {
    try {
        const response = await api.post('/admin/users', userData);
        thunkAPI.dispatch(fetchAllUsers()); 
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const addNewStore = createAsyncThunk('admin/addStore', async (storeData, thunkAPI) => {
    try {
        const response = await api.post('/admin/stores', storeData);
       
        thunkAPI.dispatch(fetchAllStores());
        thunkAPI.dispatch(fetchAllUsers());
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});


export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Stats Cases
      .addCase(getDashboardStats.pending, (state) => { state.isLoading = true; })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Fetch Users Cases
      .addCase(fetchAllUsers.pending, (state) => { state.isLoading = true; })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Fetch Stores Cases
      .addCase(fetchAllStores.pending, (state) => { state.isLoading = true; })
      .addCase(fetchAllStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stores = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllStores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add User Cases
      .addCase(addNewUser.pending, (state) => { state.isLoading = true; })
      .addCase(addNewUser.fulfilled, (state) => {
        state.isLoading = false;
        state.message = 'User added successfully!';
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add Store Cases
      .addCase(addNewStore.pending, (state) => { state.isLoading = true; })
      .addCase(addNewStore.fulfilled, (state) => {
        state.isLoading = false;
        state.message = 'Store and owner created successfully!';
      })
      .addCase(addNewStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default adminSlice.reducer;