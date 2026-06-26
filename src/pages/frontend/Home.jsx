import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Star, Award, Shield, Clock, ChevronRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Home() {
  const { rooms, reviews, faqs } = useContext(AppContext);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeFaqIndex === index) {
      setActiveFaqIndex(null);
    } else {
      setActiveFaqIndex(index);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="hero" className="hero-section" style={{ minHeight: '85vh' }}>
        <div className="hero-bg" style={{ backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.45), rgba(10, 10, 10, 0.88)), url('https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_262.jpg')" }}></div>
        <div className="hero-content">
          <div className="tagline">โรงแรมใจกลางเมืองทุ่งสง</div>
          <h1 className="hero-title" style={{ fontSize: '48px' }}>โรงแรม ชิโน ทุ่งสง</h1>
          <p className="hero-desc">ยินดีต้อนรับสู่ที่พักระดับคุณภาพสไตล์โมเดิร์นชิโน เดินทางสะดวก สะอาด ปลอดภัย ใกล้สถานีรถไฟทุ่งสงเพียง 20 เมตร แผนกต้อนรับบริการตลอด 24 ชั่วโมง</p>
          


          <div className="hero-actions">
            <Link to="/booking" className="btn btn-accent btn-large">
              <span>จองห้องพักเลยตอนนี้</span>
            </Link>
            <Link to="/rooms" className="btn btn-outline btn-large">
              <span>ชมห้องพักทั้งหมด</span>
            </Link>
          </div>
        </div>

        <div className="quick-info-bar">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div className="info-text">
              <strong>ทำเลใจกลางเมือง</strong>
              <span>ใกล้สถานีรถไฟทุ่งสง 20 เมตร</span>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">🛡️</span>
            <div className="info-text">
              <strong>สุขอนามัย SHA</strong>
              <span>ปลอดภัยด้วยมาตรฐาน New Normal</span>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">🕒</span>
            <div className="info-text">
              <strong>บริการ 24 ชั่วโมง</strong>
              <span>เช็คอินและอำนวยความสะดวกตลอดวัน</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Highlights */}
      <section className="about-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="section-container">
          <div className="about-grid">
            <div className="about-content-block">
              <span className="section-subtitle">WELCOME TO SINO HOTEL</span>
              <h2 className="section-title">ที่พักสะอาด สะดวก ปลอดภัย เพื่อการพักผ่อนที่ดีที่สุด</h2>
              <p className="about-p">โรงแรมชิโนทุ่งสง ยกระดับมาตรฐานการดูแลและบริการโดยคำนึงถึงความสะอาดและความพึงพอใจของลูกค้าเป็นสำคัญ ผ่านการประเมินมาตรฐานสากลด้านสุขอนามัย ปลอดภัยหายห่วงในทุกค่ำคืน</p>
              
              <div className="standards-list">
                <div className="standard-card">
                  <div className="standard-icon"><Award color="var(--accent-red)" /></div>
                  <div className="standard-details">
                    <h3>ผ่านการรับรองมาตรฐาน SHA</h3>
                    <p>รับรองความปลอดภัยด้านสาธารณสุขและสุขอนามัยสูงสุดสำหรับอุตสาหกรรมท่องเที่ยวไทย</p>
                  </div>
                </div>
                <div className="standard-card">
                  <div className="standard-icon"><Shield color="var(--accent-red)" /></div>
                  <div className="standard-details">
                    <h3>เกณฑ์ความปลอดภัย Safe Travels</h3>
                    <p>สอดคล้องตามข้อกำหนดด้านความปลอดภัยระดับสากลจาก World Travel & Tourism Council</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image-block">
              <div className="image-wrapper">
                <img src="https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_2683152491774748_1920x1080.jpg" alt="Sino Thungsong Hotel" className="about-img" />
                <div className="img-accent-card">
                  <span className="accent-number">24</span>
                  <span className="accent-text">ชั่วโมง<br />บริการดูแล</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Corporate & Work Stay section */}
      <section className="corporate-section" style={{ backgroundColor: '#fcfcfc', borderTop: '1px solid #f1f1f1', borderBottom: '1px solid #f1f1f1', padding: '60px 0' }}>
        <div className="section-container">
          <div className="section-header text-center" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle" style={{ color: 'var(--accent-red)' }}>FOR BUSINESS & WORK TRAVELERS</span>
            <h2 className="section-title">พักทุ่งสง สำหรับคนทำงาน</h2>
            <p className="section-desc" style={{ maxWidth: '700px', margin: '0 auto' }}>
              โรงแรม ชิโน ทุ่งสง ออกแบบมาเพื่อตอบโจทย์พนักงานบริษัท เซลส์ ทีมช่าง หน่วยงานราชการ และผู้ที่เดินทางมาปฏิบัติงานในพื้นที่ ด้วยสิ่งอำนวยความสะดวกที่ช่วยให้งานของคุณราบรื่น
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' }}>
            <div style={{ background: '#fff', border: '1px solid #eee', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '28px', marginBottom: '15px' }}>📶</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111', marginBottom: '10px' }}>Wi-Fi แรง ใช้งานสะดวก</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>อินเทอร์เน็ตความเร็วสูงครอบคลุมทุกห้องพัก เพื่อการส่งงาน ดึงข้อมูล หรือประชุมออนไลน์ที่ไม่สะดุด</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #eee', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '28px', marginBottom: '15px' }}>🪑</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111', marginBottom: '10px' }}>มีโต๊ะทำงานและปลั๊กไฟ</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>จัดเตรียมมุมทำงานส่วนตัวพร้อมปลั๊กไฟข้างโต๊ะและโคมไฟ เพื่อความสะดวกในการนั่งทำงานในห้องพัก</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #eee', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '28px', marginBottom: '15px' }}>💵</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111', marginBottom: '10px' }}>เบิกค่าใช้จ่ายได้สะดวก</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>ออกใบเสร็จรับเงิน/ใบกำกับภาษีได้รวดเร็วถูกต้อง สามารถสะดวกรวมบิลค่าอาหารเพื่อนำไปเบิกบริษัทได้</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #eee', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '28px', marginBottom: '15px' }}>💸</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111', marginBottom: '10px' }}>โปรโมชั่นพนักงานบริษัท</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>พิเศษ! รับสิทธิ์ Cashback เงินคืน 200 บาท สำหรับผู้เข้าพักที่เป็นพนักงานบริษัท (เพียงแสดงบัตรพนักงานตอนเช็คอิน)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Booking Benefits section */}
      <section className="booking-benefits-section" style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
        <div className="section-container">
          <div className="section-header text-center" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle" style={{ color: 'var(--accent-red)' }}>SINO DIRECT BOOKING BENEFITS</span>
            <h2 className="section-title">ข้อดีของการจองตรงกับ โรงแรมชิโน @ ทุ่งสง</h2>
            <p className="section-desc" style={{ maxWidth: '700px', margin: '0 auto' }}>
              จองตรง คุ้มกว่า สะดวกกว่า ได้รับสิทธิพิเศษและบริการที่รวดเร็วยิ่งกว่าการจองผ่านตัวกลางหรือแอปพลิเคชัน
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '15px', background: '#fff9f9', border: '1px solid #ffeded', padding: '20px', borderRadius: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
              <div>
                <h4 style={{ fontWeight: 'bold', color: '#111', marginBottom: '5px', fontSize: '15px' }}>ราคาถูกกว่า</h4>
                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5' }}>รับราคาพิเศษที่ดีที่สุดโดยตรงไม่ผ่านตัวกลาง</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', background: '#fff9f9', border: '1px solid #ffeded', padding: '20px', borderRadius: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
              <div>
                <h4 style={{ fontWeight: 'bold', color: '#111', marginBottom: '5px', fontSize: '15px' }}>สะสมแต้มได้</h4>
                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5' }}>พักทุกครั้ง รับคะแนนสะสม CHINO REWARDS ทันที</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', background: '#fff9f9', border: '1px solid #ffeded', padding: '20px', borderRadius: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
              <div>
                <h4 style={{ fontWeight: 'bold', color: '#111', marginBottom: '5px', fontSize: '15px' }}>แลก Cashback คืนเงินได้</h4>
                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5' }}>ยิ่งพัก ยิ่งได้เงินคืน ยกระดับความคุ้มค่า</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', background: '#fff9f9', border: '1px solid #ffeded', padding: '20px', borderRadius: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>4</div>
              <div>
                <h4 style={{ fontWeight: 'bold', color: '#111', marginBottom: '5px', fontSize: '15px' }}>ออกใบกำกับภาษีได้</h4>
                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5' }}>เหมาะสำหรับการทำเรื่องเบิกจ่ายของบริษัทและหน่วยงานราชการ</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', background: '#fff9f9', border: '1px solid #ffeded', padding: '20px', borderRadius: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>5</div>
              <div>
                <h4 style={{ fontWeight: 'bold', color: '#111', marginBottom: '5px', fontSize: '15px' }}>เปลี่ยนแปลงการจองง่าย</h4>
                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5' }}>ติดต่อเจ้าหน้าที่โรงแรมโดยตรงเพื่อเลื่อนวันได้สะดวกรวดเร็ว</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', background: '#fff9f9', border: '1px solid #ffeded', padding: '20px', borderRadius: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>6</div>
              <div>
                <h4 style={{ fontWeight: 'bold', color: '#111', marginBottom: '5px', fontSize: '15px' }}>เช็คอินก่อนเวลาได้</h4>
                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5' }}>Early Check-in ได้ตั้งแต่ 11:00 น. (ขึ้นอยู่กับสถานะห้องว่าง)</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', background: '#fff9f9', border: '1px solid #ffeded', padding: '20px', borderRadius: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>7</div>
              <div>
                <h4 style={{ fontWeight: 'bold', color: '#111', marginBottom: '5px', fontSize: '15px' }}>ติดต่อโรงแรมง่ายกว่า</h4>
                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5' }}>คุยกับพนักงานโดยตรง แก้ปัญหาได้ทันที ไม่ต้องคุยผ่านคอลเซ็นเตอร์แอป</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', background: '#fff9f9', border: '1px solid #ffeded', padding: '20px', borderRadius: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>8</div>
              <div>
                <h4 style={{ fontWeight: 'bold', color: '#111', marginBottom: '5px', fontSize: '15px' }}>โปรโมชั่นพิเศษก่อนใคร</h4>
                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5' }}>ได้รับข้อเสนอพิเศษ โค้ดส่วนลด หรือ Cashback ที่มอบให้เฉพาะผู้ที่จองตรงเท่านั้น</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Rooms Showcase */}
      <section className="rooms-section">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-subtitle">RECOMMENDED ROOMS</span>
            <h2 className="section-title">ห้องพักแนะนำของเรา</h2>
            <p className="section-desc">ดีไซน์ที่เน้นความโปร่งโล่งสบาย สะอาด พร้อมสิ่งอำนวยความสะดวกครบถ้วนเพื่อการเข้าพักที่ประทับใจ</p>
          </div>

          <div className="rooms-grid">
            {['vip-business', 'standard-twin'].map(id => rooms.find(r => r.id === id)).filter(Boolean).map((room) => (
              <div className="room-card" key={room.id}>
                <div className="room-img-container">
                  <img src={room.image} alt={room.name} className="room-img" />
                  <div className="room-tag">ยอดนิยม</div>
                </div>
                <div className="room-info">
                  <h3>{room.nameTh}</h3>
                  <p>{room.desc}</p>
                  <div className="room-amenities">
                    {room.amenities.slice(0, 4).map((am, index) => (
                      <span key={index}>{am}</span>
                    ))}
                  </div>
                  <div className="room-footer">
                    <span className="room-price" style={{ fontSize: '18px', fontWeight: 'bold' }}>฿{room.price} / คืน</span>
                    <Link to={`/rooms/${room.id}`} className="btn btn-sm btn-primary">ดูรายละเอียด</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ integrated at the bottom of Home page */}
      <section className="faq-section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-subtitle">QUESTIONS & ANSWERS</span>
            <h2 className="section-title">คำถามที่พบบ่อย (FAQ)</h2>
            <p className="section-desc">รวมคำถาม-คำตอบยอดฮิตเพื่อการวางแผนการเข้าพักอย่างราบรื่น</p>
          </div>

          <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {faqs.map((faq, index) => (
              <div 
                style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border-color)', 
                  overflow: 'hidden', 
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-soft)'
                }}
                key={index}
                onClick={() => toggleFAQ(index)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 25px' }}>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px' }}>❓</span>
                    <strong style={{ color: '#111', fontSize: '15px' }}>{faq.question}</strong>
                  </div>
                  {activeFaqIndex === index ? <ChevronUp size={16} color="var(--accent-red)" /> : <ChevronDown size={16} color="var(--accent-red)" />}
                </div>

                {activeFaqIndex === index && (
                  <div 
                    style={{ 
                      padding: '0 25px 20px 58px', 
                      color: 'var(--text-gray)', 
                      fontSize: '14px', 
                      lineHeight: '1.6', 
                      borderTop: '1px solid rgba(0,0,0,0.03)', 
                      paddingTop: '15px' 
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Travel Promotion */}
      <section className="cta-banner">
        <div className="cta-overlay"></div>
        <div className="cta-container">
          <h2>ทุ่งสง เมืองต้องห้ามพลาด!</h2>
          <p>สัมผัสวิถีชีวิตชาวใต้ ไหว้ศาลเจ้าซำปอกง ทานขนมจีนสูตรต้นตำรับ และเที่ยวอุทยานน้ำตกโยง</p>
          <Link to="/blog" className="btn btn-primary btn-large">
            <span>อ่านบทความท่องเที่ยวทุ่งสง</span>
            <ChevronRight size={16} style={{ marginLeft: '4px' }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
