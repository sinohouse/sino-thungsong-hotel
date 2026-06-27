import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Star, MessageSquareCheck, Check } from 'lucide-react';

export default function Reviews() {
  const { reviews } = useContext(AppContext);
  const [localReviews, setLocalReviews] = useState(reviews);
  const [form, setForm] = useState({ name: '', comment: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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

  return (
    <div className="reviews-page" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <section className="reviews-section">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-subtitle">GUEST REVIEWS</span>
            <h2 className="section-title">รีวิวและความประทับใจจากผู้เข้าพัก</h2>
            <p className="section-desc">ความพึงพอใจของลูกค้าคือสิ่งสำคัญที่สุด ร่วมแสดงความคิดเห็นหลังเข้าพักกับเรา</p>
          </div>

          <div className="grid-1-2fr" style={{ gap: '50px' }}>
            {/* Reviews list */}
            <div>
              <h3 style={{ color: 'var(--text-dark)', fontSize: '20px', marginBottom: '20px' }}>รีวิวล่าสุด</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {localReviews.map((rev) => (
                  <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '15px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }} key={rev.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <strong style={{ color: 'var(--text-dark)', fontSize: '15px' }}>{rev.name}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>{rev.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', color: 'var(--accent-red)', marginBottom: '15px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < rev.rating ? 'var(--accent-red)' : 'none'} color="var(--accent-red)" />
                      ))}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.5', fontStyle: 'italic' }}>"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit review form */}
            <div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '35px', position: 'sticky', top: '120px', boxShadow: 'var(--shadow-premium)' }}>
                <h3 style={{ color: 'var(--text-dark)', fontSize: '20px', marginBottom: '20px' }}>เขียนรีวิวของคุณ</h3>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div className="form-group">
                    <label>ชื่อของคุณ</label>
                    <input 
                      type="text" 
                      required 
                      value={form.name} 
                      onChange={e => setForm({ ...form, name: e.target.value })} 
                      placeholder="เช่น คุณสมชาย" 
                    />
                  </div>

                  <div className="form-group">
                    <label>คะแนนความพึงพอใจ</label>
                    <select 
                      style={{ backgroundColor: '#ffffff', border: '1px solid #ced4da', color: 'var(--text-light)', padding: '12px 18px', borderRadius: '8px' }}
                      value={form.rating} 
                      onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (ยอดเยี่ยม)</option>
                      <option value="4">⭐⭐⭐⭐ (ดีมาก)</option>
                      <option value="3">⭐⭐⭐ (ปานกลาง)</option>
                      <option value="2">⭐⭐ (ควรปรับปรุง)</option>
                      <option value="1">⭐ (แย่)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>ความประทับใจ / ข้อความแนะนำ</label>
                    <textarea 
                      required 
                      rows="4" 
                      value={form.comment} 
                      onChange={e => setForm({ ...form, comment: e.target.value })} 
                      placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-accent btn-block">ส่งรีวิว</button>
                </form>

                {submitted && (
                  <div style={{ display: 'flex', gap: '8px', color: '#4cd964', fontSize: '13px', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
                    <Check size={16} />
                    <span>ขอบคุณสำหรับคะแนนและรีวิวของคุณครับ/ค่ะ!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
