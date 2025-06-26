import type { Player } from '../player';

export interface PlayerGridProps {
  players: Player[];
  targetPoints: number;
  onUpdatePlayerName: (id: string, name: string) => void;
  onRemovePlayer: (id: string) => void;
  canRemovePlayer: boolean;
  onEditCompleteRound: (roundIndex: number) => void;
}

export interface PlayerNameCellProps {
  player: Player;
  onUpdateName: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  isWinner: boolean;
} 