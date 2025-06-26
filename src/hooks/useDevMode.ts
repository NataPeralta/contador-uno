import { useCallback } from 'react';

interface UseDevModeProps {
  gameState: any;
}

export const useDevMode = ({ gameState }: UseDevModeProps) => {
  // Detectar devMode por query string
  const devMode = typeof window !== 'undefined' && window.location.search.includes('devMode=true');

  // Función para cargar partida de ejemplo
  const handleLoadExampleGame = useCallback(() => {
    // 4 jugadores, 3 rondas, puntajes variados
    const examplePlayers = [
      { id: 'p1', name: 'Dev 1' },
      { id: 'p2', name: 'Dev 2' },
      { id: 'p3', name: 'Dev 3' },
      { id: 'p4', name: 'Dev 4' }
    ];
    const exampleRounds = [
      {
        id: 'r1',
        winnerId: 'p1',
        points: [
          { playerId: 'p1', points: 0, cards: [], directPoints: 0 },
          { playerId: 'p2', points: 10, cards: [], directPoints: 10 },
          { playerId: 'p3', points: 20, cards: [], directPoints: 20 },
          { playerId: 'p4', points: 30, cards: [], directPoints: 30 }
        ],
        timestamp: Date.now()
      },
      {
        id: 'r2',
        winnerId: 'p3',
        points: [
          { playerId: 'p1', points: 15, cards: [], directPoints: 15 },
          { playerId: 'p2', points: 0, cards: [], directPoints: 0 },
          { playerId: 'p3', points: 20, cards: [], directPoints: 20 },
          { playerId: 'p4', points: 25, cards: [], directPoints: 25 }
        ],
        timestamp: Date.now() + 1
      },
      {
        id: 'r3',
        winnerId: 'p4',
        points: [
          { playerId: 'p1', points: 5, cards: [], directPoints: 5 },
          { playerId: 'p2', points: 10, cards: [], directPoints: 10 },
          { playerId: 'p3', points: 15, cards: [], directPoints: 15 },
          { playerId: 'p4', points: 0, cards: [], directPoints: 0 }
        ],
        timestamp: Date.now() + 2
      }
    ];

    // Calcular puntos totales para cada jugador y asignar las rondas
    const playersWithRounds = examplePlayers.map(player => {
      let totalPoints = 0;
      exampleRounds.forEach(round => {
        const playerPoints = round.points.find(p => p.playerId === player.id);
        if (playerPoints) {
          totalPoints += playerPoints.points;
        }
      });

      return {
        ...player,
        points: totalPoints,
        rounds: exampleRounds
      };
    });

    // Setear el estado global (usando localStorage para simular)
    localStorage.setItem('uno-game-state', JSON.stringify({
      players: playersWithRounds,
      settings: gameState.settings,
      history: []
    }));
    window.location.reload();
  }, [gameState.settings]);

  const handleResetGame = useCallback(() => {
    localStorage.removeItem('uno-game-state');
    window.location.reload();
  }, []);

  return {
    devMode,
    handleLoadExampleGame,
    handleResetGame
  };
}; 