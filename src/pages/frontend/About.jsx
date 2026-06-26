import React from 'react';
import { Award, ShieldAlert, Sparkles, MapPin, HeartHandshake, History, Compass, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <section className="about-section">
        <div className="section-container">
          
          <div className="section-header text-center">
            <span className="section-subtitle">ABOUT SINO @ THUNGSONG</span>
            <h1 className="section-title" style={{ fontSize: '36px' }}>ความเป็นมาของ โรงแรม ชิโน ทุ่งสง</h1>
            <p className="section-desc">สัมผัสเสน่ห์การผสมผสานทางวัฒนธรรมและบริการที่อบอุ่นเป็นกันเองในราคาสุดคุ้มค่า</p>
          </div>

          {/* Block 1: History & Vision */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center', marginBottom: '60px' }}>
            <div>
              <img 
                src="https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_2683152491774748_1920x1080.jpg" 
                alt="ประวัติ โรงแรมชิโน ทุ่งสง" 
                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '20px', boxShadow: 'var(--shadow-premium)' }} 
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-red)', marginBottom: '15px' }}>
                <History size={24} />
                <span style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Heritage</span>
              </div>
              <h2 style={{ color: '#111', fontSize: '26px', marginBottom: '20px' }}>เรื่องราวของ "ชิโน@ทุ่งสง"</h2>
              <p style={{ color: 'var(--text-gray)', fontSize: '15px', lineHeight: '1.7', marginBottom: '15px' }}>
                คำว่า **"ชิโน" (Sino)** สื่อถึงความรุ่งเรืองทางศิลปวัฒนธรรมและประวัติศาสตร์ของชาวไทยเชื้อสายจีนที่เข้ามาตั้งถิ่นฐานและบุกเบิกการค้าย่านชุมทางรถไฟทุ่งสงมาตั้งแต่อดีต โรงแรมของเราจึงได้รับแรงบันดาลใจในการออกแบบโดยการนำเอาความเป็นโมเดิร์นคลาสสิกมาผสมผสาน เพื่อสร้างที่พักที่ให้ความรู้สึกผ่อนคลาย อบอุ่น และคลาสสิกในเวลาเดียวกัน
              </p>
              <p style={{ color: 'var(--text-gray)', fontSize: '15px', lineHeight: '1.7' }}>
                จากจุดเริ่มต้นในการพัฒนาที่พักเพื่อให้ผู้เดินทางด้วยรถไฟสายใต้ได้มีสถานที่พักผ่อนที่สะอาด ปลอดภัย และใกล้สถานีมากที่สุด วันนี้เราเติบโตสู่การเป็นตัวเลือกอันดับต้นๆ ของนักเดินทางท่องเที่ยว ข้าราชการ และผู้มาติดต่อธุรกิจในอำเภอทุ่งสง จังหวัดนครศรีธรรมราช
              </p>
            </div>
          </div>

          {/* Block 2: Mission & Values */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center', marginBottom: '80px' }}>
            <div style={{ order: window.innerWidth < 991 ? 0 : 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-red)', marginBottom: '15px' }}>
                <Compass size={24} />
                <span style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Mission</span>
              </div>
              <h2 style={{ color: '#111', fontSize: '26px', marginBottom: '20px' }}>ความมุ่งมั่นและพันธกิจของเรา</h2>
              <p style={{ color: 'var(--text-gray)', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
                เรายึดถือมาตรฐานหลัก 3 ประการในการให้บริการลูกค้าทุกท่าน ได้แก่ **"สะอาดขั้นสูงสุด (Cleanliness) - สะดวกสบายทำเลเด่น (Convenience) - ปลอดภัยอุ่นใจ (Safety)"** เพื่อส่งมอบการพักผ่อนที่ดีที่สุดในทุกการเข้าพัก
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#111', fontSize: '14px', fontWeight: '600' }}>
                  <CheckCircle2 size={16} color="var(--accent-red)" />
                  <span>ยกระดับการฆ่าเชื้อเครื่องนอนและห้องพักทุกห้องก่อนเข้าเช็คอิน</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#111', fontSize: '14px', fontWeight: '600' }}>
                  <CheckCircle2 size={16} color="var(--accent-red)" />
                  <span>เจ้าหน้าที่ต้อนรับพร้อมให้คำแนะนำแหล่งอาหารท่องเที่ยวทุ่งสงตลอด 24 ชม.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#111', fontSize: '14px', fontWeight: '600' }}>
                  <CheckCircle2 size={16} color="var(--accent-red)" />
                  <span>มีระบบกล้องวงจรปิด (CCTV) รอบโรงแรมและพนักงานดูแลลานจอดรถ</span>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_3791118907644762_640x1316.jpg" 
                alt="วิสัยทัศน์ชิโน ทุ่งสง" 
                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '20px', boxShadow: 'var(--shadow-premium)' }} 
              />
            </div>
          </div>

          {/* Standards details */}
          <h3 style={{ color: '#111', fontSize: '24px', marginBottom: '30px', textAlign: 'center' }}>มาตรฐานความปลอดภัยและรางวัลแห่งความภูมิใจ</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div style={{ background: 'var(--bg-card-light)', border: '1px solid var(--border-color)', padding: '30px', borderRadius: '15px' }}>
              <div style={{ marginBottom: '15px' }}><Award size={32} color="var(--accent-red)" /></div>
              <h4 style={{ color: '#111', fontSize: '17px', marginBottom: '10px' }}>มาตรฐาน SHA Certification</h4>
              <p style={{ color: 'var(--text-gray)', fontSize: '13px', lineHeight: '1.5' }}>ผ่านการตรวจประเมินตามมาตรฐานความปลอดภัยด้านสุขอนามัยสำหรับสถานประกอบการท่องเที่ยวอย่างเคร่งครัด</p>
            </div>
            
            <div style={{ background: 'var(--bg-card-light)', border: '1px solid var(--border-color)', padding: '30px', borderRadius: '15px' }}>
              <div style={{ marginBottom: '15px' }}><HeartHandshake size={32} color="var(--accent-red)" /></div>
              <h4 style={{ color: '#111', fontSize: '17px', marginBottom: '10px' }}>Safe Travels Standard</h4>
              <p style={{ color: 'var(--text-gray)', fontSize: '13px', lineHeight: '1.5' }}>ปฏิบัติตามหลักปฏิบัติเพื่อความปลอดภัยในการเดินทางท่องเที่ยวในระดับสากลจาก World Travel & Tourism Council</p>
            </div>

            <div style={{ background: 'var(--bg-card-light)', border: '1px solid var(--border-color)', padding: '30px', borderRadius: '15px' }}>
              <div style={{ marginBottom: '15px' }}><Sparkles size={32} color="var(--accent-red)" /></div>
              <h4 style={{ color: '#111', fontSize: '17px', marginBottom: '10px' }}>การันตีรีวิว 5 ดาว</h4>
              <p style={{ color: 'var(--text-gray)', fontSize: '13px', lineHeight: '1.5' }}>ได้รับความไว้วางใจและคะแนนรีวิวระดับยอดเยี่ยมจากผู้ใช้บริการจริงผ่าน Agoda, Trip.com และ Booking.com</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
