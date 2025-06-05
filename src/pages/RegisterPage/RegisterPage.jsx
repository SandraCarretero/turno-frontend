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
} from './RegisterPage.styles';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password');

  const onSubmit = async data => {
    setLoading(true);
    setServerErrors({});
    try {
      await registerUser(data);
      toast.success('Cuenta creada correctamente! Por favor revisa el correo');
      navigate('/');
    } catch (error) {
      console.log('Error response:', error.response?.data);
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        const formatted = {};
        error.response.data.errors.forEach(err => {
          const fieldName = err.param || err.path;
          formatted[fieldName] = err.msg;
        });
        setServerErrors(formatted);
      } else if (
        error.response?.data?.message &&
        error.response.data.message.includes('Usuario ya en uso')
      ) {
        setServerErrors({ username: 'Nombre de usuario ya en uso' });
      } else if (
        error.response?.data?.message &&
        error.response.data.message.includes('Email ya registrado')
      ) {
        setServerErrors({ email: 'Email ya registrado' });
      } else {
        toast.error(error.response?.data?.message || 'Fallo al registrarte');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Join Boardify</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Username</Label>
            <Input
              type="text"
              {...register('username', {
                required: 'Nombre de usuario es obligatorio',
                minLength: {
                  value: 3,
                  message: 'El nombre de usuario debe tener al menos 3 letras'
                },
                maxLength: {
                  value: 20,
                  message: 'El nombre de usuario debe tener menos de 20 letras'
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    'El nombre de usuario solo puede tener letras, números y símbolos'
                }
              })}
              placeholder="Introduce un nombre de usuario"
            />
            {(errors.username || serverErrors.username) && (
              <ErrorMessage>
                {errors.username?.message || serverErrors.username}
              </ErrorMessage>
            )}
          </InputGroup>

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
            {(errors.email || serverErrors.email) && (
              <ErrorMessage>
                {errors.email?.message || serverErrors.email}
              </ErrorMessage>
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
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
              placeholder="Introduce una contraseña"
            />
            {(errors.password || serverErrors.password) && (
              <ErrorMessage>
                {errors.password?.message || serverErrors.password}
              </ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>Confirma contraseña</Label>
            <Input
              type="password"
              {...register('confirmPassword', {
                required: 'Por favor confirma tu contraseña',
                validate: value =>
                  value === password || 'Las contraseñas no coinciden'
              })}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
        </Form>

        <LinkText>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </LinkText>
      </FormContainer>
    </PageContainer>
  );
};

export default RegisterPage;
