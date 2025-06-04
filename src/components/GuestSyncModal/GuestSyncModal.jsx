import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X, User, Calendar, Trophy, Search, Link } from 'lucide-react';
import { guestAPI, userAPI } from '../../services/api';
import UserAvatar from '../UserAvatar/UserAvatar';
import toast from 'react-hot-toast';

const GuestSyncModal = ({ isOpen, onClose, guestId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const queryClient = useQueryClient();

  const { data: guestData, isLoading } = useQuery({
    queryKey: ['guest', guestId],
    queryFn: () => guestAPI.getGuest(guestId),
    enabled: isOpen && !!guestId
  });

  const { data: searchResponse = { data: [] } } = useQuery({
    queryKey: ['searchUsers', searchQuery],
    queryFn: () => userAPI.searchUsers(searchQuery),
    enabled: searchQuery.length >= 2
  });

  const users = searchResponse.data || [];

  const syncMutation = useMutation({
    mutationFn: targetUserId => guestAPI.syncGuest(guestId, targetUserId),
    onSuccess: data => {
      toast.success(data.data.message || 'Guest synced successfully');

      queryClient.invalidateQueries(['guests']);
      queryClient.invalidateQueries(['guest', guestId]);
      queryClient.invalidateQueries(['matches']); 
      queryClient.invalidateQueries(['userMatches']);
      queryClient.invalidateQueries(['match']); 

      onClose();
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Failed to sync guest');
    }
  });

  const handleSync = () => {
    if (!selectedUser) {
      toast.error('Please select a user to sync with');
      return;
    }
    syncMutation.mutate(selectedUser._id);
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="text-center">Loading guest information...</div>
        </div>
      </div>
    );
  }

  const { guest, stats, matches } = guestData || {};

  if (!guest) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="text-center text-red-600">Guest not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Guest Information</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Guest Info */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-4">
                <UserAvatar user={{ avatar: guest.avatar }} size="large" />
                <div>
                  <h3 className="text-xl font-semibold">{guest.name}</h3>
                  {guest.email && (
                    <p className="text-gray-600">{guest.email}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Created {new Date(guest.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {guest.syncedWith ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-green-800">
                    <Link size={16} />
                    <span className="font-medium">Already Synced</span>
                  </div>
                  <p className="text-green-700 mt-1">
                    This guest is synced with {guest.syncedWith.username}
                  </p>
                  <p className="text-sm text-green-600">
                    Synced on {new Date(guest.syncedAt).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-800">
                    <User size={16} />
                    <span className="font-medium">Not Synced</span>
                  </div>
                  <p className="text-blue-700 mt-1">
                    This guest can be synced with a registered user
                  </p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Trophy size={16} />
                Statistics
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {stats?.totalMatches || 0}
                  </div>
                  <div className="text-sm text-gray-600">Matches</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {stats?.totalWins || 0}
                  </div>
                  <div className="text-sm text-gray-600">Wins</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {stats?.winRate || 0}%
                  </div>
                  <div className="text-sm text-gray-600">Win Rate</div>
                </div>
              </div>
            </div>

            {/* Recent Matches */}
            {stats?.recentMatches?.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar size={16} />
                  Recent Matches
                </h4>
                <div className="space-y-2">
                  {stats.recentMatches.map(match => (
                    <div
                      key={match._id}
                      className="flex items-center gap-3 p-2 bg-white rounded"
                    >
                      <img
                        src={match.game.image || '/placeholder.svg'}
                        alt={match.game.name}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{match.game.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(match.date).toLocaleDateString()}
                        </p>
                      </div>
                      {match.players.find(p => p.guest?.toString() === guestId)
                        ?.isWinner && (
                        <Trophy size={14} className="text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sync Section */}
          {!guest.syncedWith && (
            <div className="space-y-4">
              <h4 className="font-semibold">Sync with User</h4>

              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search users to sync with..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {users.length > 0 && (
                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                  {users.map(user => (
                    <div
                      key={user._id}
                      onClick={() => setSelectedUser(user)}
                      className={`flex items-center gap-3 p-3 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                        selectedUser?._id === user._id
                          ? 'bg-blue-50 border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <UserAvatar user={user} size="small" />
                      <div className="flex-1">
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      {selectedUser?._id === user._id && (
                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {selectedUser && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium mb-2">Selected User:</h5>
                  <div className="flex items-center gap-3">
                    <UserAvatar user={selectedUser} size="small" />
                    <div>
                      <p className="font-medium">{selectedUser.username}</p>
                      <p className="text-sm text-gray-600">
                        {selectedUser.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSync}
                  disabled={!selectedUser || syncMutation.isLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {syncMutation.isLoading ? 'Syncing...' : 'Sync Guest'}
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestSyncModal;
