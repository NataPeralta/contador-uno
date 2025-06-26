import React from 'react';
import type { GameControlsProps } from '../types/components/GameControls.types';
import { Button } from './Button';

export const GameControls: React.FC<GameControlsProps> = ({
  targetPoints,
  hasPendingPoints,
  devMode,
  onAddRound,
  onNewGame,
  onLoadExampleGame,
  onResetGame
}) => {
  return (
    <div className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Configuración de la Partida
        </h2>
        
        {/* Información de configuración */}
        <div className="mb-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Puntos objetivo
              </label>
              <span className="text-2xl font-bold text-uno-green dark:text-uno-green-light">
                {targetPoints}
              </span>
            </div>
          </div>
        </div>
        
        {/* Botones de control */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"> 
          <Button
            onClick={onAddRound}
            variant="blue"
          >
            {hasPendingPoints ? 'Confirmar Ronda' : 'Agregar Ronda'}
          </Button>
          
          <Button
            onClick={onNewGame}
            variant="green"
          >
            Nuevo Juego
          </Button>

          {devMode && onLoadExampleGame && onResetGame && (
            <>
              <Button
                onClick={onLoadExampleGame}
                variant="yellow"
              >
                Cargar Ejemplo
              </Button>
              <Button
                onClick={onResetGame}
                variant="red"
              >
                Resetear
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 