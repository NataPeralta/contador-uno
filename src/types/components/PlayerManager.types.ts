import type { Player } from '../player';

export interface PlayerManagerProps {
  players: Player[];
  pendingPoints: Array<{ playerId: string; points: number }>;
  onAddPlayer: (name: string) => void;
} 