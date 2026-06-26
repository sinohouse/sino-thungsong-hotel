import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus(`ขอบคุณคุณ ${form.name}! ข้อความของคุณถูกส่งแล้ว เจ้าหน้าที่จะตอบกลับโดยเร็วที่สุดครับ`);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    }, 1200);
  };

  return (
    <div className="contact-page" style={{ paddingTop: '100px' }}>
      <section className="contact-section">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-subtitle">GET IN TOUCH</span>
            <h2 className="section-title">ติดต่อเรา / สอบถามข้อมูล</h2>
            <p className="section-desc">คุณสามารถโทรจองห้องพัก สอบถามรายละเอียดเส้นทาง หรือเยี่ยมชมโรงแรมได้ตลอด 24 ชั่วโมง</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            {/* Contact Info */}
            <div>
              <h3 style={{ color: '#fff', fontSize: '22px', marginBottom: '25px' }}>ข้อมูลการติดต่อ</h3>
              <p style={{ color: '#a1a1b5', fontSize: '15px', lineHeight: '1.6', marginBottom: '35px' }}>หากต้องการจองห้องพักเร่งด่วน แนะนำโทรจองโดยตรงกับทางเจ้าหน้าที่เคาน์เตอร์ส่วนหน้าเพื่อรับส่วนลดสูงสุดและคอนเฟิร์มสิทธิ์เข้าพักทันทีครับ</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ backgroundColor: 'rgba(226, 192, 119, 0.08)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} color="#e2c077" />
                  </div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '15px', display: 'block', marginBottom: '4px' }}>ที่ตั้งโรงแรม</strong>
                    <span style={{ color: '#a1a1b5', fontSize: '14px' }}>36/10 ถนนรถไฟ ตำบลปากแพรก อำเภอทุ่งสง จังหวัดนครศรีธรรมราช 80110</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ backgroundColor: 'rgba(226, 192, 119, 0.08)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} color="#e2c077" />
                  </div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '15px', display: 'block', marginBottom: '4px' }}>โทรศัพท์</strong>
                    <span style={{ color: '#a1a1b5', fontSize: '14px' }}>
                      <a href="tel:0887572195" style={{ color: '#a1a1b5' }}>088-757-2195</a> , <a href="tel:075332088" style={{ color: '#a1a1b5' }}>075-332-088</a>
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ backgroundColor: 'rgba(226, 192, 119, 0.08)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} color="#e2c077" />
                  </div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '15px', display: 'block', marginBottom: '4px' }}>อีเมลฝ่ายบริการ</strong>
                    <span style={{ color: '#a1a1b5', fontSize: '14px' }}>
                      <a href="mailto:RESERVATION@THUNGSONGHOTEL.COM" style={{ color: '#a1a1b5' }}>RESERVATION@THUNGSONGHOTEL.COM</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ backgroundColor: '#181822', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '35px' }}>
              <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '25px' }}>ฝากข้อความถึงเรา</h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="form-group">
                  <label>ชื่อ-นามสกุล ของคุณ</label>
                  <input 
                    type="text" 
                    required 
                    value={form.name} 
                    onChange={e => setForm({ ...form, name: e.target.value })} 
                    placeholder="พิมพ์ชื่อของคุณที่นี่" 
                  />
                </div>
                
                <div className="form-group">
                  <label>อีเมลติดต่อกลับ</label>
                  <input 
                    type="email" 
                    required 
                    value={form.email} 
                    onChange={e => setForm({ ...form, email: e.target.value })} 
                    placeholder="example@email.com" 
                  />
                </div>

                <div className="form-group">
                  <label>รายละเอียด / ข้อความ</label>
                  <textarea 
                    required 
                    rows="4" 
                    value={form.message} 
                    onChange={e => setForm({ ...form, message: e.target.value })} 
                    placeholder="พิมพ์เรื่องที่ต้องการสอบถามหรือความต้องการเพิ่มเติม..."
                  ></textarea>
                </div>

                <button type="submit" disabled={loading} className="btn btn-accent btn-block">
                  <Send size={16} style={{ marginRight: '6px' }} />
                  <span>{loading ? 'กำลังส่ง...' : 'ส่งข้อความ'}</span>
                </button>
              </form>

              {status && (
                <div style={{ display: 'flex', gap: '8px', color: '#4cd964', fontSize: '13px', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
                  <Check size={16} />
                  <span>{status}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
