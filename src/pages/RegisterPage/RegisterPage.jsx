'use client';

import { useState, useEffect } from 'react';
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
  Subtitle,
  Form,
  InputGroup,
  Label,
  InputWrapper,
  Input,
  InputIcon,
  PasswordStrength,
  PasswordStrengthText,
  Button,
  TermsText,
  LinkText,
  ErrorMessage,
  LogoImg
} from './RegisterPage.styles';
import {
  Mail,
  Lock,
  User,
  AlertCircle,
  Dice1Icon as Dice,
  ShieldCheck
} from 'lucide-react';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password', '');

  // Calcular la fuerza de la contraseña
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Longitud
    if (password.length >= 8) strength += 25;
    else if (password.length >= 6) strength += 10;

    // Letras mayúsculas y minúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    else if (/[a-z]/.test(password) || /[A-Z]/.test(password)) strength += 10;

    // Números
    if (/[0-9]/.test(password)) strength += 25;

    // Caracteres especiales
    if (/[^a-zA-Z0-9]/.test(password)) strength += 25;

    setPasswordStrength(strength);
  }, [password]);

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength < 30) return 'Débil';
    if (passwordStrength < 70) return 'Media';
    return 'Fuerte';
  };

  const onSubmit = async data => {
    setLoading(true);
    setServerErrors({});
    try {
      await registerUser(data);
      toast.success('¡Cuenta creada correctamente! Por favor revisa tu correo');
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
        <LogoContainer>
          <Logo>
            Turn
            <LogoImg src="https://res.cloudinary.com/djxnoeo6v/image/upload/v1749129757/favicon_fgdjdv.svg" />
          </Logo>
        </LogoContainer>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label htmlFor="username">
              <User size={16} /> Nombre de usuario
            </Label>
            <InputWrapper>
              <InputIcon>
                <User size={18} />
              </InputIcon>
              <Input
                id="username"
                type="text"
                {...register('username', {
                  required: 'Nombre de usuario es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'El nombre de usuario debe tener al menos 3 letras'
                  },
                  maxLength: {
                    value: 20,
                    message:
                      'El nombre de usuario debe tener menos de 20 letras'
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      'El nombre de usuario solo puede tener letras, números y guiones bajos'
                  }
                })}
                placeholder="Elige un nombre de usuario"
              />
            </InputWrapper>
            {(errors.username || serverErrors.username) && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {errors.username?.message || serverErrors.username}
              </ErrorMessage>
            )}
          </InputGroup>

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
            {(errors.email || serverErrors.email) && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {errors.email?.message || serverErrors.email}
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
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                })}
                placeholder="Crea una contraseña segura"
              />
            </InputWrapper>
            {password && (
              <>
                <PasswordStrength $strength={passwordStrength} />
                <PasswordStrengthText $strength={passwordStrength}>
                  {getPasswordStrengthText()}
                </PasswordStrengthText>
              </>
            )}
            {(errors.password || serverErrors.password) && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {errors.password?.message || serverErrors.password}
              </ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="confirmPassword">
              <ShieldCheck size={16} /> Confirma contraseña
            </Label>
            <InputWrapper>
              <InputIcon>
                <ShieldCheck size={18} />
              </InputIcon>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: 'Por favor confirma tu contraseña',
                  validate: value =>
                    value === password || 'Las contraseñas no coinciden'
                })}
                placeholder="Repite tu contraseña"
              />
            </InputWrapper>
            {errors.confirmPassword && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {errors.confirmPassword.message}
              </ErrorMessage>
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
