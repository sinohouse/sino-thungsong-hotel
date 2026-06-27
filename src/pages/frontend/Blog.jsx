import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Calendar, ChevronRight, User } from 'lucide-react';

export default function Blog() {
  const { id } = useParams();
  const { blogs } = useContext(AppContext);

  // If there's an ID, show the individual blog details
  if (id) {
    const blog = blogs.find((b) => b.id === Number(id));
    if (!blog) {
      return (
        <div style={{ padding: '150px 20px', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-dark)', marginBottom: '20px' }}>ไม่พบบทความที่ต้องการ</h2>
          <Link to="/blog" className="btn btn-primary">กลับหน้าบทความทั้งหมด</Link>
        </div>
      );
    }

    return (
      <div className="blog-detail-page" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '60px' }}>
        <section className="blog-section">
          <div className="section-container" style={{ maxWidth: '900px' }}>
            <Link to="/blog" style={{ color: 'var(--accent-red)', marginBottom: '25px', display: 'inline-block', fontSize: '14px', fontWeight: 'bold' }}>
              &larr; กลับหน้าบทความทั้งหมด
            </Link>
            
            {/* Header Banner Cover with Overlay Texts */}
            <div className="blog-detail-banner">
              <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {/* Premium dark gradient overlay */}
              <div className="blog-detail-overlay">
                <div style={{ display: 'flex', gap: '12px', marginBottom: '15px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(217,43,43,0.25)', color: '#fff', padding: '6px 12px', borderRadius: '30px', fontSize: '11px', fontWeight: 'bold', border: '1px solid rgba(217,43,43,0.35)' }}>
                    <Calendar size={12} />
                    {blog.date}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '6px 12px', borderRadius: '30px', fontSize: '11px' }}>
                    <User size={12} />
                    โดย โรงแรม ชิโน ทุ่งสง
                  </span>
                </div>
                <h1 className="blog-detail-title">{blog.title}</h1>
                <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6', margin: 0, borderLeft: '3px solid var(--accent-red)', paddingLeft: '15px' }}>{blog.excerpt}</p>
              </div>
            </div>

            <div style={{ color: 'var(--text-light)', fontSize: '16px', lineHeight: '1.8', whiteSpace: 'pre-wrap', padding: '0 10px' }}>{blog.content}</div>
          </div>
        </section>
      </div>
    );
  }

  // Otherwise, show the list of blogs (5-10 articles)
  return (
    <div className="blog-list-page" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <section className="blog-section">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-subtitle">LOCAL JOURNAL</span>
            <h2 className="section-title">บทความท่องเที่ยว & แหล่งของอร่อย</h2>
            <p className="section-desc">รวมสาระน่ารู้ คู่มือท่องเที่ยว และของเด็ดอำเภอทุ่งสง สำหรับผู้เข้าพักกับเรา</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {blogs.map((blog) => (
              <div 
                style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-soft)', transition: 'all 0.3s ease' }} 
                key={blog.id}
                className="blog-card-hover"
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '25px' }}>
                  <div style={{ display: 'flex', gap: '10px', color: 'var(--text-gray)', fontSize: '12px', marginBottom: '10px' }}>
                    <Calendar size={12} />
                    <span>{blog.date}</span>
                  </div>
                  <h3 style={{ color: 'var(--text-dark)', fontSize: '18px', marginBottom: '12px', lineHeight: '1.4', height: '50px', overflow: 'hidden' }}>{blog.title}</h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px', height: '60px', overflow: 'hidden' }}>{blog.excerpt}</p>
                  <Link to={`/blog/${blog.id}`} style={{ color: 'var(--accent-red)', fontSize: '14px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <span>อ่านเพิ่มเติม</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
