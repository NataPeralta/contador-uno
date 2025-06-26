import React from 'react';
import { Modal } from './Modal';
import type { PlayerSelectionModalProps } from '../types';
import ArrowRightIcon from '../assets/ArrowRightIcon';


export const PlayerSelectionModal: React.FC<PlayerSelectionModalProps> = ({
  isOpen,
  onClose,
  players,
  onSelectPlayer,
  pendingPoints = [],
  onConfirmRound,
  hasPendingPoints = false,
  onEditPendingPoints,
  title
}) => {
  const handlePlayerSelect = (playerId: string) => {
    // Si el jugador tiene puntos pendientes, permitir editar
    const pending = getPendingPointsForPlayer(playerId);
    if (pending > 0 && onEditPendingPoints) {
      onEditPendingPoints(playerId);
    } else {
      onSelectPlayer(playerId);
    }
  };

  // Calcular puntos pendientes por jugador
  const getPendingPointsForPlayer = (playerId: string) => {
    return pendingPoints
      .filter(point => point.playerId === playerId)
      .reduce((sum, point) => sum + point.points, 0);
  };

  const modalTitle = title || (hasPendingPoints ? "Confirmar Ronda" : "Seleccionar Ganador");

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={modalTitle}
      size="xl"
      footer={
        hasPendingPoints && onConfirmRound ? (
          <div className="p-6">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirmRound}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-uno-green text-white hover:bg-uno-green-dark focus:ring-uno-green flex-1"
              >
                Confirmar Ronda
              </button>
            </div>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-4">
        {hasPendingPoints ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">
            ¿Como fueron los puntos en esta ronda?
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center">
            ¿Como fueron los puntos en esta ronda?
          </p>
        )}
        
        <div className="grid gap-3">
          {players.map(player => {
            const pending = getPendingPointsForPlayer(player.id);
            return (
              <button
                key={player.id}
                onClick={() => handlePlayerSelect(player.id)}
                className={`p-4 text-left transition-colors bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-uno-blue hover:text-white dark:hover:bg-uno-blue-light dark:hover:text-white`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-white">
                      {player.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white">
                      Puntos actuales: {player.points}
                    </p>
                    {pending > 0 && (
                      <div className="mt-1">
                        <p className="text-sm text-uno-red dark:text-uno-red-light font-medium group-hover:text-white">
                          Puntos pendientes: +{pending}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="text-uno-blue dark:text-uno-blue-light group-hover:text-white">
                    <ArrowRightIcon />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {!hasPendingPoints && (
          <button
            onClick={onClose}
            className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </div>
    </Modal>
  );
}; 