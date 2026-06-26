import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ClipboardList, BedDouble, Tag, Users, Home, Image as ImageIcon, Plus, Trash2, Edit2, LogOut, Save, X, FileText } from 'lucide-react';

export default function GalleryAdmin() {
  const { currentUser, logout, gallery, addGalleryPhoto, deleteGalleryPhoto, updateGalleryPhoto } = useContext(AppContext);
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState('');
  const [src, setSrc] = useState('');
  const [category, setCategory] = useState('exterior');

  // Editing state
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSrc, setEditSrc] = useState('');
  const [editCategory, setEditCategory] = useState('exterior');

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!title || !src) return;

    addGalleryPhoto({
      title: title.trim(),
      src: src.trim(),
      category
    });

    setTitle('');
    setSrc('');
    setCategory('exterior');
  };

  const handleStartEdit = (photo) => {
    setEditingPhoto(photo.id);
    setEditTitle(photo.title);
    setEditSrc(photo.src);
    setEditCategory(photo.category);
  };

  const handleCancelEdit = () => {
    setEditingPhoto(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle || !editSrc) return;

    updateGalleryPhoto({
      id: editingPhoto,
      title: editTitle.trim(),
      src: editSrc.trim(),
      category: editCategory
    });

    setEditingPhoto(null);
  };

  return (
    <div className="admin-gallery-page" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="section-container">
        
        {/* Admin Header Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#181822', padding: '25px 30px', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '40px' }}>
          <div>
            <span style={{ fontSize: '13px', color: '#e2c077', fontWeight: 'bold' }}>MANAGEMENT SYSTEM</span>
            <h1 style={{ color: '#fff', fontSize: '24px', margin: '5px 0 0 0' }}>จัดการรูปภาพแกลเลอรี (Photo Gallery)</h1>
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
            <Link to="/admin/gallery" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--accent-gold)', color: '#272730', padding: '15px 20px', borderRadius: '10px', fontWeight: 'bold' }}>
              <ImageIcon size={18} />
              <span>จัดการรูปภาพแกลเลอรี</span>
            </Link>
            <Link to="/admin/blogs" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <FileText size={18} color="#e2c077" />
              <span>จัดการบทความท่องเที่ยว</span>
            </Link>
            <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <Users size={18} color="#e2c077" />
              <span>ผู้ดูแลระบบหลังบ้าน</span>
            </Link>
          </div>

          {/* Gallery Admin Panel Area */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
            
            {/* Gallery Images List */}
            <div style={{ backgroundColor: '#181822', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>รูปภาพในแกลเลอรี ({gallery.length} รูป)</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {gallery.map(photo => (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }} key={photo.id}>
                    {editingPhoto === photo.id ? (
                      /* Edit Mode Form */
                      <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '12px', color: '#a1a1b5', display: 'block', marginBottom: '4px' }}>ชื่อรูปภาพ / คำอธิบาย</label>
                          <input 
                            type="text" 
                            className="input-glow" 
                            style={{ width: '100%', background: '#272730', border: '1px solid #3d3d4e', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '14px' }}
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', color: '#a1a1b5', display: 'block', marginBottom: '4px' }}>ลิงก์รูปภาพ (Image URL)</label>
                          <input 
                            type="text" 
                            className="input-glow" 
                            style={{ width: '100%', background: '#272730', border: '1px solid #3d3d4e', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '14px' }}
                            value={editSrc}
                            onChange={(e) => setEditSrc(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', color: '#a1a1b5', display: 'block', marginBottom: '4px' }}>หมวดหมู่ (Category)</label>
                          <select
                            style={{ width: '100%', background: '#272730', border: '1px solid #3d3d4e', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '14px' }}
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                          >
                            <option value="rooms">ห้องพัก (rooms)</option>
                            <option value="lobby">ล็อบบี้ & ภายใน (lobby)</option>
                            <option value="exterior">ภายนอก & บริเวณใกล้เคียง (exterior)</option>
                          </select>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                          <button type="submit" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--accent-gold)', color: '#111' }}>
                            <Save size={14} />
                            <span>บันทึก</span>
                          </button>
                          <button type="button" onClick={handleCancelEdit} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <X size={14} />
                            <span>ยกเลิก</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* Display Mode */
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ width: '90px', height: '90px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                          <img src={photo.src} alt={photo.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <strong style={{ color: '#fff', fontSize: '15px', display: 'block' }}>{photo.title}</strong>
                            <span style={{ fontSize: '11px', color: '#e2c077', background: 'rgba(226,192,119,0.1)', padding: '2px 8px', borderRadius: '12px', display: 'inline-block', marginTop: '5px' }}>
                              {photo.category === 'rooms' ? 'ห้องพัก' : photo.category === 'lobby' ? 'ล็อบบี้' : 'ภายนอก'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '15px', marginTop: '8px' }}>
                            <button onClick={() => handleStartEdit(photo)} style={{ color: '#e2c077', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
                              <Edit2 size={13} />
                              <span>แก้ไข</span>
                            </button>
                            <button onClick={() => deleteGalleryPhoto(photo.id)} style={{ color: '#d92b2b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
                              <Trash2 size={13} />
                              <span>ลบรูป</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Photo Form */}
            <div style={{ backgroundColor: '#181822', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.03)', height: 'fit-content' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>เพิ่มรูปภาพใหม่</h3>
              <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: '#a1a1b5', display: 'block', marginBottom: '6px' }}>ชื่อรูปภาพ / คำอธิบาย</label>
                  <input 
                    type="text" 
                    className="input-glow" 
                    style={{ width: '100%', background: '#272730', border: '1px solid #3d3d4e', color: '#fff', padding: '10px 14px', borderRadius: '8px', fontSize: '14px' }}
                    placeholder="เช่น ห้อง Deluxe King, หน้าโรงแรมตอนเย็น"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#a1a1b5', display: 'block', marginBottom: '6px' }}>ลิงก์รูปภาพ (Image URL)</label>
                  <input 
                    type="text" 
                    className="input-glow" 
                    style={{ width: '100%', background: '#272730', border: '1px solid #3d3d4e', color: '#fff', padding: '10px 14px', borderRadius: '8px', fontSize: '14px' }}
                    placeholder="ป้อนลิ้งก์ URL รูปภาพหลัก"
                    value={src}
                    onChange={(e) => setSrc(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#a1a1b5', display: 'block', marginBottom: '6px' }}>หมวดหมู่ (Category)</label>
                  <select
                    style={{ width: '100%', background: '#272730', border: '1px solid #3d3d4e', color: '#fff', padding: '10px 14px', borderRadius: '8px', fontSize: '14px' }}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="rooms">ห้องพัก (rooms)</option>
                    <option value="lobby">ล็อบบี้ & ภายใน (lobby)</option>
                    <option value="exterior">ภายนอก & บริเวณใกล้เคียง (exterior)</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-accent" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
                  <Plus size={16} />
                  <span>เพิ่มลงแกลเลอรี</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
