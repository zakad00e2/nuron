import React from 'react';

const PhetSimulationEmbed = ({ url, title }) => {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '600px', 
      border: '2px solid #2c3e50', 
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#f9f9f9'
    }}>
      
      {/* طبقة الشعار (Overlay) */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '15px',
        zIndex: 10,
        pointerEvents: 'none', // يسمح بالنقر على ما تحته
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // خلفية خفيفة للشعار
        padding: '5px 10px',
        borderRadius: '5px'
      }}>
        {/* استبدل الرابط أدناه برابط شعار autor.one الخاص بك */}
        <span style={{ fontWeight: 'bold', color: 'black', fontSize: '14px' }}>
          autor.one
        </span>
      </div>

      <iframe 
        src={url} 
        title={title} 
        width="100%" 
        height="100%" 
        allowFullScreen 
        style={{ border: 'none' }} 
      >
        <p>متصفحك لا يدعم الإطارات المضمنة.</p>
      </iframe>
    </div>
  );
};

export default PhetSimulationEmbed;