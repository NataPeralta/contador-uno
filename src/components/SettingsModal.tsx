import React from 'react';
import { Modal } from './Modal';
import type { GameSettings, TargetPoints } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (settings: Partial<GameSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  const targetPointsOptions: TargetPoints[] = [300, 400, 500, 600, 700];
  const themeOptions = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' },
    { value: 'system', label: 'Sistema' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configuración" size="lg">
      <div className="space-y-6">
        {/* Puntos objetivo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Puntos objetivo para ganar
          </label>
          <select
            value={settings.targetPoints}
            onChange={(e) => onUpdateSettings({ targetPoints: Number(e.target.value) as TargetPoints })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-uno-blue focus:border-transparent"
          >
            {targetPointsOptions.map(points => (
              <option key={points} value={points}>
                {points} puntos
              </option>
            ))}
          </select>
        </div>

        {/* Tema */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tema de la aplicación
          </label>
          <select
            value={settings.theme}
            onChange={(e) => onUpdateSettings({ theme: e.target.value as 'light' | 'dark' | 'system' })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-uno-blue focus:border-transparent"
          >
            {themeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Resta al ganador */}
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!settings.winnerSubtractsPoints}
              onChange={e => onUpdateSettings({ winnerSubtractsPoints: e.target.checked })}
              className="rounded border-gray-300 text-uno-blue focus:ring-uno-blue"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              El ganador puede restar puntos
            </span>
          </label>
          
          {settings.winnerSubtractsPoints && (
            <div className="ml-4 space-y-3">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={settings.winnerSubtractType === 'fixed'}
                    onChange={() => onUpdateSettings({ winnerSubtractType: 'fixed' })}
                    className="text-uno-blue focus:ring-uno-blue"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Valor fijo</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={settings.winnerSubtractType === 'percent'}
                    onChange={() => onUpdateSettings({ winnerSubtractType: 'percent' })}
                    className="text-uno-blue focus:ring-uno-blue"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Porcentaje</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={settings.winnerSubtractValue ?? ''}
                  onChange={e => onUpdateSettings({ winnerSubtractValue: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-uno-blue focus:border-transparent"
                  placeholder={settings.winnerSubtractType === 'percent' ? 'Porcentaje (%)' : 'Valor fijo'}
                />
                {settings.winnerSubtractType === 'percent' && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">%</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Puntaje inicial para nuevos jugadores */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Puntaje inicial para jugadores nuevos
          </label>
          <select
            value={settings.newPlayerInitialScore ?? 'zero'}
            onChange={e => onUpdateSettings({ newPlayerInitialScore: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-uno-blue focus:border-transparent"
          >
            <option value="zero">0</option>
            <option value="min">Mínimo de otros jugadores</option>
            <option value="max">Máximo de otros jugadores</option>
          </select>
        </div>

        {/* Información */}
        <div className="bg-uno-blue bg-opacity-10 dark:bg-uno-blue dark:bg-opacity-20 border border-uno-blue border-opacity-30 dark:border-uno-blue dark:border-opacity-50 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-uno-blue dark:text-uno-blue-light" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-uno-blue dark:text-uno-blue-light">
                Información
              </h3>
              <div className="mt-2 text-sm text-uno-blue dark:text-uno-blue-light opacity-80">
                <p>• Los puntos objetivo determinan cuándo un jugador gana la partida.</p>
                <p>• El tema se aplica automáticamente a toda la aplicación.</p>
                <p>• Los cambios se guardan automáticamente.</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-uno-blue text-white hover:bg-uno-blue-dark focus:ring-uno-blue"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}; 
