import React, { useState } from 'react';
import type { Player } from '../types';

interface PlayerManagerProps {
  players: Player[];
  pendingPoints: Array<{ playerId: string; points: number }>;
  onAddPlayer: (name: string) => void;
}

export const PlayerManager: React.FC<PlayerManagerProps> = ({
  players,
  pendingPoints,
  onAddPlayer,
}) => {
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  // Calcular puntos pendientes por jugador
  const getPendingPointsForPlayer = (playerId: string) => {
    return pendingPoints
      .filter(point => point.playerId === playerId)
      .reduce((sum, point) => sum + point.points, 0);
  };

  const hasPendingPoints = pendingPoints.length > 0;

  return (
    <div className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Jugadores ({players.length})
        </h2>
        
        {/* Agregar jugador */}
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nombre del jugador"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-uno-blue focus:border-transparent flex-1"
            />
            <button
              onClick={handleAddPlayer}
              disabled={!newPlayerName.trim()}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-uno-blue text-white hover:bg-uno-blue-dark focus:ring-uno-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Añadir Jugador
            </button>
          </div>
        </div>

        {/* Puntos Pendientes - Solo mostrar si hay puntos pendientes */}
        {hasPendingPoints && (
          <div className="mb-6 p-4 bg-uno-red bg-opacity-10 dark:bg-uno-red dark:bg-opacity-20 rounded-lg border border-uno-red border-opacity-30 dark:border-uno-red dark:border-opacity-50">
            <h3 className="font-semibold text-uno-red dark:text-uno-red-light mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Puntos Pendientes de Confirmar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {players.map(player => {
                const pending = getPendingPointsForPlayer(player.id);
                if (pending > 0) {
                  return (
                    <div key={player.id} className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded border border-uno-red border-opacity-30 dark:border-uno-red dark:border-opacity-50">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {player.name}
                      </span>
                      <span className="text-sm font-bold text-uno-red dark:text-uno-red-light">
                        +{pending} puntos
                      </span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="mt-3 text-sm text-uno-red dark:text-uno-red-light">
              <p>• Los puntos pendientes se aplicarán al confirmar la ronda</p>
              <p>• Ve a "Confirmar Ronda" para editar o confirmar estos puntos</p>
            </div>
          </div>
        )}

        {/* Lista de jugadores */}
        {players.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <p>No hay jugadores agregados</p>
            <p className="text-sm">Agrega al menos 2 jugadores para comenzar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Aquí se renderizarán las cards de jugadores */}
            {/* Este componente se encarga solo de la gestión, las cards se renderizan en el componente padre */}
          </div>
        )}
      </div>
    </div>
  );
}; 