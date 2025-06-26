import React from 'react';
import { Modal } from './Modal';
import type { PlayerSelectionModalProps } from '../types';
import ArrowRightIcon from '../assets/ArrowRightIcon';
import { Button } from './Button';

export const PlayerSelectionModal: React.FC<PlayerSelectionModalProps> = ({
  isOpen,
  onClose,
  players,
  onSelectPlayer,
  pendingPoints = [],
  onConfirmRound,
  hasPendingPoints = false,
  onEditPendingPoints,
  title,
  currentRound
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

  
  const modalTitle = title || (hasPendingPoints ? `Confirmar Ronda ${currentRound}` : "Seleccionar Ganador");

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
              <Button
                onClick={onClose}
                variant="gray"
                aria-label="Cancelar"
              >
                Cancelar
              </Button>
              <Button
                onClick={onConfirmRound}
                variant="green"
                aria-label="Confirmar Ronda"
              >
                Confirmar Ronda
              </Button>
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
            const pending = getPendingPointsForPlayer(player.id)
            return (
              <Button
                key={player.id}
                onClick={() => handlePlayerSelect(player.id)}
                variant="gray"
                aria-label={`Seleccionar ${player.name}`}
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
              </Button>
            );
          })}
        </div>

        {!hasPendingPoints && (
          <Button
            onClick={onClose}
            variant="gray"
            aria-label="Cancelar" 
          >
            Cancelar
          </Button>
        )}
      </div>
    </Modal>
  );
}; 