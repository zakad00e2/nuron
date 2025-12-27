import React, { useState } from 'react';
import Image from 'next/image';
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
  },
  { 
    id: 4, 
    title: 'وثيقة PDF (CV)', 
    url: '/cv.pdf',
    type: 'pdf'
  }
];

const Flipbook = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = SIMULATIONS.length + 1; // +1 for cover page

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const isCover = currentIndex === 0;
  const currentSim = !isCover ? SIMULATIONS[currentIndex - 1] : null;

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '0 20px', direction: 'rtl' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50' }}>المختبر الافتراضي التفاعلي</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={prev} 
            disabled={currentIndex === 0}
            style={{...buttonStyle, opacity: currentIndex === 0 ? 0.5 : 1}}
          >
            السابق
          </button>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            صفحة {currentIndex + 1} من {totalPages}
          </span>
          <button 
            onClick={next} 
            disabled={currentIndex === totalPages - 1}
            style={{...buttonStyle, opacity: currentIndex === totalPages - 1 ? 0.5 : 1}}
          >
            التالي
          </button>
        </div>
        <h3 style={{ color: '#34495e', marginTop: '15px' }}>
          {isCover ? 'مرحباً بكم في المختبر الافتراضي' : currentSim.title}
        </h3>
      </header>

      {isCover ? (
        <div className="simulation-cover-bg" style={{ textAlign: 'center', padding: '40px', borderRadius: '15px' }}>
            <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '20px' }}>
                <Image 
                    src="/images/bg/bg-image-1.jpg" 
                    alt="Introductory Cover" 
                    fill
                    style={{ borderRadius: '10px', objectFit: 'cover' }} 
                    priority
                />
            </div>
            <h2 style={{ color: 'var(--color-heading)', marginBottom: '10px' }}>استكشف وتعلم</h2>
            <p style={{ fontSize: '18px', color: 'var(--color-body)', maxWidth: '600px', margin: '0 auto' }}>
                مجموعة من المحاكاة التفاعلية للعلوم والرياضيات. ابدأ رحلتك التعليمية الآن بالضغط على "التالي".
            </p>
        </div>
      ) : (currentSim.type === 'pdf' || (currentSim.url && currentSim.url.endsWith('.pdf'))) ? (
        <iframe 
            src={currentSim.url} 
            width="100%" 
            height="500px" 
            style={{ border: 'none', borderRadius: '8px' }}
            title={currentSim.title}
        />
      ) : (
        <PhetSimulationEmbed url={currentSim.url} title={currentSim.title} />
      )}

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
  transition: 'opacity 0.3s'
};

export default Flipbook;