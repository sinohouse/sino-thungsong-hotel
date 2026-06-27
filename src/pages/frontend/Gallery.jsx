import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Image as ImageIcon, Star, Check } from 'lucide-react';

export default function Gallery() {
  const { reviews, gallery } = useContext(AppContext);
  const [filter, setFilter] = useState('all');
  
  // Reviews submit handling states inside gallery page
  const [localReviews, setLocalReviews] = useState(reviews);
  const [form, setForm] = useState({ name: '', comment: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;

    const newRev = {
      id: localReviews.length + 1,
      name: form.name,
      rating: form.rating,
      comment: form.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setLocalReviews([newRev, ...localReviews]);
    setForm({ name: '', comment: '', rating: 5 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const filteredPhotos = filter === 'all' ? gallery : gallery.filter(p => p.category === filter);

  return (
    <div className="gallery-page" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <section className="gallery-section">
        <div className="section-container">
          
          <div className="section-header text-center">
            <span className="section-subtitle">PHOTO GALLERY</span>
            <h1 className="section-title">แกลเลอรีภาพถ่ายโรงแรม</h1>
            <p className="section-desc">ชมบรรยากาศโดยรอบของโรงแรม ห้องพักสุดสบาย และล็อบบี้ต้อนรับที่พร้อมให้บริการคุณ</p>
          </div>

          {/* Gallery categories filter buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('all')} className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}>ทั้งหมด</button>
            <button onClick={() => setFilter('rooms')} className={`btn btn-sm ${filter === 'rooms' ? 'btn-primary' : 'btn-outline'}`}>ห้องพัก</button>
            <button onClick={() => setFilter('lobby')} className={`btn btn-sm ${filter === 'lobby' ? 'btn-primary' : 'btn-outline'}`}>ล็อบบี้ & ภายใน</button>
            <button onClick={() => setFilter('exterior')} className={`btn btn-sm ${filter === 'exterior' ? 'btn-primary' : 'btn-outline'}`}>ภายนอก & บริเวณใกล้เคียง</button>
          </div>

          {/* Photo gallery cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px', marginBottom: '80px' }}>
            {filteredPhotos.map((photo, index) => (
              <div style={{ background: '#ffffff', borderRadius: '15px', overflow: 'hidden', boxShadow: 'var(--shadow-premium)', border: '1px solid var(--border-color)' }} key={index}>
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img src={photo.src} alt={photo.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }} className="gallery-img-hover" />
                </div>
                <div style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ImageIcon size={16} color="var(--accent-red)" />
                  <span style={{ fontSize: '13px', color: '#111', fontWeight: 'bold' }}>{photo.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 360 Virtual Tour Section */}
          <div className="section-header text-center" style={{ marginBottom: '30px' }}>
            <span className="section-subtitle">VIRTUAL TOUR</span>
            <h2 className="section-title">สำรวจโรงแรมเสมือนจริง 360°</h2>
            <p className="section-desc">หมุนชมทัศนียภาพรอบโรงแรมและบรรยากาศภายนอกของ โรงแรมชิโน ทุ่งสง ได้ทันที</p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '20px', marginBottom: '80px', boxShadow: 'var(--shadow-premium)' }}>
            <div style={{ height: '450px', width: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1782468551259!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ3FvNkhPQnc.!2m2!1d8.170703929039405!2d99.67873649205204!3f316.13600595989124!4f2.3820835480867544!5f0.7820865974627469"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Sino @ Thungsong Hotel 360 View"
              ></iframe>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <a 
                href="https://maps.app.goo.gl/6hDbfUvwBNcebtrc7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-accent"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>🌐 เปิดมุมมอง 360° บน Google Maps (เต็มจอ)</span>
              </a>
            </div>
          </div>

          {/* Integrated Reviews & Rating Block */}
          <div className="section-header text-center" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle">GUEST REVIEWS</span>
            <h2 className="section-title">รีวิว & ความคิดเห็นจากผู้เข้าพักจริง</h2>
            <p className="section-desc">ร่วมแบ่งปันประสบการณ์การพักผ่อนและการเดินทางเพื่อพัฒนาบริการของเรา</p>
          </div>

          <div className="grid-1-2fr" style={{ alignItems: 'start', gap: '50px' }}>
            {/* Reviews listing */}
            <div>
              <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '20px' }}>รีวิวจากผู้เข้าพักล่าสุด</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {localReviews.map((rev) => (
                  <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '15px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }} key={rev.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <strong style={{ color: '#111', fontSize: '15px' }}>{rev.name}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>{rev.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', color: '#e2c077', marginBottom: '15px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < rev.rating ? 'var(--accent-red)' : 'none'} color="var(--accent-red)" />
                      ))}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.5', fontStyle: 'italic' }}>"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Review submitting form card */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '35px', boxShadow: 'var(--shadow-premium)', position: 'sticky', top: '120px' }}>
              <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '20px' }}>เขียนรีวิวห้องพัก</h3>
              
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="form-group">
                  <label>ชื่อของคุณ</label>
                  <input 
                    type="text" 
                    required 
                    value={form.name} 
                    onChange={e => setForm({ ...form, name: e.target.value })} 
                    placeholder="เช่น คุณปรีชา" 
                  />
                </div>

                <div className="form-group">
                  <label>ความพึงพอใจ</label>
                  <select 
                    style={{ backgroundColor: '#ffffff', border: '1px solid #ced4da', color: '#333', padding: '12px 18px', borderRadius: '8px' }}
                    value={form.rating} 
                    onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (ดีเลิศ)</option>
                    <option value="4">⭐⭐⭐⭐ (ดีมาก)</option>
                    <option value="3">⭐⭐⭐ (ปานกลาง)</option>
                    <option value="2">⭐⭐ (พึงพอใจน้อย)</option>
                    <option value="1">⭐ (ต้องปรับปรุง)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>ข้อคิดเห็น / คำแนะนำ</label>
                  <textarea 
                    required 
                    rows="4" 
                    value={form.comment} 
                    onChange={e => setForm({ ...form, comment: e.target.value })} 
                    placeholder="พิมพ์ความคิดเห็นการเข้าพักของคุณที่นี่..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-accent btn-block">ส่งความคิดเห็น</button>
              </form>

              {submitted && (
                <div style={{ display: 'flex', gap: '8px', color: '#4cd964', fontSize: '13px', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
                  <Check size={16} />
                  <span>ขอบคุณสำหรับการส่งรีวิวครับ/ค่ะ!</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
