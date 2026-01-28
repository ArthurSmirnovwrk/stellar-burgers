import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TOrderState = {
  order: TOrder | null;
  orderNumber: number | null;
  loading: boolean;
  error: string | null;
};

export const initialState: TOrderState = {
  order: null,
  orderNumber: null,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds: string[], { rejectWithValue }) => {
    const bunCount = ingredientIds.filter(
      (id, index, arr) => arr.indexOf(id) !== index
    ).length;

    if (bunCount === 0) {
      console.error('ОШИБКА: В заказе нет булочки!');
      return rejectWithValue('Добавьте булочку для оформления заказа');
    }

    if (ingredientIds.length === 0) {
      console.error('ОШИБКА: Пустой заказ!');
      return rejectWithValue('Добавьте ингредиенты для оформления заказа');
    }

    try {
      const response = await orderBurgerApi(ingredientIds);
      return response.order;
    } catch (error: any) {
      console.error('Ошибка при создании заказа:', error);
      return rejectWithValue(error.message || 'Ошибка создания заказа');
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(orderNumber);
      return data.orders[0];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Не удалось получить заказ');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.orderNumber = null;
      state.loading = false;
      state.error = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
    resetOrderLoading: (state) => {
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.orderNumber = action.payload?.number || null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Ошибка создания заказа';
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.orderNumber = action.payload?.number || null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Ошибка загрузки данных заказа';
      });
  }
});

export const { clearOrder, clearOrderError, resetOrderLoading } =
  orderSlice.actions;
export default orderSlice.reducer;
