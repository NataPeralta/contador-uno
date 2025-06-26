import type { UnoCard } from '../types';

export const UNO_CARDS: UnoCard[] = [
  // Números (0-9) - 0-9 puntos
  { id: '0', name: '0 Card Uno', value: 0, image: 'images/uno/0.webp' },
  { id: '1', name: '1 Card Uno', value: 1, image: 'images/uno/1.webp' },
  { id: '2', name: '2 Card Uno', value: 2, image: 'images/uno/2.webp' },
  { id: '3', name: '3 Card Uno', value: 3, image: 'images/uno/3.webp' },
  { id: '4', name: '4 Card Uno', value: 4, image: 'images/uno/4.webp' },
  { id: '5', name: '5 Card Uno', value: 5, image: 'images/uno/5.webp' },
  { id: '6', name: '6 Card Uno', value: 6, image: 'images/uno/6.webp' },
  { id: '7', name: '7 Card Uno', value: 7, image: 'images/uno/7.webp' },
  { id: '8', name: '8 Card Uno', value: 8, image: 'images/uno/8.webp' },
  { id: '9', name: '9 Card Uno', value: 9, image: 'images/uno/9.webp' },
  // Especiales
  { id: 'skip', name: 'Skip Card Uno', value: 20, image: 'images/uno/skip.webp' },
  { id: 'reverse', name: 'Reverse Card Uno', value: 20, image: 'images/uno/swap.webp' },
  { id: 'draw2', name: 'Draw Two Card Uno', value: 20, image: 'images/uno/take2.webp' },
  // Power
  { id: 'wild', name: 'Wild Card Uno', value: 50, image: 'images/uno/colors.webp' },
  { id: 'wild4', name: 'Wild Draw Four Card Uno', value: 50, image: 'images/uno/take4.webp' },
];
