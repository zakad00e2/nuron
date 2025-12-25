import React, { useState } from 'react';
import PhetSimulationEmbed from './PhetSimulationEmbed';

const SIMULATIONS = [
  { 
    id: 1, 
    title: 'بناء ذرة (Build an Atom)', 
    url: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html' 
  },
  { 
    id: 2, 
    title: 'أدوات بناء الدوائر (Circuit Construction Kit)', 
    url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html' 
  },
  { 
    id: 3, 
    title: 'أشكال الجزيئات (Molecule Shapes)', 
    url: 'https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_en.html' 
  }
];

const Flipbook = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSim = SIMULATIONS[currentIndex];

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, SIMULATIONS.length - 1));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '0 20px', direction: 'rtl' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50' }}>المختبر الافتراضي التفاعلي</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={prev} 
            disabled={currentIndex === 0}
            style={buttonStyle}
          >
            السابق
          </button>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            صفحة {currentIndex + 1} من {SIMULATIONS.length}
          </span>
          <button 
            onClick={next} 
            disabled={currentIndex === SIMULATIONS.length - 1}
            style={buttonStyle}
          >
            التالي
          </button>
        </div>
        <h3 style={{ color: '#34495e', marginTop: '15px' }}>{currentSim.title}</h3>
      </header>

      <PhetSimulationEmbed url={currentSim.url} title={currentSim.title} />

      <footer style={{ marginTop: '20px', textAlign: 'center', color: '#7f8c8d' }}>
        تطوير منصة المختبرات - جميع الحقوق محفوظة لـ autor.one و PhET
      </footer>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 25px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  opacity: (props) => props.disabled ? 0.5 : 1
};

export default Flipbook;