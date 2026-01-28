import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (store) => store.profileOrders
  );

  const { user, isAuthChecked } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch, user, isAuthChecked]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user) {
    return (
      <div className='text text_type_main-medium mt-10'>
        Пожалуйста, войдите в систему
      </div>
    );
  }

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-medium mt-10'>Ошибка: {error}</div>
    );
  }

  if (!orders.length) {
    return (
      <div className='text text_type_main-medium mt-10'>Заказов пока нет</div>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
