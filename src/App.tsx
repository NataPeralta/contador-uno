import { useState, useEffect } from 'react';
import { 
  useGameState, 
  useTheme, 
  useGameLogic, 
  useDevMode 
} from './hooks';
import { 
  Header, 
  GameControls, 
  PlayerManager, 
  PlayerGrid, 
  LoadingSpinner, 
  CardsModal, 
  PlayerSelectionModal, 
  SettingsModal 
} from './components';

function App() {
  const {
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
    editRound
  } = useGameState();

  const { resolvedTheme, changeTheme } = useTheme(gameState.settings.theme);

  const {
    showCardsModal,
    showPlayerModal,
    pendingPoints,
    editingCompleteRound,
    hasPendingPoints,
    handleAddRound,
    handlePlayerSelect,
    handleCardsConfirm,
    handleCardsBack,
    handleEditPendingPoints,
    handleConfirmRound,
    handleEditCompleteRound,
    handleConfirmCompleteRoundEdit,
    getInitialSelectionsForPlayer,
    setShowCardsModal,
    setShowPlayerModal,
    editingPlayerId
  } = useGameLogic({ gameState, addRound, editRound, getWinner });

  const { devMode, handleLoadExampleGame, handleResetGame } = useDevMode({ gameState });

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Sincronizar tema con configuración
  useEffect(() => {
    changeTheme(gameState.settings.theme);
  }, [gameState.settings.theme, changeTheme]);

  const handleThemeToggle = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: newTheme });
  };

  const handleNewGame = () => {
    // Crear 4 jugadores por defecto si no hay jugadores
    if (gameState.players.length === 0) {
      const defaultPlayers = [
        { name: 'Jugador 1' },
        { name: 'Jugador 2' },
        { name: 'Jugador 3' },
        { name: 'Jugador 4' }
      ];
      
      defaultPlayers.forEach(player => {
        addPlayer(player.name);
      });
    } else {
      // Si ya hay jugadores, solo reiniciar puntuaciones
      newGame();
    }
  };

  const canRemovePlayer = (gameState.players?.length ?? 0) > 2;

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <Header
        resolvedTheme={resolvedTheme}
        onThemeToggle={handleThemeToggle}
        onOpenSettings={() => setShowSettingsModal(true)}
      />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controles del juego */}
        <GameControls
          targetPoints={gameState.settings.targetPoints}
          playerCount={gameState.players?.length ?? 0}
          hasPendingPoints={hasPendingPoints}
          canUndo={gameState.history.length > 0}
          devMode={devMode}
          onAddRound={handleAddRound}
          onUndoLastRound={undoLastRound}
          onNewGame={handleNewGame}
          onLoadExampleGame={handleLoadExampleGame}
          onResetGame={handleResetGame}
        />

        {/* Gestión de jugadores */}
        <PlayerManager
          players={gameState.players ?? []}
          pendingPoints={pendingPoints}
          onAddPlayer={addPlayer}
        />

        {/* Grid de jugadores */}
        {(gameState.players?.length ?? 0) > 0 && (
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <PlayerGrid
                players={gameState.players}
                targetPoints={gameState.settings.targetPoints}
                onUpdatePlayerName={updatePlayerName}
                onRemovePlayer={removePlayer}
                canRemovePlayer={canRemovePlayer}
                onEditCompleteRound={handleEditCompleteRound}
              />
            </div>
          </div>
        )}
      </main>

      {/* Modales */}
      <PlayerSelectionModal
        isOpen={showPlayerModal}
        onClose={() => setShowPlayerModal(false)}
        players={gameState.players ?? []}
        onSelectPlayer={handlePlayerSelect}
        pendingPoints={pendingPoints}
        onConfirmRound={editingCompleteRound !== null ? handleConfirmCompleteRoundEdit : handleConfirmRound}
        hasPendingPoints={hasPendingPoints}
        onEditPendingPoints={handleEditPendingPoints}
        title={editingCompleteRound !== null ? `Editar Ronda ${editingCompleteRound + 1}` : undefined}
        settings={gameState.settings}
      />

      <CardsModal
        isOpen={showCardsModal}
        onClose={() => setShowCardsModal(false)}
        onConfirm={handleCardsConfirm}
        onBack={handleCardsBack}
        initialSelections={editingPlayerId ? getInitialSelectionsForPlayer(editingPlayerId)?.cards || [] : []}
        initialDirectPoints={editingPlayerId ? getInitialSelectionsForPlayer(editingPlayerId)?.directPoints || 0 : 0}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        settings={gameState.settings}
        onUpdateSettings={updateSettings}
      />
    </div>
  );
}

export default App;

