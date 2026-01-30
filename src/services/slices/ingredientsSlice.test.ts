import reducer, {
  initialState,
  fetchIngredients
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const ingredientsMock: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 200,
      price: 50,
      image: '',
      image_mobile: '',
      image_large: ''
    }
  ];

  it('должен установить loading=true при начале запроса', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранить ингредиенты и выключить loading при успешном запросе', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredientsMock
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(ingredientsMock);
  });

  it('должен сохранить ошибку и выключить loading при ошибке запроса', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка сети' }
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка сети');
  });
});