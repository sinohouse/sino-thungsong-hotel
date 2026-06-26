import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ClipboardList, BedDouble, Tag, Users, Home, Check, X, Trash2, Eye, LogOut, Image as ImageIcon, FileText } from 'lucide-react';

export default function BookingAdmin() {
  const { currentUser, logout, bookings, updateBookingStatus, deleteBooking } = useContext(AppContext);
  const navigate = useNavigate();

  // --- STATE FOR MODAL ---
  const [activeSlipBooking, setActiveSlipBooking] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleApproveSlip = (bookingId, email) => {
    updateBookingStatus(bookingId, 'Approved');
    setActiveSlipBooking(null);
    setSuccessMessage(`อนุมัติสำเร็จ! ระบบส่งอีเมลยืนยันการจองและใบเสร็จรับเงินไปยัง ${email} เรียบร้อยแล้ว`);
    setTimeout(() => setSuccessMessage(''), 4500);
  };

  return (
    <div className="admin-bookings-page" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="section-container">
        
        {/* Admin Header Info */}
        <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', background: '#181822', padding: '25px 30px', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '40px' }}>
          <div>
            <span style={{ fontSize: '13px', color: '#e2c077', fontWeight: 'bold' }}>MANAGEMENT SYSTEM</span>
            <h1 style={{ color: '#fff', fontSize: '24px', margin: '5px 0 0 0' }}>จัดการรายการจองห้องพัก</h1>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LogOut size={14} />
            <span>ออกจากระบบ</span>
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div style={{ background: 'rgba(76,217,100,0.15)', border: '1px solid #4cd964', color: '#4cd964', padding: '15px 20px', borderRadius: '10px', marginBottom: '30px', fontWeight: 'bold', fontSize: '14px', textAlign: 'center' }}>
            {successMessage}
          </div>
        )}

        {/* Main Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 7.5fr', gap: '40px' }}>
          
          {/* Navigation Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }}>
              <Home size={18} color="#e2c077" />
              <span>ภาพรวมระบบ (Dashboard)</span>
            </Link>
            <Link to="/admin/bookings" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--accent-gold)', color: '#272730', padding: '15px 20px', borderRadius: '10px', fontWeight: 'bold' }}>
              <ClipboardList size={18} />
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
            <Link to="/admin/blogs" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <FileText size={18} color="#e2c077" />
              <span>จัดการบทความท่องเที่ยว</span>
            </Link>
            <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#181822', color: '#f1f1f5', padding: '15px 20px', borderRadius: '10px' }} className="admin-menu-link">
              <Users size={18} color="#e2c077" />
              <span>ผู้ดูแลระบบหลังบ้าน</span>
            </Link>
          </div>

          {/* Bookings Manager List Block */}
          <div style={{ backgroundColor: '#181822', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.03)' }}>
            <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '25px' }}>รายการจองทั้งหมด</h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
                    <th style={{ padding: '12px 8px' }}>รหัสจอง</th>
                    <th style={{ padding: '12px 8px' }}>ผู้เข้าพัก & เบอร์โทร</th>
                    <th style={{ padding: '12px 8px' }}>ประเภทห้อง</th>
                    <th style={{ padding: '12px 8px' }}>เช็คอิน - เอาต์</th>
                    <th style={{ padding: '12px 8px' }}>ยอดสุทธิ</th>
                    <th style={{ padding: '12px 8px' }}>สถานะ</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center' }}>จัดการสถานะ / สลิป</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} key={b.id}>
                      <td style={{ padding: '15px 8px', color: '#e2c077', fontFamily: 'Outfit', fontWeight: 'bold' }}>{b.id}</td>
                      <td style={{ padding: '15px 8px', color: '#fff' }}>
                        <div>{b.customerName}</div>
                        <div style={{ fontSize: '11px', color: '#a1a1b5', marginTop: '2px' }}>📞 {b.customerPhone}</div>
                      </td>
                      <td style={{ padding: '15px 8px', color: '#a1a1b5' }}>{b.roomName}</td>
                      <td style={{ padding: '15px 8px', color: '#a1a1b5' }}>
                        <div>In: {b.checkIn}</div>
                        <div style={{ fontSize: '11px', marginTop: '2px' }}>Out: {b.checkOut}</div>
                      </td>
                      <td style={{ padding: '15px 8px', color: '#fff', fontWeight: 'bold' }}>฿{b.totalPrice}</td>
                      <td style={{ padding: '15px 8px' }}>
                        <span style={{ 
                          fontSize: '10px', 
                          padding: '3px 8px', 
                          borderRadius: '30px', 
                          fontWeight: 'bold',
                          backgroundColor: b.status === 'Approved' ? 'rgba(76,217,100,0.15)' : b.status === 'Pending' ? 'rgba(226,192,119,0.15)' : 'rgba(217,43,43,0.15)',
                          color: b.status === 'Approved' ? '#4cd964' : b.status === 'Pending' ? '#e2c077' : '#d92b2b'
                        }}>
                          {b.status === 'Approved' ? 'อนุมัติแล้ว' : b.status === 'Pending' ? 'รออนุมัติ' : 'ยกเลิก'}
                        </span>
                      </td>
                      <td style={{ padding: '15px 8px' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center' }}>
                          {/* Slip verification button */}
                          {b.slipImage && (
                            <button 
                              onClick={() => setActiveSlipBooking(b)} 
                              className="btn btn-sm" 
                              style={{ padding: '6px 10px', backgroundColor: 'rgba(226,192,119,0.2)', color: '#e2c077', borderRadius: '6px' }}
                              title="ตรวจสอบสลิปโอนเงิน"
                            >
                              <Eye size={14} style={{ marginRight: '4px' }} />
                              <span>สลิป</span>
                            </button>
                          )}

                          {b.status === 'Pending' && !b.slipImage && (
                            <button 
                              onClick={() => handleApproveSlip(b.id, b.customerEmail)} 
                              className="btn btn-sm" 
                              style={{ padding: '6px 10px', backgroundColor: 'rgba(76,217,100,0.2)', color: '#4cd964', borderRadius: '6px' }}
                              title="อนุมัติการจอง"
                            >
                              <Check size={14} />
                            </button>
                          )}

                          {b.status !== 'Cancelled' && (
                            <button 
                              onClick={() => updateBookingStatus(b.id, 'Cancelled')} 
                              className="btn btn-sm" 
                              style={{ padding: '6px 10px', backgroundColor: 'rgba(217,43,43,0.2)', color: '#d92b2b', borderRadius: '6px' }}
                              title="ยกเลิกการจอง"
                            >
                              <X size={14} />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteBooking(b.id)} 
                            className="btn btn-sm" 
                            style={{ padding: '6px 10px', backgroundColor: 'rgba(255,255,255,0.05)', color: '#a1a1b5', borderRadius: '6px' }}
                            title="ลบข้อมูล"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Slip Verification Modal */}
      {activeSlipBooking && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div style={{ backgroundColor: '#181822', border: '1px solid var(--border-color)', padding: '30px', borderRadius: '15px', maxWidth: '550px', width: '100%', margin: '20px', boxShadow: 'var(--shadow-premium)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
              <h3 style={{ color: '#fff', fontSize: '18px' }}>ตรวจสอบสลิปโอนเงิน (รหัสจอง: {activeSlipBooking.id})</h3>
              <button onClick={() => setActiveSlipBooking(null)} style={{ color: '#a1a1b5', fontSize: '20px' }}>&times;</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', alignItems: 'start' }}>
              {/* Slip Image */}
              <div style={{ background: '#0f0f12', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <img 
                  src={activeSlipBooking.slipImage} 
                  alt="สลิปหลักฐานการโอนเงิน" 
                  style={{ width: '100%', maxHeight: '350px', objectFit: 'contain' }} 
                />
              </div>

              {/* Booking specifications */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', color: '#a1a1b5' }}>
                <div>
                  <span>ผู้เข้าพัก:</span>
                  <strong style={{ color: '#fff', display: 'block', fontSize: '13px' }}>{activeSlipBooking.customerName}</strong>
                </div>
                <div>
                  <span>เบอร์โทร:</span>
                  <span style={{ color: '#fff', display: 'block' }}>{activeSlipBooking.customerPhone}</span>
                </div>
                <div>
                  <span>อีเมลติดต่อ:</span>
                  <span style={{ color: '#fff', display: 'block', wordBreak: 'break-all' }}>{activeSlipBooking.customerEmail}</span>
                </div>
                <div>
                  <span>ห้องพัก:</span>
                  <span style={{ color: '#fff', display: 'block' }}>{activeSlipBooking.roomName}</span>
                </div>
                <div>
                  <span>ยอดโอนในสลิป:</span>
                  <strong style={{ color: '#e2c077', display: 'block', fontSize: '15px' }}>฿{activeSlipBooking.totalPrice}</strong>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '25px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
              <button 
                onClick={() => handleApproveSlip(activeSlipBooking.id, activeSlipBooking.customerEmail)} 
                className="btn btn-primary" 
                style={{ flex: 2 }}
              >
                <Check size={16} style={{ marginRight: '6px' }} />
                <span>อนุมัติยอดโอนเงิน</span>
              </button>
              <button 
                onClick={() => setActiveSlipBooking(null)} 
                className="btn btn-outline" 
                style={{ flex: 1 }}
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
