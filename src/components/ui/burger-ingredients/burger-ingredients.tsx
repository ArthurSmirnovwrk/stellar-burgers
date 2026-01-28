import { FC } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategory } from '@components';
import { TTabMode } from '@utils-types';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = ({
  currentTab,
  buns,
  mains,
  sauces,
  titleBunRef,
  titleMainRef,
  titleSaucesRef,
  bunsRef,
  mainsRef,
  saucesRef,
  onTabClick,
  onAddIngredient
}) => {
  const handleTabClick = (value: string) => {
    onTabClick(value as TTabMode);
  };

  return (
    <section className={styles.burger_ingredients}>
      <div className={styles.tabs} style={{ display: 'flex' }}>
        <Tab value='bun' active={currentTab === 'bun'} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab
          value='sauce'
          active={currentTab === 'sauce'}
          onClick={handleTabClick}
        >
          Соусы
        </Tab>
        <Tab
          value='main'
          active={currentTab === 'main'}
          onClick={handleTabClick}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles.content}>
        <IngredientsCategory
          title='Булки'
          titleRef={titleBunRef}
          ingredients={buns}
          ref={bunsRef}
          handleAdd={onAddIngredient}
        />

        <IngredientsCategory
          title='Соусы'
          titleRef={titleSaucesRef}
          ingredients={sauces}
          ref={saucesRef}
          handleAdd={onAddIngredient}
        />

        <IngredientsCategory
          title='Начинки'
          titleRef={titleMainRef}
          ingredients={mains}
          ref={mainsRef}
          handleAdd={onAddIngredient}
        />
      </div>
    </section>
  );
};
