import type { Player } from '../player';
import type { PlayerPoints } from '../round';
import type { GameSettings } from '../game';

export interface PlayerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  onSelectPlayer: (playerId: string) => void;
  pendingPoints?: PlayerPoints[];
  onConfirmRound?: () => void;
  hasPendingPoints?: boolean;
  onEditPendingPoints?: (playerId: string) => void;
  title?: string;
  settings?: GameSettings;
  currentRound?: string | undefined;
} 