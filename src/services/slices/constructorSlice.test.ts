import reducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState
} from './constructorSlice';
import { TIngredient } from '../../utils/types';

jest.mock('uuid', () => ({
  v4: () => 'test-id'
}));

describe('constructorSlice', () => {
  const bun: TIngredient = {
    _id: 'bun-id',
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
  };

  const ingredient: TIngredient = {
    _id: 'ingredient-id',
    name: 'Начинка',
    type: 'main',
    proteins: 5,
    fat: 3,
    carbohydrates: 8,
    calories: 100,
    price: 30,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('должен вернуть начальное состояние', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('должен добавить булку', () => {
    const state = reducer(initialState, addBun(bun));
    expect(state.bun).toEqual(bun);
  });

  it('должен добавить ингредиент в список', () => {
    const state = reducer(initialState, addIngredient(ingredient));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...ingredient,
      id: 'test-id'
    });
  });

  it('должен удалить ингредиент по id', () => {
    const stateWithIngredient = reducer(
      initialState,
      addIngredient(ingredient)
    );

    const state = reducer(
      stateWithIngredient,
      removeIngredient('test-id')
    );

    expect(state.ingredients).toEqual([]);
  });

  it('должен изменить порядок ингредиентов', () => {
    const secondIngredient = { ...ingredient, _id: 'second-id' };

    let state = reducer(initialState, addIngredient(ingredient));
    state = reducer(state, addIngredient(secondIngredient));
    state = reducer(
      state,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients.map((i) => i._id)).toEqual([
      'second-id',
      'ingredient-id'
    ]);
  });

  it('должен очистить конструктор', () => {
    let state = reducer(initialState, addBun(bun));
    state = reducer(state, addIngredient(ingredient));

    const clearedState = reducer(state, clearConstructor());
    expect(clearedState).toEqual(initialState);
  });
});