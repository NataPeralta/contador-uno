import type { PlayerPoints } from './round';

export interface UseGameLogicProps {
  gameState: any;
  addRound: (winnerId: string, points: PlayerPoints[]) => void;
  editRound: (roundIndex: number, points: PlayerPoints[]) => void;
  getWinner: () => any;
}

export interface UseDevModeProps {
  gameState: any;
}
