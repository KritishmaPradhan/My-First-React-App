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

function AppContent() {
  const { bgColor } = useContext(ColorContext);

  return (
    <div className="App" style={{ backgroundColor: bgColor, minHeight: '100vh', transition: 'background-color 0.3s ease', paddingBottom: '100px' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/form" element={<Form />} />
      </Routes>
      <main style={{ padding: '20px' }}>
        <h1>Welcome to my App</h1>
        <p>This is the main content area.</p>
      </main>
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
