import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ClipboardList, BedDouble, Tag, Users, Home, Edit, Check, LogOut } from 'lucide-react';

export default function RoomAdmin() {
  const { currentUser, logout, rooms, updateRoomRate, dailyAllotments, updateDailyAllotment } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editAllotment, setEditAllotment] = useState('');
  
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [daysCount, setDaysCount] = useState(14);

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleStartEdit = (room) => {
    setEditingId(room.id);
    setEditPrice(room.price);
    setEditAllotment(room.allotment);
  };

  const handleSaveEdit = (id) => {
    updateRoomRate(id, editPrice, editAllotment);
    setEditingId(null);
  };

  const getDatesRange = (start, count) => {
    const list = [];
    const current = new Date(start);
    for (let i = 0; i < count; i++) {
      list.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return list;
  };

  const dates = getDatesRange(startDate, daysCount);

  return (
    <div className="admin-rooms-page" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '60px', backgroundColor: '#fcfcfc' }}>
      <div className="section-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Admin Header Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '25px 30px', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '40px', boxShadow: 'var(--shadow-soft)' }}>
          <div>
            <span style={{ fontSize: '13px', color: 'var(--accent-red)', fontWeight: 'bold' }}>MANAGEMENT SYSTEM</span>
            <h1 style={{ color: '#111', fontSize: '24px', margin: '5px 0 0 0' }}>ตั้งค่าจำนวนและราคาห้องพัก (Allotment)</h1>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid var(--border-color)' }}>
            <LogOut size={14} color="var(--accent-red)" />
            <span style={{ color: 'var(--accent-red)' }}>ออกจากระบบ</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 9.5fr', gap: '40px' }}>
          
          {/* Navigation Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', color: '#333', padding: '15px 20px', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }}>
              <Home size={18} color="var(--accent-red)" />
              <span>ภาพรวมระบบ (Dashboard)</span>
            </Link>
            <Link to="/admin/bookings" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', color: '#333', padding: '15px 20px', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }}>
              <ClipboardList size={18} color="var(--accent-red)" />
              <span>จัดการการจอง</span>
            </Link>
            <Link to="/admin/rooms" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--accent-red)', color: '#ffffff', padding: '15px 20px', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(217,43,43,0.2)' }}>
              <BedDouble size={18} />
              <span>ตั้งค่าห้องพัก & ราคากลาง</span>
            </Link>
            <Link to="/admin/promotions" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', color: '#333', padding: '15px 20px', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }}>
              <Tag size={18} color="var(--accent-red)" />
              <span>จัดการโปรโมชัน</span>
            </Link>
            <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', color: '#333', padding: '15px 20px', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }}>
              <Users size={18} color="var(--accent-red)" />
              <span>ผู้ดูแลระบบหลังบ้าน</span>
            </Link>
          </div>

          {/* Right Area (Allotment Calendar + Room List) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Daily Allotment Calendar */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '30px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-premium)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '25px' }}>
                <div>
                  <h3 style={{ color: '#111', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📅</span> Daily Allotment Calendar (Next {daysCount} Days)
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>Changes saved automatically when you edit the allotment number and click outside the box.</span>
                </div>
                
                {/* Date Controls */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: '#fdfdfd', border: '1px solid var(--border-color)', padding: '10px 15px', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-gray)' }}>Start Date:</span>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ border: '1px solid #ddd', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-gray)' }}>Days:</span>
                    <select value={daysCount} onChange={e => setDaysCount(Number(e.target.value))} style={{ border: '1px solid #ddd', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>
                      <option value={14}>14 Days</option>
                      <option value={30}>30 Days</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Allotment Table Grid */}
              <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#fdfdfd', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '15px', textAlign: 'left', minWidth: '220px', color: '#555', fontWeight: '600' }}>Room Category</th>
                      {dates.map((d, index) => {
                        const day = d.getDate();
                        const month = d.toLocaleDateString('en-US', { month: 'short' });
                        return (
                          <th key={index} style={{ padding: '12px', minWidth: '70px', borderLeft: '1px solid var(--border-color)', color: 'var(--accent-red)', fontWeight: 'bold' }}>
                            <div>{month}</div>
                            <div style={{ fontSize: '16px' }}>{day}</div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map(room => (
                      <tr key={room.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#111' }}>{room.nameTh}</td>
                        {dates.map((d, index) => {
                          const dateStr = d.toISOString().split('T')[0];
                          const key = `${room.id}_${dateStr}`;
                          const val = dailyAllotments[key] !== undefined ? dailyAllotments[key] : room.allotment;
                          
                          return (
                            <td key={index} style={{ padding: '8px', borderLeft: '1px solid var(--border-color)' }}>
                              <input 
                                type="number" 
                                min="0"
                                value={val} 
                                onChange={e => updateDailyAllotment(room.id, dateStr, e.target.value)}
                                style={{ 
                                  width: '50px', 
                                  padding: '6px', 
                                  border: '1px solid #ddd', 
                                  borderRadius: '6px', 
                                  textAlign: 'center', 
                                  fontSize: '14px', 
                                  fontWeight: 'bold',
                                  color: '#333'
                                }} 
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* General Rooms List Panel */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '30px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-premium)' }}>
              <h3 style={{ color: '#111', fontSize: '18px', fontWeight: 'bold', marginBottom: '25px' }}>รายละเอียดห้องพัก & ราคากลาง</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {rooms.map(room => (
                  <div style={{ display: 'flex', gap: '20px', background: '#fdfdfd', padding: '25px', borderRadius: '12px', border: '1px solid var(--border-color)', alignItems: 'center', boxShadow: 'var(--shadow-soft)' }} key={room.id}>
                    <img src={room.image} alt={room.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px' }} />
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: '#111', fontSize: '16px', marginBottom: '8px', fontWeight: 'bold' }}>{room.nameTh}</h4>
                      <p style={{ color: 'var(--text-gray)', fontSize: '13px', lineHeight: '1.4', marginBottom: '15px' }}>{room.desc}</p>
                      
                      {/* Inline edit details */}
                      {editingId === room.id ? (
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label style={{ fontSize: '11px', color: 'var(--text-gray)' }}>ราคาห้องพัก / คืน</label>
                            <input type="number" value={editPrice} onChange={e => setEditPrice(Number(e.target.value))} style={{ padding: '6px 12px', fontSize: '13px' }} />
                          </div>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label style={{ fontSize: '11px', color: 'var(--text-gray)' }}>จำนวนห้องตั้งต้น (Base Allotment)</label>
                            <input type="number" value={editAllotment} onChange={e => setEditAllotment(Number(e.target.value))} style={{ padding: '6px 12px', fontSize: '13px' }} />
                          </div>
                          <button onClick={() => handleSaveEdit(room.id)} className="btn btn-sm btn-primary" style={{ alignSelf: 'flex-end' }}>
                            <Check size={14} style={{ marginRight: '4px' }} />
                            บันทึก
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                          <div>
                            <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>ราคาขายกลาง: </span>
                            <strong style={{ color: 'var(--accent-red)', fontSize: '16px' }}>฿{room.price}</strong>
                            <span style={{ fontSize: '13px', color: 'var(--text-gray)', marginLeft: '20px' }}>จำนวนห้องทั้งหมด: </span>
                            <strong style={{ color: '#111', fontSize: '16px' }}>{room.allotment} ห้อง</strong>
                          </div>
                          <button onClick={() => handleStartEdit(room)} className="btn btn-sm btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--border-color)' }}>
                            <Edit size={12} />
                            แก้ไขราคากลาง
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
