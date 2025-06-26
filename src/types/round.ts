import type { UnoCard } from './unoCard';

export interface Round {
  id: string;
  winnerId: string;
  points: PlayerPoints[];
  subtractedAmount?: number;
}

export interface PlayerPoints {
  playerId: string;
  roundId: string;
  points: number;
  cards: CardSelection[];
  directPoints?: number;
}

export interface CardSelection {
  card: UnoCard;
  quantity: number;
} 