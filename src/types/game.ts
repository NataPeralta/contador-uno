import type { Player } from './player';
import type { PlayerPoints } from './round';

export interface GameSettings {
  targetPoints: number;
  theme: 'light' | 'dark' | 'system';
  winnerSubtractsPoints?: boolean;
  winnerSubtractType?: 'fixed' | 'percent';
  winnerSubtractValue?: number;
  newPlayerInitialScore?: 'zero' | 'min' | 'max';
}

export interface GameState {
  players: Player[];
  settings: GameSettings;
  pendingPoints: PlayerPoints[];
  currentRoundId: string | null;
}

export type TargetPoints = 300 | 400 | 500 | 600 | 700; 