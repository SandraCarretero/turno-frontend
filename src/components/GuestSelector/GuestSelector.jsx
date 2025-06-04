import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Plus, Users } from 'lucide-react';
import { guestAPI } from '../../services/api';
import UserAvatar from '../UserAvatar/UserAvatar';
import toast from 'react-hot-toast';

const GuestSelector = ({ onGuestSelect, selectedGuests = [], onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestEmail, setNewGuestEmail] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const { data: guests = [], refetch } = useQuery({
    queryKey: ['guests'],
    queryFn: async () => {
      const result = await guestAPI.getGuests();
      return result || [];
    }
  });

  const { data: searchResults = [] } = useQuery({
    queryKey: ['searchGuests', searchQuery],
    queryFn: async () => {
      const result = await guestAPI.searchGuests(searchQuery);
      return result || [];
    },
    enabled: searchQuery.length >= 2
  });

  const handleCreateGuest = async () => {
    if (!newGuestName.trim()) {
      toast.error('Guest name is required');
      return;
    }

    if (newGuestName.trim().length > 50) {
      toast.error('Guest name cannot exceed 50 characters');
      return;
    }

    if (
      newGuestEmail &&
      newGuestEmail.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newGuestEmail.trim())
    ) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsCreating(true);
    try {
      const guestData = {
        name: newGuestName.trim()
      };

      if (newGuestEmail && newGuestEmail.trim()) {
        guestData.email = newGuestEmail.trim();
      }

      console.log('Creating guest with data:', guestData);

      const response = await guestAPI.createGuest(guestData);

      console.log('Guest created successfully:', response);

      if (response.success && response.guest) {
        onGuestSelect(response.guest);
        setNewGuestName('');
        setNewGuestEmail('');
        setShowCreateForm(false);
        refetch();
        toast.success(response.message || 'Guest created successfully!');
      } else {
        console.error('Unexpected response structure:', response);
        toast.error('Guest created but response format is unexpected');
      }
    } catch (error) {
      console.error('Error creating guest:', error);

      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors
          .map(err => err.msg)
          .join(', ');
        toast.error(`Validation errors: ${errorMessages}`);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to create guest. Please try again.');
      }
    } finally {
      setIsCreating(false);
    }
  };

  const displayGuests = searchQuery.length >= 2 ? searchResults : guests;
  const availableGuests = displayGuests.filter(
    guest => !selectedGuests.some(selected => selected._id === guest._id)
  );

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={20} />
          <h3 className="font-medium">Add Guests</h3>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search existing guests..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Guest List */}
      {availableGuests.length > 0 && (
        <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
          {availableGuests.map(guest => (
            <div
              key={guest._id}
              onClick={() => onGuestSelect(guest)}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <UserAvatar user={{ avatar: guest.avatar }} size="small" />
              <div className="flex-1">
                <p className="font-medium">{guest.name}</p>
                {guest.email && (
                  <p className="text-sm text-gray-500">{guest.email}</p>
                )}
                <p className="text-xs text-gray-400">
                  {guest.totalMatches || 0} matches • {guest.totalWins || 0}{' '}
                  wins
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No guests found message */}
      {searchQuery.length >= 2 && availableGuests.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No guests found matching "{searchQuery}"
        </div>
      )}

      {/* Create New Guest */}
      <div className="border-t pt-4">
        {!showCreateForm ? (
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus size={16} />
            Create New Guest
          </button>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guest Name *{' '}
                <span className="text-xs text-gray-500">
                  (max 50 characters)
                </span>
              </label>
              <input
                type="text"
                value={newGuestName}
                onChange={e => setNewGuestName(e.target.value)}
                placeholder="Enter guest name"
                maxLength={50}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isCreating}
              />
              <div className="text-xs text-gray-500 mt-1">
                {newGuestName.length}/50 characters
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                value={newGuestEmail}
                onChange={e => setNewGuestEmail(e.target.value)}
                placeholder="Enter email (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isCreating}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCreateGuest}
                disabled={
                  isCreating ||
                  !newGuestName.trim() ||
                  newGuestName.trim().length > 50
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? 'Creating...' : 'Create Guest'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewGuestName('');
                  setNewGuestEmail('');
                }}
                disabled={isCreating}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestSelector;
