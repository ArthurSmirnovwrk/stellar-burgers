import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count, handleAdd }) => {
    const location = useLocation();

    const onAddClick = () => {
      console.log('BurgerIngredient: добавляем', ingredient.name);
      handleAdd(ingredient);
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={onAddClick}
      />
    );
  }
);
