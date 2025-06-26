import type { Player } from './player';

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
  history: GameState[];
}

export type TargetPoints = 300 | 400 | 500 | 600 | 700; 