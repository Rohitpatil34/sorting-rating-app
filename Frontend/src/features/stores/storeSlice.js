import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api.js';

const initialState = {
  stores: [],
  dashboardData: null,
  pagination: { currentPage: 1, totalPages: 1, totalItems: 0 },
  isLoading: false,
  isError: false,
  message: '',
};


export const fetchStores = createAsyncThunk(
  'stores/fetchAll',
  async (filters = {}, thunkAPI) => {
    try {
      const response = await api.get('/stores', { params: filters }); 
      return response; 
      
    
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchOwnerDashboard = createAsyncThunk(
  'stores/fetchOwnerDashboard',
  async (params = {}, thunkAPI) => {
    try {
      const response = await api.get('/stores/owner/dashboard', { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const rateStore = createAsyncThunk(
  'stores/rate',
  async ({ storeId, value, filters }, thunkAPI) => {
    try {
      await api.post(`/stores/${storeId}/rate`, { value });
     
      thunkAPI.dispatch(fetchStores(filters || {}));
      return { storeId, value };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchStores.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.stores = action.payload.data || [];
        state.pagination = action.payload.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
        };
        state.message = '';
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Failed to fetch stores';
        state.stores = [];
      })

  
      .addCase(fetchOwnerDashboard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(fetchOwnerDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.dashboardData = action.payload;
        state.message = '';
      })
      .addCase(fetchOwnerDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

    
      .addCase(rateStore.pending, (state) => {
        state.isError = false;
        state.message = '';
      })
      .addCase(rateStore.fulfilled, (state) => {
        state.isError = false;
        state.message = '';
      })
      .addCase(rateStore.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default storeSlice.reducer;
