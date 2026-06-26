import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Ticket, Gift, PhoneCall, CheckCircle } from 'lucide-react';

export default function Promotions() {
  const { promotions } = useContext(AppContext);

  return (
    <div className="promotions-page" style={{ paddingTop: '100px' }}>
      <section className="promotions-section">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-subtitle">EXCLUSIVE OFFERS</span>
            <h2 className="section-title">โปรโมชันห้องพักล่าสุด</h2>
            <p className="section-desc">โค้ดส่วนลดและข้อเสนอพิเศษสำหรับการสำรองห้องพักโดยตรงกับทางโรงแรม ชิโน ทุ่งสง</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '50px' }}>
            {promotions.map((promo) => (
              <div style={{ background: 'linear-gradient(135deg, #181822 0%, #212130 100%)', border: '1px solid rgba(226,192,119,0.2)', borderRadius: '20px', padding: '35px', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }} key={promo.code}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'rgba(226, 192, 119, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Gift size={24} color="#e2c077" style={{ marginTop: '10px', marginRight: '10px' }} />
                </div>
                
                <span style={{ fontSize: '11px', color: '#e2c077', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>Active Discount Code</span>
                <h3 style={{ color: '#fff', fontSize: '22px', marginBottom: '15px' }}>{promo.label}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '15px 20px', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.1)', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#a1a1b5', display: 'block' }}>โค้ดส่วนลด</span>
                    <strong style={{ fontSize: '20px', color: '#e2c077', letterSpacing: '1.5px', fontFamily: 'Outfit' }}>{promo.code}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: '#a1a1b5', display: 'block' }}>ส่วนลดที่จะได้รับ</span>
                    <strong style={{ fontSize: '20px', color: '#d92b2b' }}>
                      {promo.type === 'percent' ? `${promo.discount}%` : `฿${promo.discount}`}
                    </strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', color: '#a1a1b5', fontSize: '13px', alignItems: 'center' }}>
                  <CheckCircle size={14} color="#4cd964" />
                  <span>ใช้กรอกในขั้นตอนจองห้องพักออนไลน์เพื่อลดราคาทันที</span>
                </div>
              </div>
            ))}
          </div>

          {/* Hotline Promo Booking Banner */}
          <div style={{ backgroundImage: "linear-gradient(rgba(217, 43, 43, 0.9), rgba(217, 43, 43, 0.9)), url('https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_262.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '20px', padding: '50px 30px', textAlign: 'center', color: '#fff' }}>
            <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>สำรองห้องพักด่วน ผ่านเบอร์โทรศัพท์</h3>
            <p style={{ maxWidth: '600px', margin: '0 auto 25px auto', fontSize: '15px', color: '#f1f1f5' }}>โทรติดต่อสอบถามโดยตรงกับพนักงานล็อบบี้เพื่อรับข้อเสนอราคาห้องพักสุดพิเศษ คุ้มค่าที่สุด ได้รับการยืนยันห้องพักทันที ตลอด 24 ชั่วโมง</p>
            <a href="tel:0887572195" className="btn btn-primary btn-large" style={{ background: '#fff', color: '#272730' }}>
              <PhoneCall size={18} style={{ marginRight: '8px' }} />
              <span>โทรเลย: 088-757-2195</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
