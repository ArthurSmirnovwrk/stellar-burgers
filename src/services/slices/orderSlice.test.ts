import reducer, {
  initialState,
  createOrder,
  clearOrder
} from './orderSlice';
import { TOrder } from '../../utils/types';

describe('orderSlice', () => {
  const orderMock: TOrder = {
    _id: 'order-id',
    ingredients: ['1', '2'],
    status: 'done',
    name: 'Тестовый заказ',
    number: 12345,
    createdAt: '',
    updatedAt: ''
  };

  it('должен установить loading=true при начале создания заказа', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранить заказ и номер при успешном создании', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: orderMock
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.order).toEqual(orderMock);
    expect(state.orderNumber).toBe(12345);
  });

  it('должен сохранить ошибку при ошибке создания заказа', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Ошибка создания заказа'
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });

  it('должен очистить заказ', () => {
    const filledState = {
      ...initialState,
      order: orderMock,
      orderNumber: 12345,
      loading: true,
      error: 'Ошибка'
    };

    const state = reducer(filledState, clearOrder());

    expect(state).toEqual(initialState);
  });
});