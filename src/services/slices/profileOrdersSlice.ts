import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TProfileOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  wsConnected: boolean;
};

export const initialState: TProfileOrdersState = {
  orders: [],
  loading: false,
  error: null,
  wsConnected: false
};

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetchProfileOrders',
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    wsProfileConnectionSuccess: (state) => {
      state.wsConnected = true;
    },
    wsProfileConnectionError: (state) => {
      state.wsConnected = false;
    },
    wsProfileConnectionClosed: (state) => {
      state.wsConnected = false;
    },
    wsProfileGetMessage: (state, action) => {
      state.orders = action.payload.orders;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заказов';
      });
  }
});

export const {
  wsProfileConnectionSuccess,
  wsProfileConnectionError,
  wsProfileConnectionClosed,
  wsProfileGetMessage
} = profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;
