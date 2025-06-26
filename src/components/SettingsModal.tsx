import React from 'react';
import { Modal } from './Modal';
import type { TargetPoints, SettingsModalProps } from '../types';
import InfoIcon from '../assets/InfoIcon';
import { Button } from './Button';
import { Input } from './Input';


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
            <Input
              type="checkbox"
              checked={!!settings.winnerSubtractsPoints}
              onChange={e => onUpdateSettings({ winnerSubtractsPoints: e.target.checked })}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              El ganador puede restar puntos
            </span>
          </label>
          
          {settings.winnerSubtractsPoints && (
            <div className="ml-4 space-y-3">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <Input
                    type="radio"
                    checked={settings.winnerSubtractType === 'fixed'}
                    onChange={() => onUpdateSettings({ winnerSubtractType: 'fixed' })}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Valor fijo</span>
                </label>
                <label className="flex items-center gap-2">
                  <Input
                    type="radio"
                    checked={settings.winnerSubtractType === 'percent'}
                    onChange={() => onUpdateSettings({ winnerSubtractType: 'percent' })}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Porcentaje</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number" 
                  value={settings.winnerSubtractValue ?? ''}
                  onChange={e => onUpdateSettings({ winnerSubtractValue: Number(e.target.value) })}
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
             <InfoIcon />
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

        <Button
          onClick={onClose}
          variant="blue"
          aria-label="Cerrar"
        >
          Cerrar
        </Button>
      </div>
    </Modal>
  );
}; 
