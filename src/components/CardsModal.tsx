import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import type { UnoCard, CardSelection } from '../types';
import { UNO_CARDS } from '../data/unoCards';

interface CardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selections: CardSelection[], directPoints: number) => void;
  onBack?: () => void;
  initialSelections?: CardSelection[];
  initialDirectPoints?: number;
}

const MAX_CARDS_PER_TYPE = 4;

export const CardsModal: React.FC<CardsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onBack,
  initialSelections = [],
  initialDirectPoints = 0
}) => {
  const [selectedCards, setSelectedCards] = useState<Map<string, number>>(new Map());
  const [directPoints, setDirectPoints] = useState<string>(initialDirectPoints > 0 ? initialDirectPoints.toString() : '');

  // Inicializar con las selecciones previas si existen
  React.useEffect(() => {
    
    if (initialSelections.length > 0) {
      const newMap = new Map();
      initialSelections.forEach(selection => {
        newMap.set(selection.card.id, selection.quantity);
      });
      setSelectedCards(newMap);
    } else {
      setSelectedCards(new Map());
    }
    setDirectPoints(initialDirectPoints > 0 ? initialDirectPoints.toString() : '');
  }, [initialSelections, initialDirectPoints, isOpen]);

  const totalPoints = useMemo(() => {
    let total = directPoints ? Number(directPoints) || 0 : 0;
    selectedCards.forEach((quantity, cardId) => {
      const card = UNO_CARDS.find(c => c.id === cardId);
      if (card) {
        total += card.value * quantity;
      }
    });
    return total;
  }, [selectedCards, directPoints]);

  const handleCardClick = (card: UnoCard, isRightClick: boolean = false) => {
    setSelectedCards(prev => {
      const newMap = new Map(prev);
      const currentQuantity = newMap.get(card.id) || 0;
      
      if (isRightClick) {
        // Clic derecho: remover (siempre funciona)
        if (currentQuantity > 0) {
          if (currentQuantity === 1) {
            newMap.delete(card.id);
          } else {
            newMap.set(card.id, currentQuantity - 1);
          }
        }
      } else {
        // Clic izquierdo: agregar (con límite de 4)
        if (currentQuantity < MAX_CARDS_PER_TYPE) {
          newMap.set(card.id, currentQuantity + 1);
        }
      }
      
      return newMap;
    });
  };

  const handleConfirm = () => {
    const selections: CardSelection[] = [];
    selectedCards.forEach((quantity, cardId) => {
      const card = UNO_CARDS.find(c => c.id === cardId);
      if (card) {
        selections.push({ card, quantity });
      }
    });
    
    onConfirm(selections, directPoints ? Number(directPoints) || 0 : 0);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      onClose();
    }
  };

  // Nueva lógica para habilitar el botón de confirmar:
  const canConfirm = true; // Permitir siempre, el backend/flujo validará el ganador

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleBack} 
      title="Seleccionar Cartas" 
      size="xl"
      footer={
        <div className="p-6">
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 flex-1"
            >
              Atrás
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-uno-blue text-white hover:bg-uno-blue-dark focus:ring-uno-blue flex-1"
              disabled={!canConfirm}
            >
              Confirmar ({totalPoints} puntos)
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header con puntos totales */}
        <div className="p-4 bg-uno-blue bg-opacity-10 dark:bg-uno-blue dark:bg-opacity-20 rounded-lg border border-uno-blue border-opacity-30 dark:border-uno-blue dark:border-opacity-50">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Puntos Totales:
            </span>
            <span className="text-2xl font-bold text-uno-blue dark:text-uno-blue-light">
              {totalPoints}
            </span>
          </div>
        </div>

        {/* Puntos directos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Puntos adicionales (opcional)
          </label>
          <input
            type="number"
            min="0"
            value={directPoints}
            onChange={(e) => setDirectPoints(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-uno-blue focus:border-transparent"
            placeholder="0"
          />
        </div>

        {/* Cartas por color */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
            Selecciona las cartas (clic izquierdo para agregar, derecho para quitar)
          </h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-4 justify-items-center">  
            {UNO_CARDS.map(card => {
              const selectedQuantity = selectedCards.get(card.id) || 0;
              const isMaxReached = selectedQuantity >= MAX_CARDS_PER_TYPE;
              const canAdd = selectedQuantity < MAX_CARDS_PER_TYPE;
              
              return (
                <div 
                  key={card.id} 
                  className={`relative cursor-pointer transform transition-transform ${
                    !canAdd 
                      ? 'opacity-50' 
                      : 'hover:scale-105'
                  }`}
                  onClick={() => canAdd && handleCardClick(card)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    // Clic derecho siempre funciona para quitar
                    handleCardClick(card, true);
                  }}
                >
                  <img 
                    src={card.image} 
                    alt={card.name} 
                    className="max-w-20 max-h-20 object-cover rounded-lg shadow-md" 
                  />
                  {/* Círculo con cantidad seleccionada */}
                  {selectedQuantity > 0 && (
                    <div className={`absolute -top-2 -right-2 w-6 h-6 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${
                      isMaxReached ? 'bg-uno-red-dark' : 'bg-uno-red'
                    }`}>
                      {selectedQuantity}
                    </div>
                  )}
                  {/* Indicador de límite alcanzado */}
                  {isMaxReached && (
                    <div className="absolute inset-0 bg-uno-red bg-opacity-20 rounded-lg flex items-center justify-center">
                      <span className="text-uno-red font-bold text-xs">MÁX</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}; 