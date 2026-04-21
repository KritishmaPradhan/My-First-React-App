import { useContext } from 'react';
import { ColorContext } from '../context/ColorContext';
import './ThemeButtons.css';

const ThemeButtons = () => {
  const { bgColor, setBgColor, colors } = useContext(ColorContext);

  return (
    <div className="theme-buttons-container">
      <div className="theme-buttons">
        {colors.map((color) => (
          <button
            key={color.value}
            className={`theme-btn ${bgColor === color.value ? 'active' : ''}`}
            style={{ backgroundColor: color.value }}
            onClick={() => setBgColor(color.value)}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeButtons;
