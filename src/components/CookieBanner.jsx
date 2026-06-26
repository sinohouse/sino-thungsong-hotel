import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('sino_cookies_accepted');
    if (!accepted) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('sino_cookies_accepted', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div id="cookieBanner" className="cookie-banner" style={{ display: 'block' }}>
      <div className="cookie-content">
        <p>เว็บไซต์นี้ใช้คุกกี้เพื่อวิเคราะห์ปริมาณการเข้าใช้งานและมอบประสบการณ์การใช้งานที่ดียิ่งขึ้นแก่คุณ การใช้งานเว็บไซต์นี้ต่อไปถือว่าคุณยอมรับเงื่อนไขการใช้งานคุกกี้ของเรา</p>
        <button onClick={handleAccept} className="btn btn-sm btn-accent">ยอมรับ</button>
      </div>
    </div>
  );
}
