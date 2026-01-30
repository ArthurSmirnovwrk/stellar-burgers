import reducer, {
  initialState,
  fetchFeeds
} from './feedSlice';
import { TOrder } from '../../utils/types';

describe('feedSlice', () => {
  const ordersMock: TOrder[] = [
    {
      _id: 'order-1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Заказ 1',
      number: 101,
      createdAt: '',
      updatedAt: ''
    }
  ];

  it('должен установить loading=true при начале запроса', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранить данные при успешной загрузке', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: ordersMock,
        total: 50,
        totalToday: 5
      }
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(ordersMock);
    expect(state.total).toBe(50);
    expect(state.totalToday).toBe(5);
  });

  it('должен сохранить ошибку при ошибке загрузки', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка сети' }
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка сети');
  });
});