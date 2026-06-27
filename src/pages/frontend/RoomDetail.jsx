import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ChevronLeft, Check, Calendar, ArrowRight } from 'lucide-react';

export default function RoomDetail() {
  const { id } = useParams();
  const { rooms, getAvailableAllotment } = useContext(AppContext);
  const navigate = useNavigate();
  
  const room = rooms.find(r => r.id === id);

  if (!room) {
    return (
      <div style={{ padding: '150px 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-dark)', marginBottom: '20px' }}>ไม่พบห้องพักที่ต้องการ</h2>
        <Link to="/rooms" className="btn btn-primary">กลับหน้าห้องพัก</Link>
      </div>
    );
  }

  return (
    <div className="room-detail-page" style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: '#fcfcfc', paddingBottom: '60px' }}>
      <section className="detail-section">
        <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <button onClick={() => navigate('/rooms')} style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--accent-red)', marginBottom: '30px', fontSize: '15px', fontWeight: 'bold' }}>
            <ChevronLeft size={16} style={{ marginRight: '4px' }} />
            ย้อนกลับไปหน้าห้องพัก
          </button>

          <div className="grid-1-2fr" style={{ gap: '50px' }}>
            {/* Gallery / Image Block */}
            <div>
              <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-premium)', marginBottom: '20px' }}>
                <img src={room.image} alt={room.nameTh} className="room-detail-img" />
              </div>
              <h1 style={{ color: 'var(--text-dark)', fontSize: '32px', marginBottom: '15px', fontFamily: 'Outfit' }}>{room.nameTh}</h1>
              <p style={{ color: 'var(--text-gray)', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>{room.desc}</p>
              
              <h3 style={{ color: 'var(--text-dark)', fontSize: '20px', marginBottom: '15px' }}>สิ่งอำนวยความสะดวกในห้องพัก</h3>
              <div className="amenities-grid-detail">
                {room.amenities.map((am, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)', fontSize: '15px' }}>
                    <Check size={16} color="var(--accent-red)" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Card Block */}
            <div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '35px', position: 'sticky', top: '120px', boxShadow: 'var(--shadow-premium)' }}>
                <span style={{ fontSize: '13px', color: 'var(--accent-red)', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>จองตรง ราคาดีที่สุด</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--text-dark)' }}>฿{room.price}</span>
                  <span style={{ color: 'var(--text-gray)', fontSize: '14px' }}>/ คืน</span>
                </div>
                
                <div style={{ background: 'var(--bg-card-light)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', marginBottom: '25px' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
                    <span>🕒</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-light)' }}>เช็คอินได้ตั้งแต่ 14:00 น. | เช็คเอาต์ก่อน 12:00 น.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span>🛏️</span>
                    <span style={{ fontSize: '13px', color: getAvailableAllotment(room.id) === 0 ? 'var(--accent-red)' : 'var(--text-light)', fontWeight: getAvailableAllotment(room.id) === 0 ? 'bold' : 'normal' }}>
                      ห้องว่างวันนี้: {getAvailableAllotment(room.id)} / {room.allotment} ห้อง
                    </span>
                  </div>
                </div>

                <Link to={`/booking?roomId=${room.id}`} className="btn btn-accent btn-block btn-large" style={{ marginBottom: '15px', width: '100%' }}>
                  <Calendar size={18} style={{ marginRight: '8px' }} />
                  <span>จองออนไลน์</span>
                </Link>
                
                <a href="tel:0887572195" className="btn btn-outline btn-block" style={{ justifyContent: 'center', width: '100%', border: '1px solid var(--border-color)' }}>
                  <span>โทรจอง: 088-757-2195</span>
                </a>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>* ยืนยันการจองด้วยการโอนชำระเงินมัดจำ / แนบหลักฐานสลิป</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
