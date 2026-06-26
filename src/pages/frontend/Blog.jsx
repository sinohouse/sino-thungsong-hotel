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
          <h2 style={{ color: '#fff', marginBottom: '20px' }}>ไม่พบบทความที่ต้องการ</h2>
          <Link to="/blog" className="btn btn-primary">กลับหน้าบทความทั้งหมด</Link>
        </div>
      );
    }

    return (
      <div className="blog-detail-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <section className="blog-section">
          <div className="section-container" style={{ maxWidth: '800px' }}>
            <Link to="/blog" style={{ color: '#e2c077', marginBottom: '25px', display: 'inline-block', fontSize: '14px' }}>
              &larr; กลับหน้าบทความทั้งหมด
            </Link>
            
            <div style={{ borderRadius: '20px', overflow: 'hidden', height: '400px', marginBottom: '30px' }}>
              <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', gap: '15px', color: '#a1a1b5', fontSize: '13px', marginBottom: '15px', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={14} />
                {blog.date}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <User size={14} />
                โดย โรงแรม ชิโน ทุ่งสง
              </span>
            </div>

            <h1 style={{ color: '#fff', fontSize: '32px', marginBottom: '20px', lineHeight: '1.3' }}>{blog.title}</h1>
            <div style={{ color: '#f1f1f5', fontSize: '15px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{blog.content}</div>
          </div>
        </section>
      </div>
    );
  }

  // Otherwise, show the list of blogs (5-10 articles)
  return (
    <div className="blog-list-page" style={{ paddingTop: '100px' }}>
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
                style={{ backgroundColor: '#181822', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.2)', transition: 'all 0.3s ease' }} 
                key={blog.id}
                className="blog-card-hover"
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '25px' }}>
                  <div style={{ display: 'flex', gap: '10px', color: '#a1a1b5', fontSize: '12px', marginBottom: '10px' }}>
                    <Calendar size={12} />
                    <span>{blog.date}</span>
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '12px', lineHeight: '1.4', height: '50px', overflow: 'hidden' }}>{blog.title}</h3>
                  <p style={{ color: '#a1a1b5', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px', height: '60px', overflow: 'hidden' }}>{blog.excerpt}</p>
                  <Link to={`/blog/${blog.id}`} style={{ color: '#e2c077', fontSize: '14px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
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
