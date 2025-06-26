import { useState, useEffect } from 'react';
import type { PlayerPoints, CardSelection, UseGameLogicProps } from '../types';


export const useGameLogic = ({ gameState, addRound, editRound, getWinner, updatePendingPoints, clearPendingPoints, showAlert, setCurrentRoundId }: UseGameLogicProps) => {
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [pendingWinner, setPendingWinner] = useState<string | null>(null);
  const [editingCompleteRound, setEditingCompleteRound] = useState<number | null>(null);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  // Usar puntos pendientes del estado global
  const pendingPoints = gameState.pendingPoints || [];
  const currentRoundId = gameState.currentRoundId;

  // Verificar ganador
  useEffect(() => {
    const winner = getWinner();
    if (winner) {
      showAlert({
        title: '¡Felicidades!',
        message: `¡${winner.name} ha ganado la partida con ${winner.points} puntos!`,
        type: 'success',
        isOpen: true,
        onClose: () => {
          setShowPlayerModal(false);
        }
      });
    }
  }, [gameState.players, getWinner]);

  // Función para generar un ID único para la ronda
  const generateRoundId = () => {
    return `round-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Función para validar que no haya conflictos de rondas
  const validateRoundConflict = (newRoundId: string) => {

    // Solo hay conflicto si hay puntos pendientes reales y es una ronda diferente
    if (pendingPoints.length > 0 && currentRoundId && currentRoundId !== newRoundId) {
      showAlert({
        title: 'Error',
        message: 'Ya tienes puntos pendientes de otra ronda. Debes confirmar o cancelar esa ronda antes de continuar.',
        type: 'error',
        isOpen: true,
        onClose: () => {
          setShowPlayerModal(false);
        }
      });
      return false;
    }
    return true;
  };

  const handleAddRound = () => {
    if (gameState.players.length < 2) {
      showAlert({
        title: 'Error',
        message: 'Necesitas al menos 2 jugadores para jugar.',
        type: 'error',
        isOpen: true,
        onClose: () => {
          setShowPlayerModal(false);
        }
      });
      return;
    }

    // Si ya hay puntos pendientes, abrir directamente el modal de confirmación
    if (pendingPoints.length > 0) {
      setShowPlayerModal(true);
      return;
    }

    const newRoundId = generateRoundId();
    if (!validateRoundConflict(newRoundId)) return;

    // Solo resetear puntos pendientes si no hay ninguno (nueva ronda)
    if (pendingPoints.length === 0) {
      clearPendingPoints();
      setCurrentRoundId(newRoundId);
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

      const updatedPendingPoints = pendingPoints
        .filter((p: PlayerPoints) => p.playerId !== editingPlayerId)
        .concat([{
          playerId: editingPlayerId,
          roundId: currentRoundId || generateRoundId(),
          points: totalPoints,
          cards: selections,
          directPoints
        }]);

      updatePendingPoints(updatedPendingPoints);
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
      roundId: currentRoundId || generateRoundId(),
      points: totalPoints,
      cards: selections,
      directPoints
    }];

    // Filtrar puntos existentes del jugador y agregar los nuevos
    const updatedPendingPoints = pendingPoints
      .filter((p: PlayerPoints) => p.playerId !== pendingWinner)
      .concat(newPendingPoints);

    updatePendingPoints(updatedPendingPoints);
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

    // Consolidar puntos por jugador (en caso de duplicados)
    const pointsByPlayer = new Map<string, PlayerPoints>();
    pendingPoints.forEach(point => {
      const existing = pointsByPlayer.get(point.playerId);
      if (existing) {
        // Sumar puntos y combinar cartas
        const mergedPoint: PlayerPoints = {
          ...existing,
          points: existing.points + point.points,
          cards: [...existing.cards, ...point.cards],
          directPoints: (existing.directPoints || 0) + (point.directPoints || 0)
        };
        pointsByPlayer.set(point.playerId, mergedPoint);
      } else {
        pointsByPlayer.set(point.playerId, point);
      }
    });

    // Si estamos editando una ronda completa, todos los jugadores deben estar en pendingPoints
    // Si estamos agregando una nueva ronda, verificar que haya exactamente un ganador (con 0 puntos)
    const expectedLength = editingCompleteRound !== null ? gameState.players.length : gameState.players.length - 1;

    // Contar solo jugadores que realmente tienen puntos (cartas o puntos directos > 0)
    const playersWithRealPoints = Array.from(pointsByPlayer.values()).filter(point =>
      point.cards.length > 0 || (point.directPoints && point.directPoints > 0)
    ).length;

    if (playersWithRealPoints !== expectedLength) {
      showAlert({
        title: 'Error',
        message: editingCompleteRound !== null
          ? 'Todos los jugadores deben tener puntos asignados'
          : 'Todos los jugadores excepto el ganador deben tener puntos asignados',
        type: 'error',
        isOpen: true,
        onClose: () => {
          setShowPlayerModal(false);
        }
      });
      return;
    }

    // Crear puntos para todos los jugadores, asignando 0 a los que no tienen puntos pendientes
    const finalPoints: PlayerPoints[] = gameState.players.map((player: any) => {
      const existingPoints = pointsByPlayer.get(player.id);
      if (existingPoints) {
        return existingPoints;
      } else {
        // Asignar 0 puntos a jugadores que no tienen puntos pendientes (ganador)
        return {
          playerId: player.id,
          roundId: currentRoundId || generateRoundId(),
          points: 0,
          cards: [],
          directPoints: 0
        };
      }
    });

    // Encontrar el ganador (el que tiene 0 puntos totales y no tiene cartas ni puntos directos)
    const winner = finalPoints.find(point =>
      point.points === 0 && point.cards.length === 0 && (point.directPoints === 0 || !point.directPoints)
    );
    const playersWithoutPoints = finalPoints.filter(point =>
      point.points === 0 && point.cards.length === 0 && (point.directPoints === 0 || !point.directPoints)
    );

    // Validar que exactamente un jugador sea ganador
    if (!winner || playersWithoutPoints.length !== 1) {
      showAlert({
        title: 'Error',
        message: 'Exactamente un jugador debe ser ganador (sin cartas ni puntos directos)',
        type: 'error',
        isOpen: true,
        onClose: () => {
          setShowPlayerModal(false);
        }
      });
      return;
    }

    if (winner) {
      addRound(winner.playerId, finalPoints);
      updatePendingPoints([]);
      setCurrentRoundId(null);
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
      roundId: p.roundId || generateRoundId(),
      points: p.points,
      cards: p.cards || [],
      directPoints: p.directPoints || 0
    }));

    updatePendingPoints(roundPoints);
    setEditingCompleteRound(roundIndex);
    setCurrentRoundId(roundPoints[0]?.roundId || generateRoundId());
    setShowPlayerModal(true);
  };

  // Handler para confirmar la edición de una ronda completa
  const handleConfirmCompleteRoundEdit = () => {
    if (editingCompleteRound === null) return;

    // Encontrar el ganador (el que tiene 0 puntos totales y no tiene cartas ni puntos directos)
    const winner = pendingPoints.find(point =>
      point.points === 0 && point.cards.length === 0 && (point.directPoints === 0 || !point.directPoints)
    );
    const playersWithoutPoints = pendingPoints.filter(point =>
      point.points === 0 && point.cards.length === 0 && (point.directPoints === 0 || !point.directPoints)
    );

    // Validar que exactamente un jugador sea ganador
    if (!winner || playersWithoutPoints.length !== 1) {
      showAlert({
        title: 'Error',
        message: 'Exactamente un jugador debe ser ganador (sin cartas ni puntos directos)',
        type: 'error',
        isOpen: true,
        onClose: () => {
          setShowPlayerModal(false);
        }
      });
      return;
    }

    // Usar la función editRound del hook para actualizar el estado
    editRound(editingCompleteRound, pendingPoints);
    updatePendingPoints([]);
    setEditingCompleteRound(null);
    setCurrentRoundId(null);
    setShowPlayerModal(false);
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
    currentRoundId,

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
    setShowPlayerModal,
    setCurrentRoundId
  };
}; 