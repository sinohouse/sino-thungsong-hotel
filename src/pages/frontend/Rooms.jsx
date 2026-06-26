import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Gift, CheckCircle } from 'lucide-react';

export default function Rooms() {
  const { rooms, promotions, getAvailableAllotment } = useContext(AppContext);

  return (
    <div className="rooms-page" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <section className="rooms-section">
        <div className="section-container">
          
          <div className="section-header text-center">
            <span className="section-subtitle">OUR ACCOMMODATION</span>
            <h1 className="section-title">ประเภทห้องพัก & อัตราค่าบริการ</h1>
            <p className="section-desc">สัมผัสการพักผ่อนอย่างอบอุ่นในใจกลางเมืองทุ่งสง พร้อมสิ่งอำนวยความสะดวกครบครันในราคาสุดพิเศษ</p>
          </div>

          <div className="rooms-grid" style={{ marginBottom: '80px' }}>
            {rooms.map((room) => (
              <div className="room-card" key={room.id}>
                <div className="room-img-container">
                  <img src={room.image} alt={room.name} className="room-img" />
                </div>
                <div className="room-info">
                  <h3>{room.nameTh}</h3>
                  <p>{room.desc}</p>
                  <div className="room-amenities">
                    {room.amenities.map((am, index) => (
                      <span key={index}>{am}</span>
                    ))}
                  </div>
                  <div className="room-footer">
                    <div>
                      <span className="room-price" style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-red)', display: 'block' }}>฿{room.price} / คืน</span>
                      <span style={{ fontSize: '12px', color: getAvailableAllotment(room.id) === 0 ? 'var(--accent-red)' : 'var(--text-gray)' }}>
                        ห้องว่างวันนี้: {getAvailableAllotment(room.id)} / {room.allotment} ห้อง
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link to={`/rooms/${room.id}`} className="btn btn-sm btn-outline">รายละเอียด</Link>
                      <Link to={`/booking?roomId=${room.id}`} className="btn btn-sm btn-accent">จองห้องพัก</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Integrated Promotions Section */}
          <div className="section-header text-center" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle">EXCLUSIVE OFFERS</span>
            <h2 className="section-title">โค้ดส่วนลด & โปรโมชันพิเศษ</h2>
            <p className="section-desc">กรอกโค้ดส่วนลดนี้ขณะทำรายการจองออนไลน์เพื่อลดค่าบริการทันที</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '60px' }}>
            {promotions.map((promo) => (
              <div 
                style={{ 
                  background: '#ffffff', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '20px', 
                  padding: '35px', 
                  position: 'relative', 
                  overflow: 'hidden', 
                  boxShadow: 'var(--shadow-premium)' 
                }} 
                key={promo.code}
              >
                <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '70px', height: '70px', background: 'rgba(217, 43, 43, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Gift size={20} color="var(--accent-red)" style={{ marginTop: '8px', marginRight: '8px' }} />
                </div>
                
                <span style={{ fontSize: '11px', color: 'var(--accent-red)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>ACTIVE PROMO CODE</span>
                <h3 style={{ color: '#111', fontSize: '20px', marginBottom: '15px' }}>{promo.label}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-card-light)', padding: '15px 20px', borderRadius: '10px', border: '1px dashed var(--border-color)', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-gray)', display: 'block' }}>โค้ดส่วนลด</span>
                    <strong style={{ fontSize: '18px', color: 'var(--accent-red)', letterSpacing: '1px', fontFamily: 'Outfit' }}>{promo.code}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-gray)', display: 'block' }}>ส่วนลด</span>
                    <strong style={{ fontSize: '18px', color: '#111' }}>
                      {promo.type === 'percent' ? `${promo.discount}%` : `฿${promo.discount}`}
                    </strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', color: 'var(--text-gray)', fontSize: '13px', alignItems: 'center' }}>
                  <CheckCircle size={14} color="#4cd964" />
                  <span>ก๊อปปี้รหัสเพื่อไปวางในฟอร์มจองห้องพักออนไลน์</span>
                </div>
              </div>
            ))}
          </div>

          {/* SHA cleaning standard card */}
          <div style={{ background: 'var(--bg-card-light)', borderRadius: '15px', padding: '30px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '32px' }}>🛡️</span>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h4 style={{ color: '#111', fontSize: '17px', marginBottom: '8px' }}>ยกระดับความมั่นใจด้านความสะอาด ปลอดภัยตาม New Normal</h4>
                <p style={{ color: 'var(--text-gray)', fontSize: '13px', lineHeight: '1.5' }}>ห้องพักทุกห้องของโรงแรมชิโนทุ่งสง ผ่านการทำความสะอาดและฆ่าเชื้อด้วยน้ำยาเกรดทางการแพทย์ พร้อมเปลี่ยนชุดเครื่องนอนสะอาดใหม่ 100% สำหรับลูกค้าทุกคนก่อนการเช็คอิน เพื่อสุขอนามัยสูงสุด</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
