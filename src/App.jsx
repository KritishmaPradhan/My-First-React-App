// src/App.jsx
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThemeButtons from './components/ThemeButtons';
import { ColorContext, ColorProvider } from './context/ColorContext';
import About from './Pages/about';    
import Contact from './Pages/contact';
import Form from './Pages/form';
import AISakura from './Pages/AISakura';
import AITaroDetects from './Pages/AITaroDetects';
import favicon from './assets/favicon.svg';

const styles = {
  app: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    transition: 'background 0.3s ease',
    paddingBottom: '100px',
  },
  homeContainer: {
    padding: '60px 20px',
    maxWidth: '1100px',
    margin: '0 auto',
    color: '#ffffff',
  },
  homeTitle: {
    fontSize: 'clamp(2rem, 8vw, 3.5rem)',
    marginBottom: '30px',
    textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    fontWeight: '700',
  },
  homeContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 'clamp(20px, 5vw, 40px)',
    borderRadius: '16px',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  homeParagraph: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    marginBottom: '30px',
    opacity: '0.95',
  },
  homeSubtitle: {
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: '600',
  },
  featuresList: {
    fontSize: '1.05rem',
    lineHeight: '2.2',
    marginLeft: '20px',
    marginBottom: '30px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    columnGap: '40px',
    listStyle: 'none',
    padding: '0',
  },
  featureItem: {
    padding: '10px 0',
  },
};

function AppContent() {
  const { bg } = useContext(ColorContext);

  return (
    <div className="App" style={{
      ...styles.app,
      backgroundImage: `linear-gradient(rgba(59, 2, 44, 0.86), rgba(0, 0, 0, 0.24)), url(${bg.value})`
    }}>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div style={styles.homeContainer}>
            <h1 style={styles.homeTitle}>Welcome to Our App</h1>
            <div style={styles.homeContent}>
              <p style={styles.homeParagraph}>
                Experience modern web development with our cutting-edge React application built with Vite for blazing-fast performance.
              </p>
              <h2 style={styles.homeSubtitle}>✨ Features</h2>
              <ul style={styles.featuresList}>
                <li style={styles.featureItem}>⚡ Lightning-fast performance</li>
                <li style={styles.featureItem}>🎨 Beautiful dark theme</li>
                <li style={styles.featureItem}>🎭 Dynamic theme switcher</li>
                <li style={styles.featureItem}>📱 Fully responsive</li>
                <li style={styles.featureItem}>🔧 Easy to customize</li>
                <li style={styles.featureItem}>✅ Modern UI/UX</li>
              </ul>
              <p style={styles.homeParagraph}>
                Explore our app using the navigation menu to discover more features and get in touch with us!
              </p>
            </div>
          </div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/form" element={<Form />} />
        <Route path="/aisakura" element={<AISakura />} />
        <Route path="/aitaro" element={<AITaroDetects />} />
      </Routes>
      <img src={favicon} className="App-logo" alt="logo" />
      <ThemeButtons />
    </div>
  );
}

function App() {
  return (
    <ColorProvider>
      <AppContent />
    </ColorProvider>
  );
}

export default App;
