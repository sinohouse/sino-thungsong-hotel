import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ClipboardList, BedDouble, Tag, Users, Home, FileText, Plus, Trash2, Edit2, LogOut, Save, X, Image as ImageIcon } from 'lucide-react';

export default function BlogAdmin() {
  const { currentUser, logout, blogs, addBlog, deleteBlog, updateBlog } = useContext(AppContext);
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState(null);

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !excerpt || !content || !image) return;

    if (editingId) {
      updateBlog({
        id: editingId,
        title: title.trim(),
        date,
        excerpt: excerpt.trim(),
        content: content.trim(),
        image: image.trim()
      });
      setEditingId(null);
    } else {
      addBlog({
        title: title.trim(),
        date,
        excerpt: excerpt.trim(),
        content: content.trim(),
        image: image.trim()
      });
    }

    resetForm();
  };

  const handleStartEdit = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setDate(blog.date);
    setExcerpt(blog.excerpt || '');
    setContent(blog.content || '');
    setImage(blog.image || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setExcerpt('');
    setContent('');
    setImage('');
  };

  return (
    <div className="admin-blogs-page" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="section-container">
        
        {/* Admin Header Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#181822', padding: '25px 30px', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '40px' }}>
          <div>
            <span style={{ fontSize: '13px', color: '#e2c077', fontWeight: 'bold' }}>MANAGEMENT SYSTEM</span>
            <h1 style={{ color: '#fff', fontSize: '24px', margin: '5px 0 0 0' }}>จัดการบทความท่องเที่ยว & ของอร่อย (Blogs)</h1>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LogOut size={14} />
            <span>ออกจากระบบ</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 7.5fr', gap: '40px' }}>
          
          {/* Navigation Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }}>
              <Home size={18} color="#e2c077" />
              <span>ภาพรวมระบบ (Dashboard)</span>
            </Link>
            <Link to="/admin/bookings" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <ClipboardList size={18} color="#e2c077" />
              <span>จัดการการจอง</span>
            </Link>
            <Link to="/admin/rooms" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <BedDouble size={18} color="#e2c077" />
              <span>ตั้งค่าห้องพัก & ราคากลาง</span>
            </Link>
            <Link to="/admin/promotions" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <Tag size={18} color="#e2c077" />
              <span>จัดการโปรโมชัน</span>
            </Link>
            <Link to="/admin/gallery" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <ImageIcon size={18} color="#e2c077" />
              <span>จัดการรูปภาพแกลเลอรี</span>
            </Link>
            <Link to="/admin/blogs" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--accent-gold)', color: '#272730', padding: '15px 20px', borderRadius: '10px', fontWeight: 'bold' }}>
              <FileText size={18} />
              <span>จัดการบทความท่องเที่ยว</span>
            </Link>
            <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <Users size={18} color="#e2c077" />
              <span>ผู้ดูแลระบบหลังบ้าน</span>
            </Link>
          </div>

          {/* Blogs Admin Panel Area */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
            
            {/* Blogs List */}
            <div style={{ backgroundColor: '#181822', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>บทความทั้งหมด ({blogs.length} บทความ)</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {blogs.map(blog => (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '15px' }} key={blog.id}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                      <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <strong style={{ color: '#fff', fontSize: '15px', display: 'block', height: '40px', overflow: 'hidden' }}>{blog.title}</strong>
                        <span style={{ fontSize: '11px', color: '#a1a1b5', display: 'block', marginTop: '4px' }}>วันที่: {blog.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                        <button onClick={() => handleStartEdit(blog)} style={{ color: '#e2c077', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
                          <Edit2 size={13} />
                          <span>แก้ไข</span>
                        </button>
                        <button onClick={() => deleteBlog(blog.id)} style={{ color: '#d92b2b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={13} />
                          <span>ลบ</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create/Edit Blog Form */}
            <div style={{ backgroundColor: '#181822', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.03)', height: 'fit-content' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>
                {editingId ? 'แก้ไขบทความ' : 'สร้างบทความใหม่'}
              </h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: '#a1a1b5', display: 'block', marginBottom: '6px' }}>หัวข้อบทความ (Title)</label>
                  <input 
                    type="text" 
                    className="input-glow" 
                    style={{ width: '100%', background: '#272730', border: '1px solid #3d3d4e', color: '#fff', padding: '10px 14px', borderRadius: '8px', fontSize: '14px' }}
                    placeholder="ป้อนหัวข้อบทความ เช่น เที่ยวทุ่งสง..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#a1a1b5', display: 'block', marginBottom: '6px' }}>วันที่เผยแพร่ (Date)</label>
                  <input 
                    type="date" 
                    className="input-glow" 
                    style={{ width: '100%', background: '#272730', border: '1px solid #3d3d4e', color: '#fff', padding: '10px 14px', borderRadius: '8px', fontSize: '14px' }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#a1a1b5', display: 'block', marginBottom: '6px' }}>ลิงก์รูปหน้าปก (Cover Image URL)</label>
                  <input 
                    type="text" 
                    className="input-glow" 
                    style={{ width: '100%', background: '#272730', border: '1px solid #3d3d4e', color: '#fff', padding: '10px 14px', borderRadius: '8px', fontSize: '14px' }}
                    placeholder="ป้อนลิงก์รูปหน้าปกบทความ"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#a1a1b5', display: 'block', marginBottom: '6px' }}>บทคัดย่อ (Excerpt)</label>
                  <textarea 
                    className="input-glow" 
                    style={{ width: '100%', background: '#272730', border: '1px solid #3d3d4e', color: '#fff', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', minHeight: '80px', resize: 'vertical' }}
                    placeholder="คำโปรยสั้นๆ หน้าแรกสำหรับดึงดูดผู้อ่าน..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#a1a1b5', display: 'block', marginBottom: '6px' }}>เนื้อหาหลัก (Content)</label>
                  <textarea 
                    className="input-glow" 
                    style={{ width: '100%', background: '#272730', border: '1px solid #3d3d4e', color: '#fff', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', minHeight: '200px', resize: 'vertical', lineHeight: '1.6' }}
                    placeholder="ป้อนเนื้อหาหลักยาวๆ สามารถขึ้นบรรทัดใหม่ได้..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-accent" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {editingId ? <Save size={16} /> : <Plus size={16} />}
                    <span>{editingId ? 'บันทึกบทความ' : 'สร้างบทความ'}</span>
                  </button>
                  {editingId && (
                    <button type="button" onClick={handleCancelEdit} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <X size={16} />
                      <span>ยกเลิก</span>
                    </button>
                  )}
                </div>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
