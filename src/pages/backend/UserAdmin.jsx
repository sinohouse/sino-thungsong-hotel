import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ClipboardList, BedDouble, Tag, Users, Home, UserPlus, Trash2, LogOut } from 'lucide-react';

export default function UserAdmin() {
  const { currentUser, logout, users, addUser, removeUser } = useContext(AppContext);
  const navigate = useNavigate();

  // New User Form State
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Receptionist');

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !name) return;

    addUser({
      username: username.trim(),
      name: name.trim(),
      role
    });

    setUsername('');
    setName('');
  };

  return (
    <div className="admin-users-page" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="section-container">
        
        {/* Admin Header Info */}
        <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', background: '#181822', padding: '25px 30px', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '40px' }}>
          <div>
            <span style={{ fontSize: '13px', color: '#e2c077', fontWeight: 'bold' }}>MANAGEMENT SYSTEM</span>
            <h1 style={{ color: '#fff', fontSize: '24px', margin: '5px 0 0 0' }}>จัดการบัญชีผู้ดูแลระบบหลังบ้าน</h1>
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
            <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--accent-gold)', color: '#272730', padding: '15px 20px', borderRadius: '10px', fontWeight: 'bold' }}>
              <Users size={18} />
              <span>ผู้ดูแลระบบหลังบ้าน</span>
            </Link>
          </div>

          {/* Users Admin Panel Area */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
            
            {/* Active Accounts list */}
            <div style={{ backgroundColor: '#181822', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>รายชื่อบัญชีผู้ใช้งานระบบ</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {users.map(user => (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '15px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }} key={user.id}>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '15px' }}>{user.name}</strong>
                      <span style={{ fontSize: '12px', color: '#a1a1b5', display: 'block', marginTop: '2px' }}>Username: <code>{user.username}</code> ({user.role})</span>
                    </div>
                    {/* Delete user button - restrict from deleting self */}
                    {currentUser.id !== user.id && (
                      <button onClick={() => removeUser(user.id)} style={{ color: '#d92b2b' }} title="ลบบัญชีผู้ใช้">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Create new Administrator account form */}
            <div style={{ backgroundColor: '#181822', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.03)', height: 'fit-content' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>เพิ่มผู้ใช้งานใหม่</h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="form-group">
                  <label>ชื่อผู้จดทะเบียน (Name)</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="เช่น สมจิตร ยอดรัก" />
                </div>
                
                <div className="form-group">
                  <label>ชื่อบัญชีผู้ใช้ (Username)</label>
                  <input type="text" required value={username} onChange={e => setUsername(e.target.value)} placeholder="เช่น somjit_sino" />
                </div>

                <div className="form-group">
                  <label>ตำแหน่ง / บทบาท</label>
                  <select 
                    style={{ backgroundColor: '#212130', border: '1px solid rgba(255,255,255,0.05)', color: '#fff', padding: '10px 15px', borderRadius: '8px' }}
                    value={role} 
                    onChange={e => setRole(e.target.value)}
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-accent btn-block">
                  <UserPlus size={16} style={{ marginRight: '4px' }} />
                  เพิ่มผู้ใช้งาน
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
