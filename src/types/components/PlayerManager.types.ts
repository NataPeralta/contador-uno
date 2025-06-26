import type { Player } from '../player';

export interface PlayerManagerProps {
  players: Player[];
  pendingPoints: Array<{ playerId: string; points: number }>;
  currentRoundId: string | null;
  editingCompleteRound: number | null;
  onAddPlayer: (name: string) => void;
} 