import React from 'react';
import { MapPin, Navigation, Train, ShoppingBag, Eye } from 'lucide-react';

export default function Location() {
  const nearby = [
    { title: 'สถานีรถไฟชุมทางทุ่งสง', distance: '20 เมตร', info: 'เดินออกมาก้าวเดียวจากสถานีก็ถึงโรงแรม เหมาะอย่างยิ่งสำหรับผู้เดินทางด้วยรถไฟสายใต้', icon: <Train size={20} color="var(--accent-red)" /> },
    { title: 'ร้านสะดวกซื้อ (7-Eleven / CJ)', distance: '15 เมตร', info: 'มีของกินและเครื่องใช้จำหน่ายตลอด 24 ชั่วโมง อยู่เยื้องข้างโรงแรมเล็กน้อย', icon: <ShoppingBag size={20} color="var(--accent-red)" /> },
    { title: 'หลาดชุมทางทุ่งสง / ตลาดโต้รุ้ง', distance: '200 เมตร', info: 'แหล่งรวมอาหารคาวหวานและผักผลไม้สดท้องถิ่นรสชาติดีเลิศราคากันเอง', icon: <ShoppingBag size={20} color="var(--accent-red)" /> },
    { title: 'สถานีตำรวจภูธรทุ่งสง / ที่ทำการอำเภอ', distance: '500 เมตร', info: 'ใกล้พื้นที่ส่วนราชการอำเภอทุ่งสง ปลอดภัย ไร้กังวลเรื่องการรักษาความปลอดภัย', icon: <Navigation size={20} color="var(--accent-red)" /> },
    { title: 'โรงเรียนสตรีทุ่งสง / ธนาคารหลักต่างๆ', distance: '400 - 500 เมตร', info: 'ทำเลตั้งอยู่ในจุดเศรษฐกิจหลักและเขตการศึกษาของเมืองทุ่งสง', icon: <MapPin size={20} color="var(--accent-red)" /> }
  ];

  return (
    <div className="location-page" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <section className="location-section">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-subtitle">LOCATION & MAP</span>
            <h2 className="section-title">ที่ตั้งและสถานที่ใกล้เคียง</h2>
            <p className="section-desc">ตั้งอยู่ใจกลางเมืองทุ่งสง ชุมทางคมนาคมที่เชื่อมต่อแหล่งกิน แหล่งเที่ยว และจุดบริการสาธารณะครบครัน</p>
          </div>

          <div className="grid-1-1fr" style={{ marginBottom: '50px' }}>
            {/* Map Placeholder or direct iframe link */}
            <div>
              <div className="map-container-wrapper">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.568461715454!2d99.67389146132717!3d8.163202525492167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30537be6c7a36c5d%3A0xc3b381534b12dfbf!2z4LmC4Lij4LiH4LmB4Lij4LihIOC4quC4tOC5guC4mSDguJfguLjguYjguIc!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '12px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sino @ Thungsong Hotel Location Map"
                ></iframe>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <a href="https://maps.google.com/?q=Sino+@+Thungsong+Hotel" target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                  <Navigation size={16} style={{ marginRight: '6px' }} />
                  <span>นำทางใน Google Maps</span>
                </a>
              </div>
            </div>

            {/* Distance list */}
            <div>
              <h3 style={{ color: 'var(--text-dark)', fontSize: '20px', marginBottom: '20px' }}>สถานที่ใกล้เคียง (เดินทางสะดวก)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {nearby.map((loc, index) => (
                  <div style={{ display: 'flex', gap: '15px', background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }} key={index}>
                    <div style={{ marginTop: '3px' }}>{loc.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong style={{ color: 'var(--text-dark)', fontSize: '15px' }}>{loc.title}</strong>
                        <span style={{ color: 'var(--accent-red)', fontSize: '13px', fontWeight: 'bold' }}>{loc.distance}</span>
                      </div>
                      <p style={{ color: 'var(--text-gray)', fontSize: '13px', lineHeight: '1.4' }}>{loc.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
