import { createContext, useState } from 'react';
import bg1 from '../assets/bg1.avif';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
export const ColorContext = createContext();

const darkGradient = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

export function ColorProvider({ children }) {
  const [bg, setBg] = useState(darkGradient);

const themes = [
  { name: 'Yellow Theme', value: bg1},
  { name: 'Purple Theme', value: bg2},
  { name: 'Green Theme', value: bg3},
];

  return (
    <ColorContext.Provider value={{ bg, setBg, themes }}>
      {children}
    </ColorContext.Provider>
  );
}
