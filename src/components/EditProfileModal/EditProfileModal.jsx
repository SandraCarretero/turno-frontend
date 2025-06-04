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
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      await userAPI.deleteUser(); // Aquí tu llamada API para eliminar usuario
      toast.success('Account deleted successfully');
      logout(); // Cerrar sesión después de eliminar cuenta
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete account');
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
      toast.success('Profile updated successfully!');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Edit Profile</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
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
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </InputGroup>

            <ModalFooter>
              <Button type="button" variant="danger" onClick={handleDeleteAccount} disabled={loading}>
                Delete Account
              </Button>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditProfileModal;
