import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { fetchOrderByNumber } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const { orders: feedOrders } = useSelector((store) => store.feed);
  const { orders: profileOrders } = useSelector((store) => store.profileOrders);
  const allIngredients = useSelector((store) => store.ingredients.items);
  const { order: singleOrder, loading } = useSelector((store) => store.order);

  const orderNumber = number ? parseInt(number) : 0;

  const orderDataFromLists = useMemo(() => {
    const allOrders = [...feedOrders, ...profileOrders];
    return allOrders.find((order) => order.number === orderNumber) || null;
  }, [feedOrders, profileOrders, orderNumber]);

  useEffect(() => {
    if (!orderDataFromLists && orderNumber && !singleOrder) {
      dispatch(fetchOrderByNumber(orderNumber));
    }
  }, [dispatch, orderDataFromLists, orderNumber, singleOrder]);

  const orderData: TOrder | null = orderDataFromLists || singleOrder || null;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !allIngredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = allIngredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, allIngredients]);

  if (loading && !orderInfo) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return <p className='text text_type_main-medium mt-10'>Заказ не найден</p>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
