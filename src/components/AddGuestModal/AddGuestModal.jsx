import { useState } from 'react';
import { X, UserPlus, Users, Search } from 'lucide-react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  TabContainer,
  Tab,
  TabContent,
  InputGroup,
  Label,
  Input,
  ModalFooter,
  Button,
  GuestList,
  GuestItem,
  GuestInfo,
  GuestName,
  EmptyState,
  SearchContainer,
  SearchInput,
  LoadingSpinner
} from './AddGuestModal.styles';
import UserAvatar from '../UserAvatar/UserAvatar';

const AddGuestModal = ({
  isOpen,
  onClose,
  onAddGuest,
  onGuestSelect,
  existingGuests = [],
  selectedGuests = [],
  isLoading = false
}) => {
  const [activeTab, setActiveTab] = useState('existing'); // "existing" o "new"
  const [guestName, setGuestName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (guestName.trim()) {
      onAddGuest(guestName.trim());
      setGuestName('');
    }
  };

  const handleClose = () => {
    setGuestName('');
    setSearchQuery('');
    setActiveTab('existing');
    onClose();
  };

  const handleGuestClick = guest => {
    onGuestSelect(guest);
    setSearchQuery('');
  };

  // Filtrar invitados basados en la búsqueda y excluir los ya seleccionados
  const filteredGuests = existingGuests.filter(guest => {
    const matchesSearch = guest.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const notSelected = !selectedGuests.some(
      selected => selected.guest === guest._id
    );
    return matchesSearch && notSelected;
  });

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Añadir Invitado</ModalTitle>
          <CloseButton onClick={handleClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <TabContainer>
            <Tab
              $active={activeTab === 'existing'}
              onClick={() => setActiveTab('existing')}
            >
              <Users size={16} />
              Invitados Existentes
            </Tab>
            <Tab
              $active={activeTab === 'new'}
              onClick={() => setActiveTab('new')}
            >
              <UserPlus size={16} />
              Nuevo Invitado
            </Tab>
          </TabContainer>

          <TabContent>
            {isLoading ? (
              <LoadingSpinner>
                <div className="spinner"></div>
                <p>Cargando...</p>
              </LoadingSpinner>
            ) : activeTab === 'existing' ? (
              <>
                <SearchContainer>
                  <Search size={16} />
                  <SearchInput
                    type="text"
                    placeholder="Buscar invitados..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </SearchContainer>

                {filteredGuests.length > 0 ? (
                  <GuestList>
                    {filteredGuests.map(guest => (
                      <GuestItem
                        key={guest._id}
                        onClick={() => handleGuestClick(guest)}
                      >
                        <UserAvatar
                          user={{ avatar: guest.avatar, username: guest.name }}
                          size="small"
                        />
                        <GuestInfo>
                          <GuestName>{guest.name}</GuestName>
                          {guest.syncedWith && (
                            <span
                              style={{ fontSize: '0.75rem', color: '#28a745' }}
                            >
                              Sincronizado
                            </span>
                          )}
                        </GuestInfo>
                      </GuestItem>
                    ))}
                  </GuestList>
                ) : (
                  <EmptyState>
                    {searchQuery ? (
                      <>
                        <Users size={48} />
                        <h3>No se encontraron invitados</h3>
                        <p>
                          No hay invitados que coincidan con "{searchQuery}"
                        </p>
                      </>
                    ) : existingGuests.length === 0 ? (
                      <>
                        <Users size={48} />
                        <h3>No hay invitados</h3>
                        <p>
                          Aún no has creado ningún invitado. Crea uno nuevo en
                          la pestaña "Nuevo Invitado".
                        </p>
                      </>
                    ) : (
                      <>
                        <Users size={48} />
                        <h3>Todos los invitados ya están añadidos</h3>
                        <p>
                          Todos tus invitados existentes ya están en esta
                          partida.
                        </p>
                      </>
                    )}
                  </EmptyState>
                )}
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <InputGroup>
                  <Label htmlFor="guestName">Nombre del invitado</Label>
                  <Input
                    id="guestName"
                    type="text"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="Introduce el nombre del invitado"
                    autoFocus
                  />
                </InputGroup>

                <ModalFooter>
                  <Button
                    type="button"
                    $variant="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={!guestName.trim() || isLoading}
                  >
                    {isLoading ? 'Añadiendo...' : 'Añadir Invitado'}
                  </Button>
                </ModalFooter>
              </form>
            )}
          </TabContent>
        </ModalBody>

        {activeTab === 'existing' && !isLoading && (
          <ModalFooter>
            <Button type="button" $variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddGuestModal;
