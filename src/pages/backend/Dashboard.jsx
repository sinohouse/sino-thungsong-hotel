import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { CalendarRange, BedDouble, Tag, Users, Home, ClipboardList, LogOut, Image as ImageIcon, FileText } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, logout, bookings, rooms, promotions, users } = useContext(AppContext);
  const navigate = useNavigate();

  // Route security check
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  // Calculations
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const approvedBookings = bookings.filter(b => b.status === 'Approved').length;
  const totalRevenue = bookings.filter(b => b.status === 'Approved').reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="admin-dashboard-page" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="section-container">
        
        {/* Admin Header Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#181822', padding: '25px 30px', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '40px' }}>
          <div>
            <span style={{ fontSize: '13px', color: '#e2c077', fontWeight: 'bold' }}>SINO @ THUNGSONG CONTROL CENTER</span>
            <h1 style={{ color: '#fff', fontSize: '24px', margin: '5px 0 0 0' }}>ยินดีต้อนรับ, {currentUser.name} ({currentUser.role})</h1>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LogOut size={14} />
            <span>ออกจากระบบ</span>
          </button>
        </div>

        {/* Dashboard Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 7.5fr', gap: '40px' }}>
          
          {/* Admin Sidebar Navigation Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--accent-gold)', color: '#272730', padding: '15px 20px', borderRadius: '10px', fontWeight: 'bold' }}>
              <Home size={18} />
              <span>ภาพรวมระบบ (Dashboard)</span>
            </Link>
            <Link to="/admin/bookings" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <ClipboardList size={18} color="#e2c077" />
              <span>จัดการการจอง ({pendingBookings} รออนุมัติ)</span>
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
            <Link to="/admin/blogs" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <FileText size={18} color="#e2c077" />
              <span>จัดการบทความท่องเที่ยว</span>
            </Link>
            <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <Users size={18} color="#e2c077" />
              <span>ผู้ดูแลระบบหลังบ้าน</span>
            </Link>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', marginTop: '10px' }}>
              <Link to="/" style={{ fontSize: '13px', color: '#e2c077', textAlign: 'center', display: 'block' }}>&larr; กลับสู่หน้าหลักฝั่งลูกค้า</Link>
            </div>
          </div>

          {/* Admin Stats Content Grid */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
              <div style={{ background: '#181822', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontSize: '12px', color: '#a1a1b5', display: 'block', marginBottom: '8px' }}>การจองที่รอการอนุมัติ</span>
                <strong style={{ fontSize: '32px', color: '#d92b2b' }}>{pendingBookings} รายการ</strong>
              </div>
              <div style={{ background: '#181822', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontSize: '12px', color: '#a1a1b5', display: 'block', marginBottom: '8px' }}>อนุมัติห้องพักแล้ว</span>
                <strong style={{ fontSize: '32px', color: '#4cd964' }}>{approvedBookings} รายการ</strong>
              </div>
              <div style={{ background: '#181822', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontSize: '12px', color: '#a1a1b5', display: 'block', marginBottom: '8px' }}>รายได้รวมที่อนุมัติแล้ว</span>
                <strong style={{ fontSize: '32px', color: '#e2c077' }}>฿{totalRevenue}</strong>
              </div>
            </div>

            {/* Quick Summary list of rooms allotment */}
            <div style={{ backgroundColor: '#181822', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.03)', marginBottom: '40px' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>สถานะจำนวนห้องพัก & ราคาขายวันนี้</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {rooms.map(room => (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '15px 25px', borderRadius: '8px' }} key={room.id}>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '15px', display: 'block' }}>{room.nameTh}</strong>
                      <span style={{ fontSize: '12px', color: '#a1a1b5' }}>Allotment: {room.allotment} ห้อง/วัน</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#e2c077' }}>฿{room.price} / คืน</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent bookings summary */}
            <div style={{ backgroundColor: '#181822', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>รายการจองห้องพักล่าสุด</h3>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
                      <th style={{ padding: '12px 10px' }}>รหัสจอง</th>
                      <th style={{ padding: '12px 10px' }}>ชื่อผู้จอง</th>
                      <th style={{ padding: '12px 10px' }}>ห้องพัก</th>
                      <th style={{ padding: '12px 10px' }}>วันที่เข้าพัก</th>
                      <th style={{ padding: '12px 10px' }}>สถานะ</th>
                      <th style={{ padding: '12px 10px' }}>ยอดชำระ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map(b => (
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} key={b.id}>
                        <td style={{ padding: '15px 10px', color: '#e2c077', fontFamily: 'Outfit', fontWeight: 'bold' }}>{b.id}</td>
                        <td style={{ padding: '15px 10px', color: '#fff' }}>{b.customerName}</td>
                        <td style={{ padding: '15px 10px', color: '#a1a1b5' }}>{b.roomName}</td>
                        <td style={{ padding: '15px 10px', color: '#a1a1b5', fontSize: '13px' }}>{b.checkIn} ถึง {b.checkOut}</td>
                        <td style={{ padding: '15px 10px' }}>
                          <span style={{ 
                            fontSize: '11px', 
                            padding: '4px 8px', 
                            borderRadius: '30px', 
                            fontWeight: 'bold',
                            backgroundColor: b.status === 'Approved' ? 'rgba(76,217,100,0.15)' : b.status === 'Pending' ? 'rgba(226,192,119,0.15)' : 'rgba(217,43,43,0.15)',
                            color: b.status === 'Approved' ? '#4cd964' : b.status === 'Pending' ? '#e2c077' : '#d92b2b'
                          }}>
                            {b.status === 'Approved' ? 'อนุมัติแล้ว' : b.status === 'Pending' ? 'รออนุมัติ' : 'ยกเลิก'}
                          </span>
                        </td>
                        <td style={{ padding: '15px 10px', color: '#fff', fontWeight: 'bold' }}>฿{b.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
