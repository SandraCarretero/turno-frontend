'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {
  PageContainer,
  FormContainer,
  LogoContainer,
  Logo,
  Title,
  Form,
  InputGroup,
  Label,
  InputWrapper,
  Input,
  InputIcon,
  Button,
  LinkText,
  ErrorMessage,
  LogoImg
} from './LoginPage.styles';
import {
  Mail,
  Lock,
  AlertCircle,
  Dice1Icon as Dice,
  Github,
  ChromeIcon as Google
} from 'lucide-react';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    setLoading(true);
    try {
      await login(data);
      toast.success('¡Bienvenido de nuevo!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Fallo al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <LogoContainer>
          <Logo>
            Turn
            <LogoImg src="https://res.cloudinary.com/djxnoeo6v/image/upload/v1749129757/favicon_fgdjdv.svg" />
          </Logo>
        </LogoContainer>

        <Title>¡Bienvenido de nuevo!</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label htmlFor="email">
              <Mail size={16} /> Email
            </Label>
            <InputWrapper>
              <InputIcon>
                <Mail size={18} />
              </InputIcon>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email inválido'
                  }
                })}
                placeholder="tu@email.com"
              />
            </InputWrapper>
            {errors.email && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {errors.email.message}
              </ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">
              <Lock size={16} /> Contraseña
            </Label>
            <InputWrapper>
              <InputIcon>
                <Lock size={18} />
              </InputIcon>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 6,
                    message: 'Contraseña inválida'
                  }
                })}
                placeholder="••••••••"
              />
            </InputWrapper>
            {errors.password && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {errors.password.message}
              </ErrorMessage>
            )}
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </Form>

        <LinkText>
          ¿No tienes cuenta aún? <Link to="/register">Regístrate aquí</Link>
        </LinkText>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginPage;
