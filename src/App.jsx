// src/App.jsx
// here we write our UI code this is then exported to main.jsx and rendered to the DOM
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThemeButtons from './components/ThemeButtons';
import { ColorContext, ColorProvider } from './context/ColorContext';
import About from './Pages/about';    
import Contact from './Pages/contact';
import Form from './Pages/form';
import AISakura from './Pages/AISakura';
import favicon from './assets/favicon.svg';

function AppContent() {
  const { bg } = useContext(ColorContext);

  return (
    <div className="App" style={{ backgroundImage: `linear-gradient(rgba(100, 96, 96, 0.4), rgba(0,0,0,0.4)), url(${bg.value})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                                  minHeight: '100vh',
                                  transition: 'background 0.3s ease',
                                  paddingBottom: '100px',}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1> } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/form" element={<Form />} />
        <Route path="/aisakura" element={<AISakura />} />
      </Routes>
      <img src = {favicon} className = "App-logo" alt="logo" />
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
