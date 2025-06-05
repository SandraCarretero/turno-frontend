import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api';
import toast from 'react-hot-toast';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  Form,
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  ModalFooter,
  Button
} from './EditProfileModal.styles';

const EditProfileModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser, logout } = useAuth();

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      '¿Estás sseguro de que quieres eliminar la cuenta? Esta acción no se puede deshacer.'
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      await userAPI.deleteUser();
      toast.success('Cuenta eliminada con éxito');
      logout();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Error al eliminar la cuenta'
      );
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || ''
    }
  });

  const onSubmit = async data => {
    setLoading(true);
    try {
      const response = await userAPI.updateProfile(data);
      updateUser(response.data);
      toast.success('Perfil actualizado con éxito');
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Error al actualizar perfil'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Editar perfil</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
              <Label>Usuario</Label>
              <Input
                type="text"
                {...register('username', {
                  required: 'El usuario es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'El usuario debe tener al menos 3 caracteres'
                  },
                  maxLength: {
                    value: 20,
                    message: 'El usuario no puede tener más de 20 caracteres'
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      'El nombre de usuario solo puede contener letras, números y símbolos'
                  }
                })}
              />
              {errors.username && (
                <ErrorMessage>{errors.username.message}</ErrorMessage>
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
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </InputGroup>

            <ModalFooter>
              <Button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                Eliminar
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditProfileModal;
