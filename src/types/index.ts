export interface Player {
  id: string;
  name: string;
  points: number;
  rounds: Round[];
}

export interface Round {
  id: string;
  winnerId: string;
  points: PlayerPoints[];
  timestamp: number;
}

export interface PlayerPoints {
  playerId: string;
  points: number;
  cards: CardSelection[];
  directPoints?: number;
}

export interface CardSelection {
  card: UnoCard;
  quantity: number;
}

export interface UnoCard {
  id: string;
  name: string;
  value: number;
  image?: string;
}

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