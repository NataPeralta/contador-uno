import React, { useState } from 'react';
import type { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  onUpdateName: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  targetPoints: number;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  onUpdateName,
  onRemove,
  canRemove,
  targetPoints,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);

  const handleNameSubmit = () => {
    if (editName.trim()) {
      onUpdateName(player.id, editName.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setEditName(player.name);
      setIsEditing(false);
    }
  };
  
  const isWinner = player.points >= targetPoints;

  // Historial de puntos acumulados y sumados por ronda
  let history: { total: number; sum: number }[] = [];
  let acc = 0;
  player.rounds.forEach(round => {
    const playerPoints = round.points.find(p => p.playerId === player.id);
    const sum = playerPoints ? playerPoints.points : 0;
    acc += sum;
    history.push({ total: acc, sum });
  });

  return (
    <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center min-w-[200px] min-h-[300px]">
      {/* Header con nombre y eliminar */}
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex-1 flex justify-center">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleKeyPress}
              className="text-2xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-uno-blue"
              autoFocus
            />
          ) : (
            <span
              className="px-2 py-1 text-gray-900 dark:text-gray-100 text-2xl font-bold cursor-pointer tracking-wide hover:text-uno-blue dark:hover:text-uno-blue-light transition-colors"
              onClick={() => setIsEditing(true)}
            >
              {player.name}
            </span>
          )}
        </div>
        {canRemove && (
          <button
            onClick={() => onRemove(player.id)}
            className="ml-2 text-gray-500 dark:text-gray-400 hover:text-uno-red dark:hover:text-uno-red-light transition-colors"
            title="Eliminar jugador"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Historial de puntos */}
      {history.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          {history.map((h, idx) => (
            <div key={idx} className="grid grid-cols-2 items-center justify-items-center text-[2rem] mb-1">
              <span className="text-base font-bold text-gray-700 dark:text-gray-200 mr-2 min-w-[28px] text-center">{h.total}</span>
              <span className={`ml-1 text-xs font-bold ${h.sum > 0 ? 'text-uno-red dark:text-uno-red-light' : 'text-uno-green dark:text-uno-green-light'}`}>{h.sum > 0 ? `+${h.sum}` : '0'}</span>
            </div>
          ))}
        </div>
      )}

      {/* Puntos totales grandes debajo */}
      <p className="text-2xl font-bold mt-6 text-gray-700 dark:text-gray-100">Total:</p>
      <div className={`text-4xl font-bold ${isWinner ? 'text-uno-green dark:text-uno-green-light' : 'text-gray-900 dark:text-gray-100'}`}>
        {player.points}
      </div>
    </div>
  );
}; 