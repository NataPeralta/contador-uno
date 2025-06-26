import React, { useState } from 'react';
import type { PlayerManagerProps } from '../types';
import ClockIcon from '../assets/ClockIcon';
import PlayersIcon from '../assets/PlayersIcon';
import { Button } from './Button';
import { Input } from './Input';


export const PlayerManager: React.FC<PlayerManagerProps> = ({
  players,
  pendingPoints,
  currentRoundId,
  editingCompleteRound,
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

  // Función para determinar el texto de la ronda
  const getRoundText = () => {
    if (editingCompleteRound !== null) {
      return `Ronda ${editingCompleteRound + 1}`;
    }
    if (currentRoundId) {
      // Si es una nueva ronda, mostrar "Nueva Ronda"
      return "Nueva Ronda";
    }
    return "Ronda";
  };

  return (
    <div className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Jugadores ({players.length})
        </h2>
        
        {/* Agregar jugador */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <Input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Nombre del jugador"
          />
          <Button
            onClick={handleAddPlayer}
            disabled={!newPlayerName.trim()}
            variant="blue"
            aria-label="Añadir jugador"
          >
            Añadir Jugador
          </Button>
        </div>

        {/* Puntos Pendientes - Solo mostrar si hay puntos pendientes */}
        {hasPendingPoints && (
          <div className="mt-6 p-4 bg-uno-red bg-opacity-10 dark:bg-uno-red dark:bg-opacity-20 rounded-lg border border-uno-red border-opacity-30 dark:border-uno-red dark:border-opacity-50">
            <h3 className="font-semibold text-uno-red dark:text-uno-red-light mb-3 flex items-center">
              <ClockIcon />
              Puntos Pendientes de Confirmar - {getRoundText()}
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
          <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
            <PlayersIcon />
            <p>No hay jugadores agregados</p>
            <p className="text-sm">Agrega al menos 2 jugadores para comenzar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Este componente se encarga solo de la gestión, las cards se renderizan en el componente padre */}
          </div>
        )}
      </div>
    </div>
  );
}; 