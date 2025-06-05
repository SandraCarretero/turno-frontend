import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {
  PageContainer,
  FormContainer,
  Title,
  Form,
  InputGroup,
  Label,
  Input,
  Button,
  LinkText,
  ErrorMessage
} from './LoginPage.styles';

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
      toast.success('Bienvenido!');
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
        <Title>Bienvenido de nuevo</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email inválido'
                }
              })}
              placeholder="Introduce tu email"
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>Contraseña</Label>
            <Input
              type="password"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'Contraseña inválida'
                }
              })}
              placeholder="Introduce tu contraseña"
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Iniciar sesión'}
          </Button>
        </Form>

        <LinkText>
          {'¿No tienes cuenta aún? '}
          <Link to="/register">Regístrate aquí</Link>
        </LinkText>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginPage;
