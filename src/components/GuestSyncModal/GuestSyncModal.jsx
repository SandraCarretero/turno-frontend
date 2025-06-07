import { useState, useEffect } from 'react';
import { X, Search, UserCheck } from 'lucide-react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  SearchContainer,
  SearchInput,
  UserList,
  UserItem,
  UserInfo,
  UserName,
  UserEmail,
  EmptyState,
  ModalFooter,
  Button,
  LoadingSpinner,
  SyncSuccess
} from './GuestSyncModal.styles';
import UserAvatar from '../UserAvatar/UserAvatar';
import { AvatarPlaceholder } from '../UserAvatar/UserAvatar.styles';
import { userAPI, guestAPI } from '../../services/api';
import toast from 'react-hot-toast';

const GuestSyncModal = ({
  isOpen,
  onClose,
  guestId,
  guestData,
  onSyncComplete
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [guest, setGuest] = useState(null);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch guest data if guestId is provided
  useEffect(() => {
    if (isOpen && guestId) {
      const fetchGuest = async () => {
        try {
          setLoading(true);
          const guestData = await guestAPI.getGuest(guestId);
          setGuest(guestData);
        } catch (error) {
          console.error('Error fetching guest:', error);
          toast.error('Error al cargar datos del invitado');
        } finally {
          setLoading(false);
        }
      };

      fetchGuest();
    } else if (isOpen && guestData) {
      // Use provided guest data for new guests
      setGuest(guestData);
    }
  }, [isOpen, guestId, guestData]);

  // Search users
  useEffect(() => {
    if (searchQuery.length < 2) {
      setUsers([]);
      return;
    }

    const searchUsers = async () => {
      try {
        setSearching(true);
        const response = await userAPI.searchUsers(searchQuery);
        setUsers(response?.data || []);
      } catch (error) {
        console.error('Error searching users:', error);
        toast.error('Error al buscar usuarios');
      } finally {
        setSearching(false);
      }
    };

    const timer = setTimeout(searchUsers, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSyncUser = async user => {
    if (!guest || !user) return;

    try {
      setLoading(true);
      setSelectedUser(user);

      let syncedGuestId = null;

      if (guestId) {
        // Sync existing guest
        const response = await guestAPI.syncGuest(guestId, user._id);
        syncedGuestId = guestId;
        console.log('Existing guest synced:', response);
      } else {
        // Create new guest and sync
        const newGuest = await guestAPI.createGuest({
          name: guest.name,
          avatar: guest.avatar,
          syncedWith: user._id
        });
        syncedGuestId = newGuest._id || newGuest.id;
        console.log('New guest created and synced:', newGuest);
      }

      setSyncSuccess(true);
      toast.success(`¡${guest.name} sincronizado con ${user.username}!`);

      // Notify parent component that sync is complete with the user data and guest ID
      if (onSyncComplete) {
        onSyncComplete({
          user: user,
          guestId: syncedGuestId
        });
      }
    } catch (error) {
      console.error('Error syncing guest:', error);
      toast.error('Error al sincronizar invitado');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    setUsers([]);
    setSyncSuccess(false);
    setSelectedUser(null);
    setGuest(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Sincronizar Invitado</ModalTitle>
          <CloseButton onClick={handleClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {loading && !syncSuccess ? (
            <LoadingSpinner>
              <div className="spinner"></div>
              <p>Cargando...</p>
            </LoadingSpinner>
          ) : syncSuccess ? (
            <SyncSuccess>
              <UserCheck size={48} />
              <h3>¡Sincronización Exitosa!</h3>
              <p>
                {guest?.name} ha sido sincronizado con {selectedUser?.username}.
                Ahora las estadísticas y partidas se compartirán entre ambos
                perfiles.
              </p>
            </SyncSuccess>
          ) : (
            <>
              {guest && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                    Invitado a sincronizar:
                  </h3>
                  <UserItem $noHover>
                    {guest.avatar ? (
                      <UserAvatar
                        user={{ avatar: guest.avatar, username: guest.name }}
                      />
                    ) : (
                      <AvatarPlaceholder $size="medium">
                        {guest.name?.charAt(0).toUpperCase() || '?'}
                      </AvatarPlaceholder>
                    )}
                    <UserInfo>
                      <UserName>{guest.name}</UserName>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.85rem',
                          color: '#6c757d'
                        }}
                      >
                        {guestId
                          ? `${guest.gamesPlayed || 0} partidas jugadas`
                          : 'Nuevo invitado'}
                      </p>
                    </UserInfo>
                  </UserItem>
                </div>
              )}

              <p
                style={{
                  margin: '0 0 1rem 0',
                  fontSize: '0.9rem',
                  color: '#6c757d'
                }}
              >
                Busca un usuario registrado para sincronizar con este invitado.
                Las estadísticas y partidas se compartirán entre ambos perfiles.
              </p>

              <SearchContainer>
                <Search size={16} />
                <SearchInput
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </SearchContainer>

              {searching && (
                <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                  Buscando usuarios...
                </p>
              )}

              {users.length > 0 ? (
                <UserList>
                  {users.map(user => (
                    <UserItem
                      key={user._id}
                      onClick={() => handleSyncUser(user)}
                    >
                      <UserAvatar user={user} />
                      <UserInfo>
                        <UserName>{user.username}</UserName>
                        {user.email && <UserEmail>{user.email}</UserEmail>}
                      </UserInfo>
                    </UserItem>
                  ))}
                </UserList>
              ) : searchQuery.length >= 2 && !searching ? (
                <EmptyState>
                  <Search size={48} />
                  <h3>No se encontraron usuarios</h3>
                  <p>No hay usuarios que coincidan con "{searchQuery}"</p>
                </EmptyState>
              ) : searchQuery.length < 2 ? (
                <EmptyState>
                  <Search size={48} />
                  <h3>Busca un usuario</h3>
                  <p>Escribe al menos 2 caracteres para buscar usuarios</p>
                </EmptyState>
              ) : null}
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button type="button" $variant="secondary" onClick={handleClose}>
            {syncSuccess ? 'Cerrar' : 'Cancelar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default GuestSyncModal;
