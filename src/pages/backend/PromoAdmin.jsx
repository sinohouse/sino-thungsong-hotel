import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ClipboardList, BedDouble, Tag, Users, Home, Plus, Trash2, LogOut } from 'lucide-react';

export default function PromoAdmin() {
  const { currentUser, logout, promotions, addPromotion, removePromotion } = useContext(AppContext);
  const navigate = useNavigate();

  // Form states for new promo
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [type, setType] = useState('percent');
  const [label, setLabel] = useState('');

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code || !discount || !label) return;

    addPromotion({
      code: code.toUpperCase().trim(),
      discount: Number(discount),
      type,
      label
    });

    setCode('');
    setDiscount('');
    setLabel('');
  };

  return (
    <div className="admin-promos-page" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="section-container">
        
        {/* Admin Header Info */}
        <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', background: '#181822', padding: '25px 30px', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '40px' }}>
          <div>
            <span style={{ fontSize: '13px', color: '#e2c077', fontWeight: 'bold' }}>MANAGEMENT SYSTEM</span>
            <h1 style={{ color: '#fff', fontSize: '24px', margin: '5px 0 0 0' }}>จัดการรหัสโปรโมชัน & ส่วนลด</h1>
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
            <Link to="/admin/promotions" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--accent-gold)', color: '#272730', padding: '15px 20px', borderRadius: '10px', fontWeight: 'bold' }}>
              <Tag size={18} />
              <span>จัดการโปรโมชัน</span>
            </Link>
            <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <Users size={18} color="#e2c077" />
              <span>ผู้ดูแลระบบหลังบ้าน</span>
            </Link>
          </div>

          {/* Promos Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
            
            {/* Active Promo Codes List */}
            <div style={{ backgroundColor: '#181822', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>รหัสโปรโมชันที่กำลังใช้งาน</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {promotions.map(promo => (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '15px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }} key={promo.code}>
                    <div>
                      <strong style={{ color: '#e2c077', fontSize: '16px', letterSpacing: '1px' }}>{promo.code}</strong>
                      <span style={{ fontSize: '12px', color: '#a1a1b5', display: 'block', marginTop: '2px' }}>{promo.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <span style={{ color: '#fff', fontWeight: 'bold' }}>
                        {promo.type === 'percent' ? `ส่วนลด ${promo.discount}%` : `ลด ฿${promo.discount}`}
                      </span>
                      <button onClick={() => removePromotion(promo.code)} style={{ color: '#d92b2b' }} title="ลบโค้ดโปรโมชัน">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Promo Code form */}
            <div style={{ backgroundColor: '#181822', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.03)', height: 'fit-content' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>สร้างโปรโมชันใหม่</h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="form-group">
                  <label>รหัสโค้ดส่วนลด (Promo Code)</label>
                  <input type="text" required value={code} onChange={e => setCode(e.target.value)} placeholder="เช่น SINO30" />
                </div>
                
                <div className="form-group">
                  <label>คำอธิบายสั้นๆ</label>
                  <input type="text" required value={label} onChange={e => setLabel(e.target.value)} placeholder="เช่น ลดช่วงเทศกาลสงกรานต์" />
                </div>

                <div className="form-group">
                  <label>ประเภทส่วนลด</label>
                  <select 
                    style={{ backgroundColor: '#212130', border: '1px solid rgba(255,255,255,0.05)', color: '#fff', padding: '10px 15px', borderRadius: '8px' }}
                    value={type} 
                    onChange={e => setType(e.target.value)}
                  >
                    <option value="percent">คิดเป็นเปอร์เซ็นต์ (%)</option>
                    <option value="fixed">ลดจำนวนเงินตรงๆ (บาท)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>จำนวนส่วนลด</label>
                  <input type="number" required value={discount} onChange={e => setDiscount(e.target.value)} placeholder="เช่น 10 หรือ 100" />
                </div>

                <button type="submit" className="btn btn-accent btn-block">
                  <Plus size={16} style={{ marginRight: '4px' }} />
                  สร้างโปรโมชัน
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
