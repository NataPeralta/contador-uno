export interface GameControlsProps {
  targetPoints: number;
  playerCount: number;
  hasPendingPoints: boolean;
  canUndo: boolean;
  devMode: boolean;
  onAddRound: () => void;
  onNewGame: () => void;
  onLoadExampleGame?: () => void;
  onResetGame?: () => void;
} 