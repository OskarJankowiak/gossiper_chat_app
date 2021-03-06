import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signUp, logIn } from 'features/auth/authSlice';
import { UserData } from 'features/auth/types';
import { Color, ProcessStatus } from 'utils/types/enums';
import Brand from 'components/atoms/Brand/Brand';
import LoaderComponent from 'components/molecules/LoaderComponent/LoaderComponent';
import Button from 'components/atoms/Button/ButtonStyles';
import InputField from 'components/molecules/InputField/InputField';
import { Wrapper, Form, StyledInputField, StyledButton, LoaderWrapper } from './AuthFormStyles';

const registerSchema = yup.object().shape({
  email: yup.string().email('Your email is not correct').required('Email is required'),
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('Your email is not correct').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const AuthForm = () => {
  const [isRegistered, setRegister] = useState(true);
  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(isRegistered ? loginSchema : registerSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authProcess } = useAppSelector(state => state.auth);
  const isAuthenticate = authProcess === ProcessStatus.Started;

  const switchFormType = (): void => setRegister(prevState => !prevState);

  const onSubmit = async ({ login, ...rest }: UserData): Promise<void> => {
    if (isRegistered) {
      const resultLogIn = await dispatch(logIn({ ...rest }));
      logIn.fulfilled.match(resultLogIn) && navigate(Routes.Home);
    } else {
      const resultSignUp = await dispatch(signUp({ login, ...rest }));
      signUp.fulfilled.match(resultSignUp) && switchFormType();
    }
    reset();
  };

  useEffect(() => {
    reset();
  }, [isRegistered, reset]);

  return (
    <Wrapper isAuthenticate={isAuthenticate}>
      <Brand />
      <Form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)}>
        {isRegistered ? (
          <>
            <InputField name='email' label='Email' type='email' ref={register} error={errors.email?.message} />
            <StyledInputField name='password' label='Password' type='password' ref={register} error={errors.password?.message} />
          </>
        ) : (
          <>
            <InputField name='email' label='Email' type='email' ref={register} error={errors.email?.message} />
            <StyledInputField name='login' label='Login' type='text' ref={register} error={errors.login?.message} />
            <StyledInputField name='password' label='Password' type='password' ref={register} error={errors.password?.message} />
          </>
        )}
        <StyledButton role='submit' disabled={isAuthenticate}>
          {isRegistered ? 'Log In' : 'Create account'}
        </StyledButton>
      </Form>
      <Button role='button' onClick={switchFormType} underline disabled={isAuthenticate}>
        {isRegistered ? 'Create new account' : 'I want sign in'}
      </Button>
      {isAuthenticate && (
        <LoaderWrapper>
          <LoaderComponent loaderColor={Color.LightBlue} />{' '}
        </LoaderWrapper>
      )}
    </Wrapper>
  );
};

export default AuthForm;
