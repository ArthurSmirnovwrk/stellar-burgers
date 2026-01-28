import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

type TProfileMenuProps = {
  handleLogout?: () => void;
};

export const ProfileMenu: FC<TProfileMenuProps> = ({ handleLogout }) => {
  const { pathname } = useLocation();

  return (
    <ProfileMenuUI
      handleLogout={handleLogout || (() => {})}
      pathname={pathname}
    />
  );
};
