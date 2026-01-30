import reducer, {
  initialState,
  fetchProfileOrders
} from './profileOrdersSlice';
import { TOrder } from '../../utils/types';

describe('profileOrdersSlice', () => {
  const ordersMock: TOrder[] = [
    {
      _id: 'order-1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Мой заказ',
      number: 123,
      createdAt: '',
      updatedAt: ''
    }
  ];

  it('должен установить loading=true при начале запроса', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранить заказы при успешной загрузке', () => {
    const action = {
      type: fetchProfileOrders.fulfilled.type,
      payload: ordersMock
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(ordersMock);
  });

  it('должен сохранить ошибку при ошибке загрузки', () => {
    const action = {
      type: fetchProfileOrders.rejected.type,
      error: { message: 'Ошибка авторизации' }
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка авторизации');
  });
});