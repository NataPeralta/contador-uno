import type { UnoCard } from './unoCard';

export interface Round {
  id: string;
  winnerId: string;
  points: PlayerPoints[];
  timestamp: number;
  subtractedAmount?: number;
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