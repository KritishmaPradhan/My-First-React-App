import { createContext, useState } from 'react';

export const ColorContext = createContext();

export function ColorProvider({ children }) {
  const [bgColor, setBgColor] = useState('#030303');

  const colors = [
    { name: 'White', value: '#0d0d0d' },
    { name: 'Light Blue', value: '#1a1a1a' },
    { name: 'Light Red', value: '#0d1b2a' },
    { name: 'Light Green', value: '#1f2937' },
    { name: 'Light Pink', value: '#2d1b4e' },
    { name: 'Light Yellow', value: '#0f0f1e' },
    { name: 'Light Purple', value: '#2a2a3e' },
  ];

  return (
    <ColorContext.Provider value={{ bgColor, setBgColor, colors }}>
      {children}
    </ColorContext.Provider>
  );
}
