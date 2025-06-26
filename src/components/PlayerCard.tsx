import React from 'react';
import { PlayerNameCell } from './PlayerNameCell';
import type { Round, PlayerPoints } from '../types';

// Componente para la card del jugador en la tabla (PlayerGrid)
export const PlayerGridCard: React.FC<{
  player: any;
  allPlayers: any[];
  targetPoints: number;
  maxRounds: number;
  onUpdateName: (playerId: string, name: string) => void;
  onRemove: (playerId: string) => void;
  canRemove: boolean;
  onEditCompleteRound: (roundIndex: number) => void;
}> = ({ player, allPlayers, targetPoints, maxRounds, onUpdateName, onRemove, canRemove }) => {

  // Optimizar como funcion el calculo de los ganadores
  const isWinner = player.points >= targetPoints;

  // Función para obtener el puesto del jugador
  const getPlayerPosition = (allPlayers: any[]) => {
    // Ordenar jugadores por puntos de mayor a menor
    const sortedPlayers = [...allPlayers].sort((a, b) => b.points - a.points);
    
    // Encontrar la posición del jugador actual
    const position = sortedPlayers.findIndex(p => p.id === player.id) + 1;
    
    if (position === 1) return { label: "GANADOR", color: 'green', position: position };
    if (position === 2) return { label: "2º PUESTO", color: 'yellow', position: position };
    if (position === 3) return { label: "3º PUESTO", color: 'red', position: position };
    
    return { label: `${position}º PUESTO`, color: 'gray', position: position };
  };

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
      {(() => {
        const position = getPlayerPosition(allPlayers);
        return (
          <div className="px-4 py-3 text-center border-b border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
            <div className={`text-2xl font-bold text-white dark:text-white}`}>
              {player.points}
            </div>
            {/* Si el puntaje de un solo jugador, es mayor al settings.targetPoints, mostrar el puesto */}
            {player.points > targetPoints && (
              <div className={`text-xs font-medium ${
                `text-uno-${position.color} dark:text-uno-${position.color}-light`
                }`}>
                  {position.label}
                </div>
            )}
          </div>
        );
      })()}
    </React.Fragment>
  );
};
