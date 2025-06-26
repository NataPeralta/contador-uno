import { useState, useEffect } from 'react';
import type { PlayerPoints, CardSelection } from '../types';

interface UseGameLogicProps {
  gameState: any;
  addRound: (winnerId: string, points: PlayerPoints[]) => void;
  editRound: (roundIndex: number, points: PlayerPoints[]) => void;
  getWinner: () => any;
}

export const useGameLogic = ({ gameState, addRound, editRound, getWinner }: UseGameLogicProps) => {
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [pendingWinner, setPendingWinner] = useState<string | null>(null);
  const [pendingPoints, setPendingPoints] = useState<PlayerPoints[]>([]);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [editingCompleteRound, setEditingCompleteRound] = useState<number | null>(null);

  // Verificar ganador
  useEffect(() => {
    const winner = getWinner();
    if (winner) {
      alert(`¡${winner.name} ha ganado la partida con ${winner.points} puntos!`);
    }
  }, [gameState.players, getWinner]);

  const handleAddRound = () => {
    if (gameState.players.length < 2) {
      alert('Necesitas al menos 2 jugadores para jugar.');
      return;
    }
    // Solo resetear puntos pendientes si no hay ninguno (nueva ronda)
    if (pendingPoints.length === 0) {
      setPendingPoints([]);
    }
    setShowPlayerModal(true);
  };

  const handlePlayerSelect = (playerId: string) => {
    setPendingWinner(playerId);
    setShowPlayerModal(false);
    setShowCardsModal(true);
  };

  const handleCardsConfirm = (selections: CardSelection[], directPoints: number) => {
    // Si estamos editando una ronda
    if (editingPlayerId) {
      const totalPoints = selections.reduce((sum, selection) => {
        return sum + (selection.card.value * selection.quantity);
      }, 0) + directPoints;

      setPendingPoints(prev =>
        prev.filter(p => p.playerId !== editingPlayerId).concat([{
          playerId: editingPlayerId,
          points: totalPoints,
          cards: selections,
          directPoints
        }])
      );
      setEditingPlayerId(null);
      setShowCardsModal(false);
      setShowPlayerModal(true);
      return;
    }

    // Si estamos agregando puntos normales
    if (!pendingWinner) return;

    const totalPoints = selections.reduce((sum, selection) => {
      return sum + (selection.card.value * selection.quantity);
    }, 0) + directPoints;

    // Agregar puntos pendientes solo para el jugador seleccionado
    const newPendingPoints: PlayerPoints[] = [{
      playerId: pendingWinner,
      points: totalPoints,
      cards: selections,
      directPoints
    }];

    setPendingPoints(prev => [...prev, ...newPendingPoints]);
    setPendingWinner(null);
    setShowCardsModal(false);
    setShowPlayerModal(true);
  };

  const handleCardsBack = () => {
    setShowCardsModal(false);
    setShowPlayerModal(true);
  };

  const handleEditPendingPoints = (playerId: string) => {
    const playerPoints = pendingPoints.filter(p => p.playerId === playerId);

    if (playerPoints.length > 0) {
      // Tomar la primera entrada (asumiendo que no hay múltiples entradas para el mismo jugador)
      setEditingPlayerId(playerId);
      setPendingWinner(playerId);
      setShowPlayerModal(false);
      setShowCardsModal(true);
    }
  };

  const handleConfirmRound = () => {
    if (pendingPoints.length === 0) return;

    // Agrupar puntos por jugador
    const pointsByPlayer = new Map<string, PlayerPoints>();
    pendingPoints.forEach(point => {
      const existing = pointsByPlayer.get(point.playerId);
      if (existing) {
        pointsByPlayer.set(point.playerId, {
          ...existing,
          points: existing.points + point.points,
          cards: [...existing.cards, ...point.cards],
          directPoints: (existing.directPoints || 0) + (point.directPoints || 0)
        });
      } else {
        pointsByPlayer.set(point.playerId, point);
      }
    });

    // Crear puntos para todos los jugadores, asignando 0 a los que no tienen puntos pendientes
    const finalPoints: PlayerPoints[] = gameState.players.map((player: any) => {
      const existingPoints = pointsByPlayer.get(player.id);
      if (existingPoints) {
        return existingPoints;
      } else {
        // Asignar 0 puntos a jugadores que no tienen puntos pendientes
        return {
          playerId: player.id,
          points: 0,
          cards: [],
          directPoints: 0
        };
      }
    });

    // Encontrar el ganador (el que tiene 0 puntos)
    const winner = finalPoints.find(point => point.points === 0);

    if (winner) {
      addRound(winner.playerId, finalPoints);
      setPendingPoints([]);
      setShowPlayerModal(false);
    }
  };

  // Handler para editar una ronda completa
  const handleEditCompleteRound = (roundIndex: number) => {
    // Obtener los datos de esa ronda para todos los jugadores
    const round = gameState.players[0]?.rounds[roundIndex];
    if (!round) return;

    // Cargar todos los puntos de esa ronda como puntos pendientes
    const roundPoints: PlayerPoints[] = round.points.map((p: any) => ({
      playerId: p.playerId,
      points: p.points,
      cards: p.cards || [],
      directPoints: p.directPoints || 0
    }));

    setPendingPoints(roundPoints);
    setEditingCompleteRound(roundIndex);
    setShowPlayerModal(true);
  };

  // Handler para confirmar la edición de una ronda completa
  const handleConfirmCompleteRoundEdit = () => {
    if (editingCompleteRound === null) return;

    // Encontrar el ganador (el que tiene 0 puntos)
    const winner = pendingPoints.find(point => point.points === 0);

    if (winner) {
      // Usar la función editRound del hook para actualizar el estado
      editRound(editingCompleteRound, pendingPoints);
      setPendingPoints([]);
      setEditingCompleteRound(null);
      setShowPlayerModal(false);
    }
  };

  // Obtener las selecciones iniciales para editar
  const getInitialSelectionsForPlayer = (playerId: string) => {
    const playerPoints = pendingPoints.filter(p => p.playerId === playerId);

    if (playerPoints.length > 0) {
      const result = playerPoints[0];
      return result;
    }
    return null;
  };

  const hasPendingPoints = pendingPoints.length > 0;

  return {
    // Estados
    showCardsModal,
    showPlayerModal,
    pendingPoints,
    editingCompleteRound,
    hasPendingPoints,
    editingPlayerId,

    // Handlers
    handleAddRound,
    handlePlayerSelect,
    handleCardsConfirm,
    handleCardsBack,
    handleEditPendingPoints,
    handleConfirmRound,
    handleEditCompleteRound,
    handleConfirmCompleteRoundEdit,
    getInitialSelectionsForPlayer,

    // Setters
    setShowCardsModal,
    setShowPlayerModal
  };
}; 