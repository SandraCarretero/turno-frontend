'use client';

import { useEffect } from 'react';

// Utilidad para emitir eventos personalizados de actualización de datos

export const emitDataUpdate = (eventType, data = {}) => {
  console.log(`📡 Emitiendo evento: ${eventType}`, data);
  window.dispatchEvent(new CustomEvent(eventType, { detail: data }));
};

// Eventos específicos para diferentes tipos de actualizaciones
export const emitGameAdded = gameData => {
  emitDataUpdate('gameAdded', { game: gameData });
};

export const emitGameRemoved = gameId => {
  emitDataUpdate('gameRemoved', { gameId });
};

export const emitFriendAdded = friendData => {
  emitDataUpdate('friendAdded', { friend: friendData });
};

export const emitFriendRemoved = friendId => {
  emitDataUpdate('friendRemoved', { friendId });
};

export const emitMatchAdded = matchData => {
  emitDataUpdate('matchAdded', { match: matchData });
};

export const emitMatchUpdated = matchData => {
  emitDataUpdate('matchUpdated', { match: matchData });
};

export const emitMatchDeleted = matchId => {
  emitDataUpdate('matchDeleted', { matchId });
};

export const emitProfileUpdated = userData => {
  emitDataUpdate('profileUpdated', { user: userData });
};

// Hook personalizado para escuchar actualizaciones
export const useDataUpdates = callback => {
  useEffect(() => {
    const events = [
      'gameAdded',
      'gameRemoved',
      'friendAdded',
      'friendRemoved',
      'matchAdded',
      'matchUpdated',
      'matchDeleted',
      'profileUpdated'
    ];

    const handleUpdate = event => {
      callback(event.type, event.detail);
    };

    events.forEach(eventType => {
      window.addEventListener(eventType, handleUpdate);
    });

    return () => {
      events.forEach(eventType => {
        window.removeEventListener(eventType, handleUpdate);
      });
    };
  }, [callback]);
};
