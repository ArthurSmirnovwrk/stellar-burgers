import reducer, {
  initialState,
  setUser,
  resetUser,
  setAuthChecked,
  clearUserError,
  registerUser,
  loginUser,
  logoutUser,
  updateUser
} from './userSlice';
import { TUser } from '../../utils/types';

describe('userSlice', () => {
  const userMock: TUser = {
    email: 'test@test.ru',
    name: 'Test User'
  };

  describe('reducers', () => {
    it('setUser должен сохранить пользователя', () => {
      const state = reducer(initialState, setUser(userMock));
      expect(state.user).toEqual(userMock);
    });

    it('resetUser должен очистить пользователя', () => {
      const state = reducer(
        { ...initialState, user: userMock },
        resetUser()
      );
      expect(state.user).toBeNull();
    });

    it('setAuthChecked должен установить флаг авторизации', () => {
      const state = reducer(initialState, setAuthChecked());
      expect(state.isAuthChecked).toBe(true);
    });

    it('clearUserError должен очистить ошибку', () => {
      const state = reducer(
        { ...initialState, error: 'Ошибка' },
        clearUserError()
      );
      expect(state.error).toBeNull();
    });
  });

  describe('extraReducers', () => {
    it('registerUser.pending — loading=true', () => {
      const state = reducer(initialState, {
        type: registerUser.pending.type
      });

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('registerUser.fulfilled — сохраняет пользователя', () => {
      const state = reducer(initialState, {
        type: registerUser.fulfilled.type,
        payload: userMock
      });

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(userMock);
    });

    it('registerUser.rejected — сохраняет ошибку', () => {
      const state = reducer(initialState, {
        type: registerUser.rejected.type,
        error: { message: 'Ошибка регистрации' }
      });

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка регистрации');
    });

    it('loginUser.fulfilled — сохраняет пользователя', () => {
      const state = reducer(initialState, {
        type: loginUser.fulfilled.type,
        payload: userMock
      });

      expect(state.user).toEqual(userMock);
    });

    it('logoutUser.fulfilled — очищает пользователя', () => {
      const state = reducer(
        { ...initialState, user: userMock },
        { type: logoutUser.fulfilled.type }
      );

      expect(state.user).toBeNull();
    });

    it('updateUser.fulfilled — обновляет пользователя', () => {
      const updatedUser = { ...userMock, name: 'New Name' };

      const state = reducer(
        { ...initialState, user: userMock },
        {
          type: updateUser.fulfilled.type,
          payload: updatedUser
        }
      );

      expect(state.user).toEqual(updatedUser);
    });
  });
});