export { default as store } from './store';
export { useDispatch, useSelector } from './store';
export type { RootState, AppDispatch } from './store';

export { default as ingredientsReducer } from './slices/ingredientsSlice';
export { default as orderReducer } from './slices/orderSlice';
export { default as userReducer } from './slices/userSlice';
export { default as feedReducer } from './slices/feedSlice';
export { default as profileOrdersReducer } from './slices/profileOrdersSlice';

export { fetchIngredients } from './slices/ingredientsSlice';
export { createOrder, clearOrder } from './slices/orderSlice';
export {
  checkUserAuth,
  loginUser,
  logoutUser,
  updateUser
} from './slices/userSlice';
export { fetchFeeds } from './slices/feedSlice';
export { fetchProfileOrders } from './slices/profileOrdersSlice';
