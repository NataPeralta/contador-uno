import React from 'react';
import SunIcon from '../assets/SunIcon';
import MoonIcon from '../assets/MoonIcon';
import SettingsIcon from '../assets/SettingsIcon';
import type { HeaderProps } from '../types';

export const Header: React.FC<HeaderProps> = ({
  resolvedTheme,
  onThemeToggle,
  onOpenSettings
}) => {
  return (
    <header className="bg-uno-red-dark shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center h-12 sm:h-14 md:h-16">
            <img
              src="/logo.png"
              alt="UNO"
              className="h-10 sm:h-12 md:h-14 max-w-[120px] w-auto object-contain"
              style={{ minHeight: 32 }}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Toggle de tema */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg bg-uno-yellow hover:bg-uno-yellow-dark transition-colors"
              title="Cambiar tema"
            >
              {resolvedTheme === 'dark' ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
            </button>

            {/* Configuración */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-uno-yellow hover:bg-uno-yellow-dark transition-colors"
              title="Configuración"
            >
              <SettingsIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}; 