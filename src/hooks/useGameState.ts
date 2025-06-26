import { useState, useEffect, useCallback } from 'react';
import type { GameState, GameSettings, Round, PlayerPoints } from '../types';

const STORAGE_KEY = 'uno-game-state';

// Función para generar IDs únicos
let idCounter = 0;
const generateUniqueId = () => {
  idCounter += 1;
  return `${Date.now()}-${idCounter}-${Math.random().toString(36).substr(2, 9)}`;
};

const defaultSettings: GameSettings = {
  targetPoints: 500,
  theme: 'system'
};

const defaultState: GameState = {
  players: [],
  settings: defaultSettings,
  history: []
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar estado desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setGameState(parsed);
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
    setIsLoaded(true);
  }, []);

  // Guardar estado en localStorage
  const saveState = useCallback((state: GameState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, []);

  // Actualizar estado y guardar
  const updateState = useCallback((updater: (state: GameState) => GameState) => {
    setGameState(prevState => {
      const newState = updater(prevState);
      saveState(newState);
      return newState;
    });
  }, [saveState]);

  // Agregar jugador
  const addPlayer = useCallback((name: string) => {
    updateState(state => {
      // Si ya hay rondas jugadas, crear historial de rondas con 0 puntos
      let rounds: Round[] = [];
      let initialPoints = 0;
      if (state.players.length > 0 && state.players[0].rounds.length > 0) {
        rounds = state.players[0].rounds.map(round => ({
          ...round,
          // Para este jugador, solo agregarlo con 0 puntos
          points: [
            ...round.points,
            { playerId: 'TEMP', points: 0, cards: [], directPoints: 0 }
          ]
        }));
        // Calcular el puntaje inicial según el setting
        const setting = state.settings.newPlayerInitialScore || 'zero';
        const allPoints = state.players.map(p => p.points);
        if (setting === 'min' && allPoints.length > 0) {
          initialPoints = Math.min(...allPoints);
        } else if (setting === 'max' && allPoints.length > 0) {
          initialPoints = Math.max(...allPoints);
        } // else zero
      }
      const newPlayerId = generateUniqueId();
      // Reemplazar el playerId 'TEMP' por el real
      rounds = rounds.map(round => ({
        ...round,
        points: round.points.map(p =>
          p.playerId === 'TEMP' ? { ...p, playerId: newPlayerId } : p
        )
      }));
      return {
        ...state,
        players: [
          ...state.players,
          {
            id: newPlayerId,
            name,
            points: initialPoints,
            rounds
          }
        ]
      };
    });
  }, [updateState]);

  // Eliminar jugador
  const removePlayer = useCallback((playerId: string) => {
    if (confirm("Desea eliminar este jugador?")) {
      updateState(state => ({
        ...state,
        players: state.players.filter(p => p.id !== playerId)
      }));
    }
    return;
  }, [updateState]);

  // Actualizar nombre del jugador
  const updatePlayerName = useCallback((playerId: string, name: string) => {
    updateState(state => ({
      ...state,
      players: state.players.map(p =>
        p.id === playerId ? { ...p, name } : p
      )
    }));
  }, [updateState]);

  // Actualizar configuración
  const updateSettings = useCallback((settings: Partial<GameSettings>) => {
    updateState(state => ({
      ...state,
      settings: { ...state.settings, ...settings }
    }));
  }, [updateState]);

  // Agregar ronda
  const addRound = useCallback((winnerId: string, playerPoints: PlayerPoints[]) => {
    updateState(state => {
      let adjustedPlayerPoints = [...playerPoints];
      const settings = state.settings;
      let subtractedAmount = 0; // Para guardar cuánto se restó

      if (settings.winnerSubtractsPoints && settings.winnerSubtractValue && winnerId) {
        // Buscar el ganador
        const winnerIdx = adjustedPlayerPoints.findIndex(p => p.playerId === winnerId);
        // Si el ganador no está en la lista (porque tiene 0 puntos), agregarlo
        if (winnerIdx === -1) {
          adjustedPlayerPoints.push({ playerId: winnerId, points: 0, cards: [], directPoints: 0 });
        }
        // Calcular cuánto restar
        let subtract = 0;
        if (settings.winnerSubtractType === 'fixed') {
          subtract = settings.winnerSubtractValue;
        } else if (settings.winnerSubtractType === 'percent') {
          // Sumar todos los puntos de la ronda (de los demás jugadores)
          const totalPoints = adjustedPlayerPoints
            .filter(p => p.playerId !== winnerId)
            .reduce((acc, p) => acc + p.points, 0);
          // Usar Math.floor para números enteros y agregar límite mínimo de 10
          subtract = Math.floor((settings.winnerSubtractValue / 100) * totalPoints);
          // Si el resultado es menor a 10, no restar nada
          if (subtract < 10) {
            subtract = 0;
          }
        }

        // Guardar cuánto se restó
        subtractedAmount = subtract;

        // Restar al ganador
        adjustedPlayerPoints = adjustedPlayerPoints.map(p =>
          p.playerId === winnerId
            ? { ...p, points: p.points - subtract }
            : p
        );
      }
      const newRound: Round = {
        id: generateUniqueId(),
        winnerId,
        points: adjustedPlayerPoints,
        timestamp: Date.now(),
        subtractedAmount // Agregar información sobre cuánto se restó
      };

      // Guardar estado anterior para undo
      const historyEntry = { ...state };

      // Calcular puntos totales para cada jugador
      const updatedPlayers = state.players.map(player => {
        const playerPoint = adjustedPlayerPoints.find(pp => pp.playerId === player.id);
        const pointsToAdd = playerPoint ? playerPoint.points : 0;

        return {
          ...player,
          points: player.points + pointsToAdd,
          rounds: [...player.rounds, newRound]
        };
      });

      return {
        ...state,
        players: updatedPlayers,
        history: [...state.history, historyEntry]
      };
    });
  }, [updateState]);

  // Deshacer última ronda
  const undoLastRound = useCallback(() => {
    updateState(state => {
      if (state.history.length === 0) return state;

      const previousState = state.history[state.history.length - 1];
      return {
        ...previousState,
        history: state.history.slice(0, -1)
      };
    });
  }, [updateState]);

  // Nuevo juego
  const newGame = useCallback(() => {
    updateState(state => ({
      ...state,
      players: state.players.map(p => ({ ...p, points: 0, rounds: [] })),
      history: []
    }));
  }, [updateState]);

  // Verificar si hay ganador
  const getWinner = useCallback(() => {
    return gameState.players?.find(player => player.points >= gameState.settings.targetPoints);
  }, [gameState.players, gameState.settings.targetPoints]);

  // Obtener jugador por ID
  const getPlayerById = useCallback((playerId: string) => {
    return gameState.players?.find(p => p.id === playerId);
  }, [gameState.players]);

  // Editar ronda específica
  const editRound = useCallback((roundIndex: number, updatedPoints: PlayerPoints[]) => {
    updateState(state => {
      // Verificar que la ronda existe
      if ((state.players?.length ?? 0) === 0 || !state.players?.[0]?.rounds?.[roundIndex]) {
        return state;
      }

      // Crear la ronda actualizada
      const originalRound = state.players?.[0]?.rounds?.[roundIndex];

      // Calcular si se debe restar algo al ganador
      let subtractedAmount = 0;
      const settings = state.settings;
      const winner = updatedPoints.find(p => p.points === 0);

      if (settings.winnerSubtractsPoints && settings.winnerSubtractValue && winner) {
        if (settings.winnerSubtractType === 'fixed') {
          subtractedAmount = settings.winnerSubtractValue;
        } else if (settings.winnerSubtractType === 'percent') {
          const totalPoints = updatedPoints
            .filter(p => p.playerId !== winner.playerId)
            .reduce((acc, p) => acc + p.points, 0);
          subtractedAmount = Math.floor((settings.winnerSubtractValue / 100) * totalPoints);
          if (subtractedAmount < 10) {
            subtractedAmount = 0;
          }
        }
      }

      const updatedRound: Round = {
        ...originalRound,
        points: updatedPoints,
        subtractedAmount
      };

      // Actualizar todas las rondas en todos los jugadores
      const updatedPlayers = state.players?.map(player => {
        const updatedRounds = [...player.rounds];
        updatedRounds[roundIndex] = updatedRound;

        // Recalcular puntos acumulados desde el principio
        let totalPoints = 0;
        updatedRounds.forEach(round => {
          const playerPoints = round.points?.find(p => p.playerId === player.id);
          if (playerPoints) {
            totalPoints += playerPoints.points;
          }
        });

        return {
          ...player,
          points: totalPoints,
          rounds: updatedRounds
        };
      });

      return {
        ...state,
        players: updatedPlayers
      };
    });
  }, [updateState]);

  return {
    gameState,
    isLoaded,
    addPlayer,
    removePlayer,
    updatePlayerName,
    updateSettings,
    addRound,
    undoLastRound,
    newGame,
    getWinner,
    getPlayerById,
    editRound
  };
}; 