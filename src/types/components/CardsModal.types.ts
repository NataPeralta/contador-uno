import type { CardSelection } from '../round';

export interface CardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selections: CardSelection[], directPoints: number) => void;
  onBack?: () => void;
  initialSelections?: CardSelection[];
  initialDirectPoints?: number;
} 