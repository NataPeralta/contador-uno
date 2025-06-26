import React from 'react';

interface GameControlsProps {
  targetPoints: number;
  playerCount: number;
  hasPendingPoints: boolean;
  canUndo: boolean;
  devMode: boolean;
  onAddRound: () => void;
  onUndoLastRound: () => void;
  onNewGame: () => void;
  onLoadExampleGame?: () => void;
  onResetGame?: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  targetPoints,
  playerCount,
  hasPendingPoints,
  canUndo,
  devMode,
  onAddRound,
  onUndoLastRound,
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
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Puntos objetivo
            </label>
            <span className="text-2xl font-bold text-uno-green dark:text-uno-green-light">
              {targetPoints}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={onAddRound}
              disabled={playerCount < 2}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-uno-blue text-white hover:bg-uno-blue-dark focus:ring-uno-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hasPendingPoints ? 'Confirmar Ronda' : 'Agregar Ronda'}
            </button>
            
            <button
              onClick={onUndoLastRound}
              disabled={!canUndo}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Deshacer
            </button>
            
            <button
              onClick={onNewGame}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-uno-green text-white hover:bg-uno-green-dark focus:ring-uno-green"
            >
              Nuevo Juego
            </button>

            {devMode && onLoadExampleGame && onResetGame && (
              <>
                <button
                  onClick={onLoadExampleGame}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-uno-yellow text-uno-black hover:bg-uno-yellow-dark focus:ring-uno-yellow"
                >
                  Cargar Ejemplo
                </button>
                <button
                  onClick={onResetGame}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-uno-red text-white hover:bg-uno-red-dark focus:ring-uno-red"
                >
                  Resetear
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 