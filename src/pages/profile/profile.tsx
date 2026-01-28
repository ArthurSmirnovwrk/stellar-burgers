import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { updateUser, logoutUser } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((store) => store.user);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  useEffect(() => {
    const changed =
      formValue.name !== user?.name ||
      formValue.email !== user?.email ||
      !!formValue.password;
    setIsFormChanged(changed);
  }, [formValue, user]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const updatedData: { name?: string; email?: string; password?: string } =
      {};

    if (formValue.name !== user?.name) updatedData.name = formValue.name;
    if (formValue.email !== user?.email) updatedData.email = formValue.email;
    if (formValue.password) updatedData.password = formValue.password;

    if (Object.keys(updatedData).length > 0) {
      dispatch(updateUser(updatedData));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleLogout={handleLogout}
      updateUserError={error || ''}
      loading={loading}
    />
  );
};
