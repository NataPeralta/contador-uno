import React, { useState } from 'react';
import type { PlayerGridProps, PlayerNameCellProps } from '../types';
import DeleteIcon from '../assets/DeleteIcon';
import PencilIcon from '../assets/PencilIcon';

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

        {/* Filas de jugadores */}
        {players.map((player) => {
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
            <React.Fragment key={player.id}>
              {/* Nombre y borrar */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <PlayerNameCell
                  player={player}
                  onUpdateName={onUpdatePlayerName}
                  onRemove={onRemovePlayer}
                  canRemove={canRemovePlayer}
                  isWinner={isWinner}
                />
              </div>
              {/* Rondas */}
              {Array.from({ length: maxRounds }, (_, roundIdx) => {
                const roundData = history[roundIdx];
                return (
                  <div
                    key={roundIdx}
                    className="px-3 py-3 text-center border-b border-gray-200 dark:border-gray-700 flex items-center gap-2 justify-center"
                  >
                    {roundData ? (
                      <>
                        <span className="text-lg font-bold text-gray-700 dark:text-gray-200">
                          {roundData.total}
                        </span>
                        <span className={`text-xs font-medium ${
                          roundData.sum > 0
                            ? 'text-uno-red dark:text-uno-red-light'
                            : 'text-uno-green dark:text-uno-green-light'
                        }`}>
                          {roundData.sum > 0 ? `+${roundData.sum}` : '0'}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 text-sm">-</span>
                    )}
                  </div>
                );
              })}
              {/* Total */}
              <div className="px-4 py-3 text-center border-b border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
                <div className={`text-2xl font-bold ${
                  isWinner
                    ? 'text-uno-green dark:text-uno-green-light'
                    : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {player.points}
                </div>
                {isWinner && (
                  <div className="text-xs text-uno-green dark:text-uno-green-light font-medium">
                    ¡GANADOR!
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const PlayerNameCell: React.FC<PlayerNameCellProps> = ({ player, onUpdateName, onRemove, canRemove, isWinner }) => {
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

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={handleKeyPress}
            className="w-full text-lg font-bold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-2 py-1 shadow-sm transition-all"
            autoFocus
          />
        ) : (
          <span
            className={`text-lg font-bold cursor-pointer hover:text-uno-blue dark:hover:text-uno-blue-light transition-colors px-2 py-1 rounded ${
              isWinner
                ? 'text-uno-green dark:text-uno-green-light'
                : 'text-gray-900 dark:text-gray-100'
            }`}
            onClick={() => setIsEditing(true)}
          >
            {player.name}
          </span>
        )}
      </div>
      {canRemove && !isEditing && (
        <button
          onClick={() => onRemove(player.id)}
          className="text-gray-500 dark:text-gray-400 hover:text-uno-red dark:hover:text-uno-red-light transition-colors p-1 rounded"
          title="Eliminar jugador"
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};
