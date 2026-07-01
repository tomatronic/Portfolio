'use client';

import { useTheme } from './ThemeProvider';
import { useEffect } from 'react';

const COLORS = {
  light: '#ffffff',
  dark:  '#0F1623',
}

export default function PageBackground() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? COLORS.dark : COLORS.light;
  }, [theme]);

  return null;
}
