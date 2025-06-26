import React, { useState } from 'react';
import type { PlayerCardProps } from '../types';
import DeleteIcon from '../assets/DeleteIcon';

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
  let history: { total: number; sum: number; subtractedAmount?: number }[] = [];
  let acc = 0;
  player.rounds.forEach(round => {
    const playerPoints = round.points.find(p => p.playerId === player.id);
    const sum = playerPoints ? playerPoints.points : 0;
    acc += sum;
    const wasWinner = round.winnerId === player.id;
    const subtractedAmount = wasWinner ? round.subtractedAmount : undefined;
    
    // Calcular el valor real incluyendo la resta
    let realValue = sum;
    if (wasWinner && subtractedAmount && subtractedAmount > 0 && realValue === 0) {
      realValue = -subtractedAmount;
    }
    
    history.push({ total: acc, sum: realValue, subtractedAmount });
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
            <DeleteIcon />
          </button>
        )}
      </div>

      {/* Historial de puntos */}
      {history.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          {history.map((h, idx) => (
            <div key={idx} className="grid grid-cols-2 items-center justify-items-center text-[2rem] mb-1">
              <span className="text-base font-bold text-gray-700 dark:text-gray-200 mr-2 min-w-[28px] text-center">{h.total}</span>
              <div className="flex flex-col items-center">
                <span className={`ml-1 text-xs font-bold ${h.sum > 0 ? 'text-uno-red dark:text-uno-red-light' : h.sum < 0 ? 'text-uno-yellow dark:text-uno-yellow-light' : 'text-uno-green dark:text-uno-green-light'}`}>
                  {h.sum > 0 ? `+${h.sum}` : h.sum < 0 ? `${h.sum}` : '0'}
                </span>
              </div>
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