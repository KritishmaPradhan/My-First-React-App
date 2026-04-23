import { useContext } from 'react';
import { ColorContext } from '../context/ColorContext';
import './ThemeButtons.css';

const ThemeButtons = () => {
  const { bg, setBg, themes } = useContext(ColorContext);

  return (
    <div className="theme-buttons-container">
      <div className="theme-buttons">
        {themes.map((theme) => (
          <button
            key={theme.name}
            style={{
              backgroundImage: `url(${theme.value})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className={`theme-btn ${bg.value === theme.value ? 'active' : ''}`}
            onClick={() => setBg(theme)}
            title={theme.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeButtons;