import React from 'react';
import { Wifi, Car, ShieldCheck, HelpCircle, Sparkles, Coffee, Tv, Accessibility, MapPin, Navigation, Train, ShoppingBag } from 'lucide-react';

export default function Facilities() {
  const list = [
    { 
      icon: <Car size={36} color="var(--accent-red)" />, 
      title: 'พื้นที่จอดรถกว้างขวาง & ปลอดภัย', 
      desc: 'โรงแรมมีที่จอดรถส่วนตัวรองรับรถยนต์ส่วนบุคคลและรถตู้คณะสัมมนาได้มากกว่า 30 คัน ลานจอดรถติดตั้งไฟส่องสว่างทั่วถึงและควบคุมความปลอดภัยด้วยระบบกล้องวงจรปิด (CCTV) ตลอด 24 ชั่วโมง' 
    },
    { 
      icon: <Wifi size={36} color="var(--accent-red)" />, 
      title: 'ฟรีอินเทอร์เน็ตไฟเบอร์ออฟติกความเร็วสูง', 
      desc: 'บริการ Wi-Fi ความเร็วสูงพิเศษ (Fiber Optic ความเร็วสูงสุด 1000/500 Mbps) ครอบคลุมสัญญาณทุกตารางนิ้วในห้องพัก ล็อบบี้ และพื้นที่ส่วนกลาง ตอบโจทย์ทั้งการพักผ่อนและการทำงานทางไกล (Work from Hotel)' 
    },
    { 
      icon: <HelpCircle size={36} color="var(--accent-red)" />, 
      title: 'แผนกต้อนรับต้อนรับดูแล 24 ชั่วโมง', 
      desc: 'เจ้าหน้าที่ต้อนรับพร้อมสแตนด์บายให้บริการเช็คอิน-เช็คเอาต์ อำนวยความสะดวกในเรื่องข้อมูลการเดินทางในอำเภอทุ่งสง แนะนำแหล่งอาหารของกินอร่อยๆ และบริการรับฝากสัมภาระอย่างปลอดภัย' 
    },
    { 
      icon: <ShieldCheck size={36} color="var(--accent-red)" />, 
      title: 'มาตรฐานความสะอาดระดับสากล (SHA)', 
      desc: 'ทำความสะอาดจุดสัมผัสสาธารณะทุกชั่วโมงด้วยน้ำยาฆ่าเชื้อ พนักงานผ่านการอบรมสุขอนามัยวิถีใหม่ และมีการจัดวางเจลแอลกอฮอล์ล้างมือในจุดบริการหลักอย่างทั่วถึง' 
    },
    { 
      icon: <Sparkles size={36} color="var(--accent-red)" />, 
      title: 'แม่บ้านดูแลและทำความสะอาดรายวัน', 
      desc: 'บริการทำความสะอาดห้องพัก เปลี่ยนถังขยะ และจัดระเบียบห้องพักทุกวันโดยช่างฝีมือแม่บ้านระดับมาตรฐาน พร้อมจัดเตรียมชุดผ้าเช็ดตัวใหม่เอี่ยม ผ้าเช็ดเท้า และสบู่แชมพูใหม่ทุกวัน' 
    },
    { 
      icon: <Coffee size={36} color="var(--accent-red)" />, 
      title: 'พื้นที่ล็อบบี้ต้อนรับและการจัดจำหน่ายเครื่องดื่ม', 
      desc: 'ล็อบบี้ต้อนรับขนาดใหญ่ดีไซน์สว่างโปร่งสบาย นั่งพักผ่อนเช็คอินได้ผ่อนคลาย พร้อมมุมตู้แช่เครื่องดื่มเย็นๆ น้ำอัดลม น้ำเปล่า และขนมขบเคี้ยวไว้บริการจำหน่ายที่เคาน์เตอร์' 
    },
    {
      icon: <Tv size={36} color="var(--accent-red)" />,
      title: 'สิ่งบันเทิงและสมาร์ททีวีครบครัน',
      desc: 'ห้องพักติดตั้งทีวีจอแอลอีดีขนาดใหญ่ รองรับช่องสัญญาณเคเบิลทีวีหลัก และระบบสมาร์ททีวีให้คุณเชื่อมต่อรับชมความบันเทิงอย่าง YouTube หรือสตรีมมิ่งอื่นๆ ได้อย่างเพลิดเพลิน'
    },
    {
      icon: <Accessibility size={36} color="var(--accent-red)" />,
      title: 'การออกแบบทางเข้าออกที่สะดวกสบาย',
      desc: 'โครงสร้างโรงแรมออกแบบมาเพื่อรองรับผู้เดินทางทุกกลุ่ม มีราวจับและทางลาดสำหรับกระเป๋าเดินทางล้อลากขนาดใหญ่ ช่วยให้การขนย้ายสัมภาระเข้าห้องพักเป็นเรื่องง่ายดาย'
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
            <p className="section-desc">ทำเลใจกลางเมืองทุ่งสง เดินทางเข้าออกได้สะดวก ใกล้แหล่งของกินและสถานที่สำคัญหลัก</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '50px' }}>
            {/* Map wrapper */}
            <div>
              <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '15px', height: '400px', boxShadow: 'var(--shadow-premium)', overflow: 'hidden' }}>
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

            {/* Nearby list details */}
            <div>
              <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '15px', borderBottom: '2px solid var(--accent-red)', paddingBottom: '5px' }}>📍 จุดเดินทาง & ร้านค้าใกล้เคียง</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
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

              <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '15px', borderBottom: '2px solid var(--accent-red)', paddingBottom: '5px' }}>🏢 สถานที่ราชการ & หน่วยงานสำคัญใกล้เคียง</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
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
