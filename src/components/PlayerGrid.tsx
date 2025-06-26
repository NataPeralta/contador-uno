import React from 'react';
import { PlayerCard } from './PlayerCard';
import type { Player } from '../types';

interface PlayerGridProps {
  players: Player[];
  targetPoints: number;
  onUpdatePlayerName: (id: string, name: string) => void;
  onRemovePlayer: (id: string) => void;
  canRemovePlayer: boolean;
  onEditCompleteRound: (roundIndex: number) => void;
}

export const PlayerGrid: React.FC<PlayerGridProps> = ({
  players,
  targetPoints,
  onUpdatePlayerName,
  onRemovePlayer,
  canRemovePlayer,
  onEditCompleteRound
}) => {
  if (players.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {/* Card de header */}
      <div className="relative bg-uno-green bg-opacity-10 dark:bg-uno-green dark:bg-opacity-20 border border-uno-green border-opacity-30 dark:border-uno-green dark:border-opacity-50 rounded-lg p-6 flex flex-col items-center min-w-[200px] min-h-[300px]">
        {/* Header con título */}
        <div className="w-full flex items-center justify-center mb-6">
          <span className="px-2 py-1 text-uno-green dark:text-uno-green-light text-2xl font-bold tracking-wide">
            Jugadores
          </span>
        </div>

        {/* Indicadores de columnas */}
        <div className="mt-2 flex flex-col gap-2">
          {players[0]?.rounds.length > 0 ? (
            players[0].rounds.map((_, idx) => (
              <div key={idx} className="grid grid-cols-2 items-center justify-items-center text-[2rem] mb-1">
                <span className="ml-1 text-xs font-bold text-uno-green dark:text-uno-green-light">Ronda {idx + 1}</span>
                <button
                  className="ml-2 p-1 text-xs text-uno-blue dark:text-uno-blue-light hover:text-uno-blue-dark dark:hover:text-uno-blue transition-colors"
                  title="Editar esta ronda"
                  onClick={() => onEditCompleteRound(idx)}
                >
                  ✎
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-uno-green dark:text-uno-green-light text-sm opacity-70">
              Sin rondas
            </div>
          )}
        </div>

        {/* Total */}
        <p className="text-2xl font-bold mt-6 text-uno-green dark:text-uno-green-light">Total:</p>
      </div>

      {/* Cards de jugadores */}
      {players.map(player => (
        <PlayerCard
          key={player.id}
          player={player}
          onUpdateName={onUpdatePlayerName}
          onRemove={onRemovePlayer}
          canRemove={canRemovePlayer}
          targetPoints={targetPoints}
        />
      ))}
    </div>
  );
}; 