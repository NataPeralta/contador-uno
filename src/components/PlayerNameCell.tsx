import React, { useState } from 'react';
import DeleteIcon from '../assets/DeleteIcon';

export interface PlayerNameCellProps {
  player: any;
  onUpdateName: (playerId: string, name: string) => void;
  onRemove: (playerId: string) => void;
  canRemove: boolean;
  isWinner: boolean;
}

export const PlayerNameCell: React.FC<PlayerNameCellProps> = ({ 
  player, 
  onUpdateName, 
  onRemove, 
  canRemove, 
  isWinner 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);

  const handleNameSubmit = () => {
    if (editName.trim()) {
      onUpdateName(player.id, editName.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setEditName(player.name);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={handleKeyPress}
            className="w-full text-lg font-bold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-2 py-1 shadow-sm transition-all"
            autoFocus
          />
        ) : (
          <span
            className={`text-lg font-bold cursor-pointer hover:text-uno-blue dark:hover:text-uno-blue-light transition-colors px-2 py-1 rounded ${
              isWinner
                ? 'text-uno-green dark:text-uno-green-light'
                : 'text-gray-900 dark:text-gray-100'
            }`}
            onClick={() => setIsEditing(true)}
          >
            {player.name}
          </span>
        )}
      </div>
      {canRemove && !isEditing && (
        <button
          onClick={() => onRemove(player.id)}
          className="text-gray-500 dark:text-gray-400 hover:text-uno-red dark:hover:text-uno-red-light transition-colors p-1 rounded"
          title="Eliminar jugador"
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
}; 