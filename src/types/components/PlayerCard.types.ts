import type { Player } from '../player';

export interface PlayerCardProps {
  player: Player;
  onUpdateName: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  targetPoints: number;
} 