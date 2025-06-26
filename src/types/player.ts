import type { Round } from './round';

export interface Player {
  id: string;
  name: string;
  points: number;
  rounds: Round[];
} 