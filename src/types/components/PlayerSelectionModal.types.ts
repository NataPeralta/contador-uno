import type { Player } from '../player';
import type { PlayerPoints } from '../round';

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
} 