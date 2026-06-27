import React from 'react';
import { Wifi, Car, ShieldCheck, Coffee, Tv, MapPin, Navigation, Train, ShoppingBag, Bed, Wind, Briefcase, Utensils, Bath, Sofa, Compass, UtensilsCrossed } from 'lucide-react';

export default function Facilities() {
  const list = [
    { 
      icon: <Coffee size={36} color="var(--accent-red)" />, 
      title: 'ชา กาแฟ ขนม ฟรี ทุกวัน เวลา 07.00-11.00', 
      desc: 'เริ่มต้นวันใหม่อย่างสดใสด้วยบริการเครื่องดื่มชา กาแฟ และขนมขบเคี้ยวฟรีทุกเช้า ณ บริเวณพื้นที่ส่วนกลาง' 
    },
    { 
      icon: <Wifi size={36} color="var(--accent-red)" />, 
      title: 'อินเทอร์เน็ต Wi-Fi ความเร็วสูง', 
      desc: 'ให้บริการฟรีทุกห้องพัก สัญญาณเสถียร ครอบคลุมทุกพื้นที่ เหมาะสำหรับการพักผ่อนและทำงานอย่างไร้อุปสรรค' 
    },
    { 
      icon: <Tv size={36} color="var(--accent-red)" />, 
      title: 'สมาร์ททีวี (Smart TV)', 
      desc: 'รองรับการเชื่อมต่ออินเทอร์เน็ต รับชมช่องทีวีและความบันเทิงยอดนิยมอย่างครบครันในห้องพักส่วนตัว' 
    },
    { 
      icon: <Bed size={36} color="var(--accent-red)" />, 
      title: 'เตียงนอนคุณภาพสูง', 
      desc: 'พร้อมชุดเครื่องนอนหนานุ่ม คัดสรรมาเป็นพิเศษเพื่อรองรับสรีระและการนอนหลับพักผ่อนที่สบายที่สุด' 
    },
    { 
      icon: <Wind size={36} color="var(--accent-red)" />, 
      title: 'เครื่องปรับอากาศ', 
      desc: 'เครื่องปรับอากาศประหยัดพลังงานในทุกห้องพัก สามารถปรับอุณหภูมิความเย็นได้ตามความต้องการของคุณ' 
    },
    { 
      icon: <Briefcase size={36} color="var(--accent-red)" />, 
      title: 'พื้นที่ทำงานส่วนตัว', 
      desc: 'จัดเตรียมโต๊ะทำงานและเก้าอี้ พร้อมเต้ารับไฟฟ้าในตำแหน่งที่เหมาะสมสำหรับสายทำงานและ Business Travelers' 
    },
    { 
      icon: <Utensils size={36} color="var(--accent-red)" />, 
      title: 'ตู้เย็นและมินิบาร์', 
      desc: 'มาพร้อมน้ำดื่มสะอาดบรรจุขวดฟรีทุกวัน และตู้เย็นขนาดกะทัดรัดสำหรับแช่เครื่องดื่มหรือของว่างส่วนตัว' 
    },
    { 
      icon: <Bath size={36} color="var(--accent-red)" />, 
      title: 'ห้องน้ำส่วนตัว', 
      desc: 'สะดวกสบายด้วยเครื่องทำน้ำอุ่นระบบความปลอดภัยสูง พร้อมชุดของใช้ในห้องน้ำ (Toiletries) คุณภาพครบครัน' 
    },
    { 
      icon: <ShieldCheck size={36} color="var(--accent-red)" />, 
      title: 'ระบบรักษาความปลอดภัย 24 ชั่วโมง', 
      desc: 'ปลอดภัยอุ่นใจตลอดการเข้าพัก ด้วยเจ้าหน้าที่รักษาความปลอดภัยและกล้องวงจรปิด (CCTV) บันทึกภาพทั่วบริเวณโรงแรม' 
    },
    { 
      icon: <Sofa size={36} color="var(--accent-red)" />, 
      title: 'พื้นที่พักผ่อนส่วนกลาง (Lobby Lounge)', 
      desc: 'พื้นที่รับรองบริเวณล็อบบี้กว้างขวาง บรรยากาศผ่อนคลาย เหมาะสำหรับการนั่งเล่น นัดพบเพื่อน หรือคุยธุรกิจ' 
    }
  ];

  const governmentOffices = [
    { title: 'ที่ว่าการอำเภอทุ่งสง', distance: '1.0 กม.', time: '3 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> },
    { title: 'เทศบาลเมืองทุ่งสง', distance: '1.0 กม.', time: '3 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> },
    { title: 'สถานีตำรวจภูธรทุ่งสง (สภ.ทุ่งสง)', distance: '750 เมตร', time: '2 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> },
    { title: 'สถานีขนส่ง แห่งที่ 1 (บขส.)', distance: '650 เมตร', time: '3 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> },
    { title: 'สำนักงานที่ดิน สาขาทุ่งสง', distance: '5.4 กม.', time: '9 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> },
    { title: 'สำนักงานสรรพสามิตฯ สาขาทุ่งสง', distance: '700 เมตร', time: '3 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> },
    { title: 'สำนักงานสาธารณสุขอำเภอทุ่งสง', distance: '1.2 กม.', time: '4 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> },
    { title: 'โรงพยาบาลทุ่งสง (รัฐบาล)', distance: '1.1 กม.', time: '4 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> },
    { title: 'โรงพยาบาลธนบุรี ทุ่งสง (เอกชน)', distance: '3.3 กม.', time: '9 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> },
    { title: 'ศาลจังหวัดทุ่งสง', distance: '3.9 กม.', time: '10 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> },
    { title: 'วิทยาลัยเทคนิคทุ่งสง', distance: '9.4 กม.', time: '12 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> },
    { title: 'โรงเรียนสตรีทุ่งสง', distance: '950 เมตร', time: '3 นาที', icon: <MapPin size={18} color="var(--accent-red)" /> }
  ];

  const nearby = [
    { title: 'สถานีรถไฟชุมทางทุ่งสง (ตรงข้ามโรงแรม)', distance: '20 เมตร', info: 'เดินข้ามถนนเพียง 1 นาที เหมาะสำหรับผู้เดินทางด้วยรถไฟสายใต้', icon: <Train size={18} color="var(--accent-red)" /> },
    { title: 'ร้านสะดวกซื้อ (7-Eleven / CJ Supermarket)', distance: '15 เมตร', info: 'เปิดบริการตลอด 24 ชั่วโมง สะดวกซื้อของกินของใช้อยู่เยื้องหน้าโรงแรม', icon: <ShoppingBag size={18} color="var(--accent-red)" /> },
    { title: 'หลาดชุมทางทุ่งสง / ตลาดโต้รุ้ง', distance: '200 เมตร', info: 'แหล่งรวมอาหารคาวหวานและผักผลไม้สดท้องถิ่นรสชาติดีเลิศราคากันเอง', icon: <ShoppingBag size={18} color="var(--accent-red)" /> },
  ];

  const attractions = [
    { title: 'ถ้ำตลอด (แลนด์มาร์กเมืองทุ่งสง)', distance: '1.2 กม.', info: 'ถ้ำธรรมชาติเดินทะลุผ่านภูเขาได้ ภายในประดิษฐานพระพุทธรูปปางไสยาสน์ขนาดใหญ่', icon: <Compass size={18} color="var(--accent-red)" /> },
    { title: 'มูลนิธิซำปอกง (ศาลเจ้าแม่กวนอิม)', distance: '2.0 กม.', info: 'ที่ประดิษฐานพระโพธิสัตว์กวนอิมองค์ใหญ่ที่สุดในประเทศไทย เงียบสงบ ร่มรื่น', icon: <Compass size={18} color="var(--accent-red)" /> },
    { title: 'อุทยานแห่งชาติน้ำตกโยง', distance: '8.5 กม.', info: 'สถานที่ท่องเที่ยวพักผ่อนยอดนิยมใกล้ชิดธรรมชาติ น้ำตกสวยงาม ร่มรื่นด้วยต้นไม้ใหญ่', icon: <Compass size={18} color="var(--accent-red)" /> },
  ];

  const eatAndCafe = [
    { title: 'เจริญวรรณ แต่เตี๊ยม', distance: '300 เมตร', info: 'ร้านอาหารเช้าและติ่มซำนึ่งสดรสเด็ด บะกุดเต๋ร้อนๆ บริการเป็นกันเอง (เดิน 4 นาที)', icon: <UtensilsCrossed size={18} color="var(--accent-red)" /> },
    { title: 'ภัตตาคารบุญญา (ร้านอาหารสุขใจ)', distance: '400 เมตร', info: 'ร้านระดับตำนานเปิดยาวนานกว่า 50 ปี แกงกะหรี่ไก่ สตูลิ้นหมู ขาหมูพะโล้', icon: <UtensilsCrossed size={18} color="var(--accent-red)" /> },
    { title: 'Green Zone Coffee & Community', distance: '700 เมตร', info: 'คาเฟ่ร่มรื่นกลางเมือง เหมาะสำหรับนั่งพักผ่อนหรือนั่งทำงาน กาแฟพรีเมียมและเบเกอรี่ดีเยี่ยม', icon: <Coffee size={18} color="var(--accent-red)" /> },
  ];


  return (
    <div className="facilities-page" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <section className="facilities-section">
        <div className="section-container">
          
          <div className="section-header text-center">
            <span className="section-subtitle">SERVICES & FACILITIES</span>
            <h1 className="section-title">บริการ & สิ่งอำนวยความสะดวก</h1>
            <p className="section-desc">เราเตรียมพร้อมทุกสิ่งอำนวยความสะดวกส่วนกลางที่จำเป็นต่อการพักผ่อนและการเดินทางทุ่งสงของคุณ</p>
          </div>

          {/* Grid of facilities */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '80px' }}>
            {list.map((item, index) => (
              <div 
                style={{ 
                  background: '#ffffff', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '15px', 
                  padding: '35px', 
                  boxShadow: 'var(--shadow-premium)', 
                  transition: 'all 0.3s ease' 
                }} 
                key={index}
                className="blog-card-hover"
              >
                <div style={{ marginBottom: '20px' }}>{item.icon}</div>
                <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Integrated Location & Map Section */}
          <div className="section-header text-center" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle">OUR LOCATION & DIRECTIONS</span>
            <h2 className="section-title">ที่ตั้ง & แผนที่การเดินทาง</h2>
            <p className="section-desc">ทำเลใจกลางเมืองทุ่งสง เดินทางเข้าออกได้สะดวก ใกล้แหล่งท่องเที่ยว ของกิน และสถานที่สำคัญหลัก</p>
          </div>

          {/* Top part: Map side-by-side with Transit Info */}
          <div className="grid-1-1fr" style={{ marginBottom: '50px' }}>
            {/* Map wrapper */}
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
                  <span>เปิดแผนที่นำทาง Google Maps</span>
                </a>
              </div>
            </div>

            {/* Nearby travel points */}
            <div>
              <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '15px', borderBottom: '2px solid var(--accent-red)', paddingBottom: '5px' }}>📍 จุดเดินทาง & ร้านสะดวกซื้อใกล้เคียง</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {nearby.map((loc, index) => (
                  <div style={{ display: 'flex', gap: '15px', background: '#ffffff', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }} key={index}>
                    <div style={{ marginTop: '3px' }}>{loc.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong style={{ color: '#111', fontSize: '14px' }}>{loc.title}</strong>
                        <span style={{ color: 'var(--accent-red)', fontSize: '13px', fontWeight: 'bold' }}>{loc.distance}</span>
                      </div>
                      <p style={{ color: 'var(--text-gray)', fontSize: '12px', lineHeight: '1.4' }}>{loc.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom part: 3 Column Grid for Attractions, Food/Cafe, and Government Offices */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {/* Column 1: Tourist Attractions */}
            <div>
              <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '15px', borderBottom: '2px solid var(--accent-red)', paddingBottom: '5px' }}>🏞️ สถานที่ท่องเที่ยวแนะนำ</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {attractions.map((loc, index) => (
                  <div style={{ display: 'flex', gap: '15px', background: '#ffffff', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }} key={index}>
                    <div style={{ marginTop: '3px' }}>{loc.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong style={{ color: '#111', fontSize: '14px' }}>{loc.title}</strong>
                        <span style={{ color: 'var(--accent-red)', fontSize: '13px', fontWeight: 'bold' }}>{loc.distance}</span>
                      </div>
                      <p style={{ color: 'var(--text-gray)', fontSize: '12px', lineHeight: '1.4' }}>{loc.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Eateries and Cafes */}
            <div>
              <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '15px', borderBottom: '2px solid var(--accent-red)', paddingBottom: '5px' }}>🍽️ ร้านอาหารเด็ด & คาเฟ่ชื่อดัง</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {eatAndCafe.map((loc, index) => (
                  <div style={{ display: 'flex', gap: '15px', background: '#ffffff', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }} key={index}>
                    <div style={{ marginTop: '3px' }}>{loc.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong style={{ color: '#111', fontSize: '14px' }}>{loc.title}</strong>
                        <span style={{ color: 'var(--accent-red)', fontSize: '13px', fontWeight: 'bold' }}>{loc.distance}</span>
                      </div>
                      <p style={{ color: 'var(--text-gray)', fontSize: '12px', lineHeight: '1.4' }}>{loc.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Government Offices */}
            <div>
              <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '15px', borderBottom: '2px solid var(--accent-red)', paddingBottom: '5px' }}>🏢 สถานที่ราชการ & หน่วยงานสำคัญ</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                {governmentOffices.map((loc, index) => (
                  <div style={{ display: 'flex', gap: '10px', background: '#fdfdfd', padding: '10px 15px', borderRadius: '8px', border: '1px solid var(--border-color)', alignItems: 'center', justifyContent: 'space-between' }} key={index}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ display: 'inline-flex', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--accent-red)', color: '#fff', fontSize: '11px', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>
                        {index + 1}
                      </span>
                      <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{loc.title}</span>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '11px' }}>
                      <div style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>{loc.distance}</div>
                      <div style={{ color: '#777' }}>🚗 {loc.time}</div>
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
