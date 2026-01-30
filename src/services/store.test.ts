import { rootReducer } from './store';
import { initialState as ingredientsInitial } from './slices/ingredientsSlice';
import { initialState as orderInitial } from './slices/orderSlice';
import { initialState as userInitial } from './slices/userSlice';
import { initialState as profileOrdersInitial } from './slices/profileOrdersSlice';
import { initialState as feedInitial } from './slices/feedSlice';
import { initialState as constructorInitial } from './slices/constructorSlice';

describe('rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: ingredientsInitial,
      order: orderInitial,
      user: userInitial,
      feed: feedInitial,
      profileOrders: profileOrdersInitial,
      burgerConstructor: constructorInitial
    });
  });
});