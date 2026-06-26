import React from 'react';
import { Phone } from 'lucide-react';

export default function FloatingContact() {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: '30px', 
        right: '30px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px', 
        zIndex: 9999 
      }}
    >
      {/* LINE Button */}
      <a 
        href="https://lin.ee/naPWWid" 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ 
          width: '54px', 
          height: '54px', 
          borderRadius: '50%', 
          backgroundColor: '#06c755', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          boxShadow: '0 4px 15px rgba(6, 199, 85, 0.4)', 
          color: '#ffffff', 
          textDecoration: 'none',
          transition: 'all 0.3s ease', 
          cursor: 'pointer' 
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; }}
        title="คุยไลน์กับเรา"
      >
        {/* LINE Icon representation */}
        <span style={{ fontWeight: 'bold', fontSize: '12px', fontFamily: 'Outfit, sans-serif' }}>LINE</span>
      </a>

      {/* Call Button */}
      <a 
        href="tel:0887572195" 
        style={{ 
          width: '54px', 
          height: '54px', 
          borderRadius: '50%', 
          backgroundColor: 'var(--accent-red)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          boxShadow: '0 4px 15px rgba(217, 43, 43, 0.4)', 
          color: '#ffffff', 
          textDecoration: 'none',
          transition: 'all 0.3s ease', 
          cursor: 'pointer' 
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; }}
        title="โทรจองด่วน"
      >
        <Phone size={22} fill="#ffffff" color="none" />
      </a>
    </div>
  );
}
