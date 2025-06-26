import type { PlayerPoints } from './round';
import type { GameState } from './game';
import type { Player } from './player';
import type { AlertProps } from './components/Alert.types';

export interface UseGameLogicProps {
  gameState: GameState;
  addRound: (winnerId: string, playerPoints: PlayerPoints[]) => void;
  editRound: (roundIndex: number, updatedPoints: PlayerPoints[]) => void;
  getWinner: () => Player | undefined;
  updatePendingPoints: (pendingPoints: PlayerPoints[]) => void;
  clearPendingPoints: () => void;
  showAlert: (alert: AlertProps) => void;
  setCurrentRoundId: (roundId: string | null) => void;
}

export interface UseDevModeProps {
  gameState: GameState;
}
