import React from 'react';
import { PlayerNameCell } from './PlayerNameCell';
import type { Round, PlayerPoints } from '../types';

// Componente para la card del jugador en la tabla (PlayerGrid)
export const PlayerGridCard: React.FC<{
  player: any;
  targetPoints: number;
  maxRounds: number;
  onUpdateName: (playerId: string, name: string) => void;
  onRemove: (playerId: string) => void;
  canRemove: boolean;
  onEditCompleteRound: (roundIndex: number) => void;
}> = ({ player, targetPoints, maxRounds, onUpdateName, onRemove, canRemove }) => {
  const isWinner = player.points >= targetPoints;
  
  // Historial de puntos acumulados y sumados por ronda
  let history: { total: number; sum: number }[] = [];
  let acc = 0;
  player.rounds.forEach((round: Round) => {
    const playerPoints = round.points.find((p: PlayerPoints) => p.playerId === player.id);
    const sum = playerPoints ? playerPoints.points : 0;
    acc += sum;
    history.push({ total: acc, sum });
  });

  return (
    <React.Fragment>
      {/* Nombre y borrar */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <PlayerNameCell
          player={player}
          onUpdateName={onUpdateName}
          onRemove={onRemove}
          canRemove={canRemove}
          isWinner={isWinner}
        />
      </div>
      {/* Rondas */}
      {Array.from({ length: maxRounds }, (_, roundIdx) => {
        const roundData = history[roundIdx];
        const round = player.rounds[roundIdx];
        const wasWinner = round?.winnerId === player.id;
        const subtractedAmount = round?.subtractedAmount || 0;
        
        // Calcular el valor real incluyendo la resta
        let realValue = roundData ? roundData.sum : 0;
        if (wasWinner && subtractedAmount > 0 && realValue === 0) {
          realValue = -subtractedAmount;
        }
        
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
                  realValue > 0
                    ? 'text-uno-red dark:text-uno-red-light'
                    : realValue < 0
                    ? 'text-uno-yellow dark:text-uno-yellow-light'
                    : 'text-uno-green dark:text-uno-green-light'
                }`}>
                  {realValue > 0 ? `+${realValue}` : realValue < 0 ? `${realValue}` : '0'}
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
};
