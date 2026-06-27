import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Gift, CheckCircle, Flame, ArrowRight } from 'lucide-react';

export default function Rooms() {
  const { rooms, promotions, getAvailableAllotment } = useContext(AppContext);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#exclusive-offers') {
      const element = document.getElementById('exclusive-offers');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  // Separate normal rooms and flash sale promotion rooms
  const normalRooms = rooms.filter(room => room.id !== 'standard-flash-sale');
  const flashSaleRoom = rooms.find(room => room.id === 'standard-flash-sale');

  return (
    <div className="rooms-page" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <section className="rooms-section">
        <div className="section-container">
          
          {/* Integrated Promotions Section (Top Section) */}
          <div id="exclusive-offers" className="section-header text-center" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle">EXCLUSIVE OFFERS</span>
            <h2 className="section-title">โค้ดส่วนลด & โปรโมชันพิเศษ</h2>
            <p className="section-desc">กรอกโค้ดส่วนลดหรือเลือกจองห้องพักราคาพิเศษสุดคุ้มจากแคมเปญด้านล่างนี้</p>
          </div>

          {/* Flash Sale Special Promotional Room Card */}
          {flashSaleRoom && (
            <div 
              style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #fffefe 100%)', 
                border: '2px solid var(--accent-red)', 
                borderRadius: '24px', 
                padding: '30px', 
                marginBottom: '40px', 
                boxShadow: '0 10px 30px rgba(217, 43, 43, 0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Hot Tag */}
              <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--accent-red)', color: '#fff', padding: '6px 15px', borderRadius: '30px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <Flame size={12} fill="#fff" />
                <span>HOT PROMO (ไม่ร่วมโค้ดลดเพิ่ม)</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' }}>
                <img 
                  src={flashSaleRoom.image} 
                  alt={flashSaleRoom.name} 
                  style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px' }} 
                />
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--accent-red)', fontWeight: 'bold', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>FLASH SALE LIMITED ALLOTMENT</span>
                  <h3 style={{ color: '#111', fontSize: '22px', marginBottom: '12px', fontWeight: 'bold' }}>{flashSaleRoom.nameTh}</h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '13px', lineHeight: '1.5', marginBottom: '15px' }}>{flashSaleRoom.desc}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {flashSaleRoom.amenities.slice(0, 4).map((am, idx) => (
                      <span key={idx} style={{ background: '#fcfcfc', border: '1px solid var(--border-color)', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', color: '#555' }}>
                        {am}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: 'var(--text-gray)', display: 'block' }}>ราคาพิเศษสุทธิ</span>
                      <strong style={{ fontSize: '24px', color: 'var(--accent-red)', fontWeight: 'bold' }}>฿{flashSaleRoom.price}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-gray)', marginLeft: '10px' }}>/ คืน</span>
                      <div style={{ fontSize: '11px', color: getAvailableAllotment(flashSaleRoom.id) === 0 ? 'var(--accent-red)' : 'var(--text-gray)', marginTop: '2px' }}>
                        ห้องว่างวันนี้: {getAvailableAllotment(flashSaleRoom.id)} / {flashSaleRoom.allotment} ห้อง
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link to={`/rooms/${flashSaleRoom.id}`} className="btn btn-outline btn-sm">รายละเอียด</Link>
                      <Link to={`/booking?roomId=${flashSaleRoom.id}`} className="btn btn-accent btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>จองโปรโมชั่นนี้</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Promo Codes Grid */}
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

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '60px 0' }} />

          {/* Rooms Showcase Title */}
          <div className="section-header text-center">
            <span className="section-subtitle">OUR ACCOMMODATION</span>
            <h1 className="section-title">ประเภทห้องพัก & อัตราค่าบริการ</h1>
            <p className="section-desc">สัมผัสการพักผ่อนอย่างอบอุ่นในใจกลางเมืองทุ่งสง พร้อมสิ่งอำนวยความสะดวกครบครันในราคาสุดพิเศษ</p>
          </div>

          {/* Normal Rooms Grid (Without Flash Sale) */}
          <div className="rooms-grid" style={{ marginBottom: '80px' }}>
            {normalRooms.map((room) => (
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
