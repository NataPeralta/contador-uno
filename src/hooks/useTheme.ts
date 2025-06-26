import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = (initialTheme: Theme = 'system') => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateResolvedTheme = () => {
      let newResolvedTheme: 'light' | 'dark';

      if (theme === 'system') {
        newResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        newResolvedTheme = theme;
      }

      console.log('updateResolvedTheme - theme:', theme, 'newResolvedTheme:', newResolvedTheme);
      setResolvedTheme(newResolvedTheme);

      // Aplicar tema al documento inmediatamente
      const root = document.documentElement;
      if (newResolvedTheme === 'dark') {
        root.classList.add('dark');
        console.log('Added dark class to document');
      } else {
        root.classList.remove('dark');
        console.log('Removed dark class from document');
      }
    };

    updateResolvedTheme();

    // Escuchar cambios en la preferencia del sistema
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateResolvedTheme();

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    console.log('changeTheme called with:', newTheme);
    setTheme(newTheme);
  };

  return {
    theme,
    resolvedTheme,
    changeTheme
  };
}; 