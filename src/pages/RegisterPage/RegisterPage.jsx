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
      toast.success(
        'Account created successfully! Please check your email for verification.'
      );
      navigate('/');
    } catch (error) {
      console.log('Error response:', error.response?.data);
      // Manejar diferentes formatos de error
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        // Formato de array de errores
        const formatted = {};
        error.response.data.errors.forEach(err => {
          const fieldName = err.param || err.path;
          formatted[fieldName] = err.msg;
        });
        setServerErrors(formatted);
      } else if (
        error.response?.data?.message &&
        error.response.data.message.includes('usuario ya en uso')
      ) {
        // Error específico de nombre de usuario ya registrado
        setServerErrors({ username: 'Nombre de usuario ya en uso' });
      } else if (
        error.response?.data?.message &&
        error.response.data.message.includes('Email ya registrado')
      ) {
        // Error específico de email ya registrado
        setServerErrors({ email: 'Email ya registrado' });
      } else {
        // Otros errores generales
        toast.error(error.response?.data?.message || 'Registration failed');
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
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters'
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be less than 20 characters'
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    'Username can only contain letters, numbers, and underscores'
                }
              })}
              placeholder="Choose a username"
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
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="Enter your email"
            />
            {(errors.email || serverErrors.email) && (
              <ErrorMessage>
                {errors.email?.message || serverErrors.email}
              </ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              placeholder="Create a password"
            />
            {(errors.password || serverErrors.password) && (
              <ErrorMessage>
                {errors.password?.message || serverErrors.password}
              </ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value =>
                  value === password || 'Passwords do not match'
              })}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </Form>

        <LinkText>
          Already have an account? <Link to="/login">Sign in here</Link>
        </LinkText>
      </FormContainer>
    </PageContainer>
  );
};

export default RegisterPage;
