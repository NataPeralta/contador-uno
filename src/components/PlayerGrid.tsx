import React from 'react';
import type { PlayerGridProps } from '../types';
import PencilIcon from '../assets/PencilIcon';
import { PlayerGridCard } from './PlayerCard';

export const PlayerGrid: React.FC<PlayerGridProps> = ({
  players,
  targetPoints,
  onUpdatePlayerName,
  onRemovePlayer,
  canRemovePlayer,
  onEditCompleteRound
}) => {
  if (players.length === 0) return null;

  // Máximo número de rondas
  const maxRounds = Math.max(...players.map(p => p.rounds.length));

  return (
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb:bg-uno-blue/30">
      <div
        className={`grid w-full min-w-max border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800`}
        style={{
          gridTemplateColumns: `200px repeat(${maxRounds}, 1fr) 100px`,
        }}
      >
        {/* Header */}
        <div className="px-4 py-3 font-semibold text-uno-green dark:text-uno-green-light border-b border-gray-200 dark:border-gray-700 bg-uno-green bg-opacity-10 dark:bg-uno-green dark:bg-opacity-20">
          Jugador
        </div>
        {Array.from({ length: maxRounds }, (_, idx) => (
          <div
            key={idx}
            className="px-3 py-3 text-center font-semibold text-uno-green dark:text-uno-green-light border-b border-gray-200 dark:border-gray-700 bg-uno-green bg-opacity-10 dark:bg-uno-green dark:bg-opacity-20 flex items-center gap-2 justify-center"
          >
            <span>Ronda {idx + 1}</span>
            <button
              className="p-1 text-xs text-uno-blue dark:text-uno-blue-light hover:text-uno-blue-dark dark:hover:text-uno-blue transition-colors"
              title="Editar esta ronda"
              onClick={() => onEditCompleteRound(idx)}
            >
              <PencilIcon />
            </button>
          </div>
        ))}
        <div className="px-4 py-3 text-center font-semibold text-uno-green dark:text-uno-green-light border-b border-gray-200 dark:border-gray-700 bg-uno-green bg-opacity-10 dark:bg-uno-green dark:bg-opacity-20">
          Total
        </div>

        {/* Filas de jugadores usando el componente extraído */}
        {players.map((player) => (
          <PlayerGridCard
            key={player.id}
            player={player}
            targetPoints={targetPoints}
            maxRounds={maxRounds}
            onUpdateName={onUpdatePlayerName}
            onRemove={onRemovePlayer}
            canRemove={canRemovePlayer}
            onEditCompleteRound={onEditCompleteRound}
          />
        ))}
      </div>
    </div>
  );
};
