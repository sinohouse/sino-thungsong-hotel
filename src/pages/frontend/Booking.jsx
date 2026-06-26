import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Calendar, User, Phone, Mail, Award, CheckCircle, Percent, Upload, Check, QrCode } from 'lucide-react';

export default function Booking() {
  const { rooms, promotions, addBooking, getAvailableAllotment } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // --- FORM STATE ---
  const [step, setStep] = useState(1); // 1: Room & Date Select, 2: Guest Details, 3: Payment Slip & QR, 4: Success Screen
  const [selectedRoomId, setSelectedRoomId] = useState(searchParams.get('roomId') || rooms[0]?.id || '');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Optional / ไม่บังคับ
  const [phone, setPhone] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [slipBase64, setSlipBase64] = useState('');
  const [slipFileName, setSlipFileName] = useState('');
  const [completedBooking, setCompletedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liffObj, setLiffObj] = useState(null);

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setCheckIn(today.toISOString().split('T')[0]);
    setCheckOut(tomorrow.toISOString().split('T')[0]);
  }, []);

  // --- LINE LIFF INTEGRATION ---
  useEffect(() => {
    const initLiff = async () => {
      try {
        const liff = (await import('@line/liff')).default;
        setLiffObj(liff);
        const liffId = import.meta.env.VITE_LIFF_ID || '';
        if (liffId) {
          await liff.init({ liffId });
          if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            if (profile) {
              setName(profile.displayName || '');
              const userEmail = liff.getDecodedIDToken()?.email;
              if (userEmail) {
                setEmail(userEmail);
              }
            }
          } else {
            if (liff.isInClient()) {
              liff.login();
            }
          }
        }
      } catch (err) {
        console.error('LIFF Init error:', err);
      }
    };
    initLiff();
  }, []);


  // --- RESET PROMO FOR FLASH SALE ROOM ---
  useEffect(() => {
    if (selectedRoomId === 'standard-flash-sale') {
      setAppliedPromo(null);
      setPromoCode('');
    }
  }, [selectedRoomId]);

  // Calculations
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const diffTime = Math.abs(date2 - date1);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const basePrice = selectedRoom ? selectedRoom.price * nights : 0;
  let discount = 0;

  if (appliedPromo && selectedRoomId !== 'standard-flash-sale') {
    if (appliedPromo.type === 'percent') {
      discount = Math.round(basePrice * (appliedPromo.discount / 100));
    } else if (appliedPromo.type === 'amount') {
      discount = appliedPromo.discount;
    }
  }

  const total = Math.max(0, basePrice - discount);

  // Handle applied promo code
  const handleApplyPromo = () => {
    if (selectedRoomId === 'standard-flash-sale') {
      setPromoError('ห้องโปรโมชั่น Flash Sale ไม่สามารถใช้โค้ดส่วนลดร่วมได้');
      return;
    }
    const found = promotions.find(p => p.code.toUpperCase() === promoCode.toUpperCase());
    if (found) {
      setAppliedPromo(found);
      setPromoError('');
    } else {
      setPromoError('ไม่พบโค้ดส่วนลดนี้ หรือโค้ดหมดอายุแล้ว');
      setAppliedPromo(null);
    }
  };

  // Handle Slip Upload
  const handleSlipChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSlipFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSlipBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Proceed from Guest details (Step 2) to Payment Step (Step 3)
  const handleGuestSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return; // Email is optional now
    setStep(3);
  };

  // Final Submit with Payment proof (Step 3 to 4)
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = {
        customerName: name,
        customerEmail: email || 'ไม่มีการระบุอีเมล', // Saved as optional
        customerPhone: phone,
        roomId: selectedRoom.id,
        roomName: selectedRoom.nameTh,
        checkIn,
        checkOut,
        guests,
        totalPrice: total,
        slipImage: slipBase64 || 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=500&auto=format&fit=crop'
      };

      const result = addBooking(newBooking);
      setCompletedBooking(result);
      setIsSubmitting(false);
      setStep(4);

      // Send LINE Flex Message & Quick Reply
      if (liffObj && liffObj.isLoggedIn() && liffObj.isInClient()) {
        liffObj.sendMessages([
          {
            type: 'flex',
            altText: `ยืนยันการจองห้องพัก ${result.roomName}`,
            contents: {
              type: 'bubble',
              hero: {
                type: 'image',
                url: result.slipImage || 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=500&auto=format&fit=crop',
                size: 'full',
                aspectRatio: '20:13',
                aspectMode: 'cover'
              },
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: 'Sino Thungsong Hotel',
                    weight: 'bold',
                    size: 'xl',
                    color: '#d92b2b'
                  },
                  {
                    type: 'text',
                    text: 'จองห้องพักสำเร็จ (รออนุมัติ)',
                    weight: 'bold',
                    size: 'md',
                    color: '#111111',
                    margin: 'md'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    margin: 'lg',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'box',
                        layout: 'baseline',
                        spacing: 'sm',
                        contents: [
                          {
                            type: 'text',
                            text: 'รหัสการจอง',
                            color: '#aaaaaa',
                            size: 'sm',
                            flex: 3
                          },
                          {
                            type: 'text',
                            text: result.id,
                            wrap: true,
                            color: '#666666',
                            size: 'sm',
                            flex: 5
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        spacing: 'sm',
                        contents: [
                          {
                            type: 'text',
                            text: 'ผู้จอง',
                            color: '#aaaaaa',
                            size: 'sm',
                            flex: 3
                          },
                          {
                            type: 'text',
                            text: result.customerName,
                            wrap: true,
                            color: '#666666',
                            size: 'sm',
                            flex: 5
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        spacing: 'sm',
                        contents: [
                          {
                            type: 'text',
                            text: 'ห้องพัก',
                            color: '#aaaaaa',
                            size: 'sm',
                            flex: 3
                          },
                          {
                            type: 'text',
                            text: result.roomName,
                            wrap: true,
                            color: '#666666',
                            size: 'sm',
                            flex: 5
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        spacing: 'sm',
                        contents: [
                          {
                            type: 'text',
                            text: 'วันเข้าพัก',
                            color: '#aaaaaa',
                            size: 'sm',
                            flex: 3
                          },
                          {
                            type: 'text',
                            text: `${result.checkIn} ถึง ${result.checkOut}`,
                            wrap: true,
                            color: '#666666',
                            size: 'sm',
                            flex: 5
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        spacing: 'sm',
                        contents: [
                          {
                            type: 'text',
                            text: 'ยอดชำระ',
                            color: '#aaaaaa',
                            size: 'sm',
                            flex: 3
                          },
                          {
                            type: 'text',
                            text: `฿${result.totalPrice}`,
                            wrap: true,
                            color: '#d92b2b',
                            weight: 'bold',
                            size: 'sm',
                            flex: 5
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              footer: {
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                contents: [
                  {
                    type: 'button',
                    style: 'link',
                    height: 'sm',
                    action: {
                      type: 'uri',
                      label: 'ดูรายละเอียดการจอง',
                      uri: `https://thungsonghotel.com/`
                    }
                  }
                ]
              }
            },
            quickReply: {
              items: [
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: 'เลือกห้องพัก 🛏️',
                    text: 'เลือกห้องพัก'
                  }
                },
                {
                  type: 'action',
                  action: {
                    type: 'uri',
                    label: 'จองด่วนผ่านเว็บ 📱',
                    uri: 'https://thungsonghotel.com/booking'
                  }
                },
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: 'โปรโมชั่นพิเศษ 💸',
                    text: 'โปรโมชั่นพิเศษ'
                  }
                },
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: 'ติดต่อเรา 📞',
                    text: 'ติดต่อเจ้าหน้าที่'
                  }
                },
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: 'เช็คสถานะการจอง 🔍',
                    text: 'เช็คสถานะการจอง'
                  }
                }
              ]
            }
          }
        ]).then(() => {
          console.log('LINE message sent successfully');
        }).catch((err) => {
          console.error('Failed to send LINE message:', err);
        });
      }
    }, 1000);
  };

  return (
    <div className="booking-page" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '60px' }}>
      <section className="booking-section">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-subtitle">ROOM RESERVATION</span>
            <h2 className="section-title">จองห้องพักออนไลน์</h2>
            <p className="section-desc">ทำรายการจองห้องพัก สะอาด สะดวก ปลอดภัย ตลอด 24 ชั่วโมง</p>
          </div>

          {/* Stepper Steps Indicators */}
          {step < 4 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '14px', color: step === 1 ? 'var(--accent-red)' : 'var(--text-gray)', fontWeight: step === 1 ? 'bold' : 'normal' }}>
                1. เลือกวันที่และห้องพัก {step > 1 && '✓'}
              </span>
              <span style={{ fontSize: '14px', color: step === 2 ? 'var(--accent-red)' : 'var(--text-gray)', fontWeight: step === 2 ? 'bold' : 'normal' }}>
                2. ระบุข้อมูลติดต่อ {step > 2 && '✓'}
              </span>
              <span style={{ fontSize: '14px', color: step === 3 ? 'var(--accent-red)' : 'var(--text-gray)', fontWeight: step === 3 ? 'bold' : 'normal' }}>
                3. ชำระเงิน & แนบสลิป
              </span>
            </div>
          )}

          {/* Step 1: Search & Room Setup */}
          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px' }}>
              <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '15px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-premium)' }}>
                <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '20px' }}>ข้อมูลการเช็คอิน</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label>วันที่เช็คอิน</label>
                    <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>วันที่เช็คเอาต์</label>
                    <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1.8fr', gap: '20px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label>เลือกประเภทห้อง</label>
                    <select value={selectedRoomId} onChange={e => setSelectedRoomId(e.target.value)}>
                      {rooms.map(room => {
                        const avail = getAvailableAllotment(room.id);
                        return (
                          <option value={room.id} key={room.id} disabled={avail === 0}>
                            {room.nameTh} - ฿{room.price} / คืน {avail === 0 ? '(เต็มแล้ว)' : `(ว่าง ${avail} ห้อง)`}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>จำนวนผู้เข้าพัก</label>
                    <input type="number" min="1" max="4" value={guests} onChange={e => setGuests(Number(e.target.value))} />
                  </div>
                </div>

                {selectedRoom && (
                  <div style={{ display: 'flex', gap: '20px', background: 'var(--bg-card-light)', padding: '20px', borderRadius: '10px', marginTop: '20px', alignItems: 'center' }}>
                    <img src={selectedRoom.image} alt={selectedRoom.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div>
                      <h4 style={{ color: '#111', marginBottom: '4px' }}>{selectedRoom.nameTh}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-gray)', lineHeight: '1.4' }}>{selectedRoom.desc}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Summary */}
              <div>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '15px', padding: '30px', boxShadow: 'var(--shadow-premium)' }}>
                  <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '20px' }}>สรุปยอดเงิน</h3>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px', color: 'var(--text-gray)' }}>
                    <span>ห้องที่เลือก</span>
                    <span style={{ color: '#111', fontWeight: 'bold' }}>{selectedRoom?.nameTh}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px', color: 'var(--text-gray)' }}>
                    <span>จำนวนเข้าพัก</span>
                    <span style={{ color: '#111' }}>{nights} คืน</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '12px', color: 'var(--text-gray)' }}>
                    <span>ราคารวมขั้นต้น</span>
                    <span style={{ color: '#111' }}>฿{basePrice}</span>
                  </div>

                  {/* Promo Input */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '12px', color: 'var(--text-gray)', display: 'block', marginBottom: '6px' }}>รหัสโปรโมชัน</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        value={promoCode} 
                        onChange={e => setPromoCode(e.target.value)} 
                        placeholder={selectedRoomId === 'standard-flash-sale' ? "ไม่ร่วมโปรโมชัน" : "กรอกรหัสส่วนลด"} 
                        disabled={selectedRoomId === 'standard-flash-sale'}
                        style={{ padding: '8px 12px', fontSize: '13px', backgroundColor: selectedRoomId === 'standard-flash-sale' ? '#f5f5f5' : '#fff' }}
                      />
                      <button 
                        type="button" 
                        onClick={handleApplyPromo} 
                        disabled={selectedRoomId === 'standard-flash-sale'}
                        className="btn btn-outline btn-sm"
                      >
                        ใช้โค้ด
                      </button>
                    </div>
                    {selectedRoomId === 'standard-flash-sale' && (
                      <span style={{ fontSize: '11px', color: 'var(--accent-red)', display: 'block', marginTop: '4px', fontWeight: 'bold' }}>
                        * ห้องพักโปรโมชันแฟลชเซลล์ ไม่สามารถใช้โค้ดส่วนลดเพิ่มเติมได้
                      </span>
                    )}
                    {promoError && <span style={{ fontSize: '11px', color: 'var(--accent-red)', display: 'block', marginTop: '4px' }}>{promoError}</span>}
                    {appliedPromo && <span style={{ fontSize: '11px', color: '#4cd964', display: 'block', marginTop: '4px' }}>สำเร็จ! ลดทันที {appliedPromo.code}</span>}
                  </div>

                  {appliedPromo && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4cd964', fontSize: '14px', marginBottom: '15px' }}>
                      <span>ส่วนลดโปรโมชัน</span>
                      <span>-฿{discount}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: '#111', marginBottom: '25px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '15px' }}>
                    <span>ราคาสุทธิ</span>
                    <span style={{ color: 'var(--accent-red)' }}>฿{total}</span>
                  </div>

                  <button onClick={() => setStep(2)} className="btn btn-accent btn-block btn-large">ถัดไป (ระบุข้อมูลติดต่อ)</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Guest Information (Name, Phone required, Email optional) */}
          {step === 2 && (
            <div style={{ maxWidth: '650px', margin: '0 auto', backgroundColor: '#ffffff', padding: '35px', borderRadius: '15px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-premium)' }}>
              <h3 style={{ color: '#111', fontSize: '18px', marginBottom: '20px' }}>กรอกข้อมูลผู้เข้าพัก</h3>
              
              <form onSubmit={handleGuestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label>ชื่อ-นามสกุล ของผู้เข้าพัก <span style={{ color: 'var(--accent-red)' }}>*</span></label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="เช่น คุณสมชาย รักดี" />
                </div>
                <div className="form-group">
                  <label>เบอร์โทรศัพท์มือถือ <span style={{ color: 'var(--accent-red)' }}>*</span></label>
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="08x-xxx-xxxx" />
                </div>
                <div className="form-group">
                  <label>อีเมล (ถ้ามี - ไม่บังคับกรอก)</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com (ไม่บังคับกรอก)" />
                </div>

                <div style={{ padding: '20px', background: 'var(--bg-card-light)', borderRadius: '10px', marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-gray)', marginBottom: '8px' }}>
                    <span>ห้องที่จอง:</span>
                    <span style={{ color: '#111', fontWeight: 'bold' }}>{selectedRoom?.nameTh}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-gray)', marginBottom: '8px' }}>
                    <span>วันเข้าพัก:</span>
                    <span style={{ color: '#111' }}>{checkIn} ถึง {checkOut} ({nights} คืน)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#111', fontWeight: 'bold' }}>
                    <span>ราคาสุทธิ:</span>
                    <span style={{ color: 'var(--accent-red)' }}>฿{total}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setStep(1)} className="btn btn-outline" style={{ flex: 1 }}>ย้อนกลับ</button>
                  <button type="submit" className="btn btn-accent" style={{ flex: 2 }}>ถัดไป (ชำระเงิน & อัปโหลดสลิป)</button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Detailed Booking Summary + Total + Bank & QR Code + Upload Slip */}
          {step === 3 && (
            <div style={{ maxWidth: '750px', margin: '0 auto', backgroundColor: '#ffffff', padding: '35px', borderRadius: '15px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-premium)' }}>
              <h3 style={{ color: '#111', fontSize: '20px', marginBottom: '25px', textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '12px' }}>
                สรุปรายละเอียดการจอง & ชำระเงิน
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '30px', marginBottom: '30px' }}>
                {/* Detailed Summary Block */}
                <div style={{ background: 'var(--bg-card-light)', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ color: '#111', fontSize: '14px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px' }}>รายละเอียดการจอง</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-gray)' }}>ผู้เข้าพัก:</span>
                    <strong style={{ color: '#111' }}>{name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-gray)' }}>เบอร์โทร:</span>
                    <strong style={{ color: '#111' }}>{phone}</strong>
                  </div>
                  {email && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: 'var(--text-gray)' }}>อีเมล:</span>
                      <strong style={{ color: '#111', wordBreak: 'break-all' }}>{email}</strong>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-gray)' }}>ห้องพัก:</span>
                    <strong style={{ color: '#111' }}>{selectedRoom?.nameTh}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-gray)' }}>ระยะเวลา:</span>
                    <strong style={{ color: '#111' }}>{checkIn} ถึง {checkOut} ({nights} คืน)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '10px', marginTop: '5px' }}>
                    <strong style={{ color: '#111' }}>ยอดชำระสุทธิ:</strong>
                    <strong style={{ color: 'var(--accent-red)', fontSize: '18px' }}>฿{total}</strong>
                  </div>
                </div>

                {/* Bank details & QR Code */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid rgba(0,0,0,0.06)', paddingLeft: '20px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-gray)', marginBottom: '8px', display: 'block' }}>สแกน QR Code เพื่อโอนเงิน</span>
                  
                  {/* Generated simulated PromptPay QR code frame */}
                  {/* Render the actual uploaded PromptPay QR Code image */}
                  <img 
                    src="/qrcode.jpg" 
                    alt="PromptPay QR Code" 
                    style={{ 
                      width: '220px', 
                      height: 'auto', 
                      borderRadius: '10px', 
                      border: '1px solid rgba(0,0,0,0.08)', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
                      marginBottom: '15px' 
                    }} 
                  />
                  
                  <div style={{ fontSize: '12px', color: 'var(--text-gray)', lineHeight: '1.4' }}>
                    <p><strong>ธนาคารกสิกรไทย (KBank)</strong></p>
                    <p>เลขที่บัญชี: <strong style={{ color: 'var(--accent-red)', fontSize: '15px', fontFamily: 'Outfit' }}>030-1-96571-0</strong></p>
                    <p>ชื่อบัญชี: หจก. เล่าคิมเฮงพัฒนา</p>
                  </div>
                </div>
              </div>

              {/* Upload payment slip form */}
              <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group" style={{ background: 'var(--bg-card-light)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', marginBottom: '10px' }}>
                    <Upload size={14} color="var(--accent-red)" />
                    <span>แนบหลักฐานการโอนเงิน (สลิป) *</span>
                  </label>
                  <div style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '20px', textAlign: 'center', cursor: 'pointer', position: 'relative', background: '#ffffff' }}>
                    <input 
                      type="file" 
                      required 
                      accept="image/*" 
                      onChange={handleSlipChange} 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} 
                    />
                    <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>
                      {slipFileName ? `ไฟล์ที่เลือก: ${slipFileName}` : 'เลือกรูปภาพสลิปการโอนเงินที่นี่'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <button type="button" onClick={() => setStep(2)} className="btn btn-outline" style={{ flex: 1 }}>ย้อนกลับ</button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-accent" style={{ flex: 2 }}>
                    {isSubmitting ? 'กำลังส่งคำขอ...' : 'ยืนยันชำระเงินและส่งคำขอจอง'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Success / Pending Status */}
          {step === 4 && completedBooking && (
            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', background: '#ffffff', border: '1px solid var(--border-color)', padding: '45px 35px', borderRadius: '20px', boxShadow: 'var(--shadow-premium)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <CheckCircle size={64} color="#4cd964" />
              </div>
              <h3 style={{ color: '#111', fontSize: '22px', marginBottom: '10px' }}>จองห้องพักสำเร็จแล้ว!</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '13px', marginBottom: '20px' }}>
                รหัสจองของคุณคือ: <strong style={{ color: 'var(--accent-red)', fontSize: '16px', fontFamily: 'Outfit' }}>{completedBooking.id}</strong>
              </p>
              
              <div style={{ background: 'rgba(217,43,43,0.04)', border: '1px dashed var(--border-color)', padding: '15px', borderRadius: '10px', color: 'var(--accent-red)', fontSize: '13px', fontWeight: 'bold', marginBottom: '25px' }}>
                สถานะการจอง: รออนุมัติ (Pending) กำลังอยู่ระหว่างตรวจสอบยอดเงินโอนและไฟล์สลิป
              </div>

              <div style={{ background: 'var(--bg-card-light)', padding: '20px', borderRadius: '12px', textAlign: 'left', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <strong style={{ color: '#111', fontSize: '14px', display: 'block', marginBottom: '5px' }}>รายละเอียดการจอง</strong>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-gray)' }}>
                  <span>ผู้เข้าพัก:</span>
                  <span style={{ color: '#111' }}>{completedBooking.customerName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-gray)' }}>
                  <span>เบอร์โทร:</span>
                  <span style={{ color: '#111' }}>{completedBooking.customerPhone}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-gray)' }}>
                  <span>ห้องพัก:</span>
                  <span style={{ color: '#111' }}>{completedBooking.roomName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-gray)' }}>
                  <span>วันเข้าพัก:</span>
                  <span style={{ color: '#111' }}>{completedBooking.checkIn} ถึง {completedBooking.checkOut} ({nights} คืน)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-gray)', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                  <span>ยอดชำระ:</span>
                  <span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>฿{completedBooking.totalPrice}</span>
                </div>
              </div>

              {/* QR Code & Payment instructions on Success screen */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '25px 0', padding: '20px', background: 'var(--bg-card-light)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-gray)', marginBottom: '10px', fontWeight: 'bold' }}>ช่องทางการชำระเงิน (หากต้องการสแกนชำระเงินอีกครั้ง):</span>
                <img 
                  src="/qrcode.jpg" 
                  alt="PromptPay QR Code" 
                  style={{ 
                    width: '180px', 
                    height: 'auto', 
                    borderRadius: '8px', 
                    border: '1px solid rgba(0,0,0,0.08)', 
                    boxShadow: '0 4px 10px rgba(0,0,0,0.08)', 
                    marginBottom: '12px' 
                  }} 
                />
                <div style={{ fontSize: '12px', color: 'var(--text-gray)', lineHeight: '1.4', textAlign: 'center' }}>
                  <p><strong>ธนาคารกสิกรไทย (KBank)</strong></p>
                  <p>เลขที่บัญชี: <strong style={{ color: 'var(--accent-red)', fontSize: '14px', fontFamily: 'Outfit' }}>030-1-96571-0</strong></p>
                  <p>ชื่อบัญชี: หจก. เล่าคิมเฮงพัฒนา</p>
                </div>
              </div>

              {/* Email Send notice confirmation conditionally shown */}
              {email ? (
                <div style={{ fontSize: '13px', color: 'var(--text-gray)', marginBottom: '25px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={16} color="#4cd964" />
                  <span>ระบบจัดส่งลิงก์ติดตามการจองไปยังอีเมล <strong>{email}</strong> แล้ว</span>
                </div>
              ) : (
                <div style={{ fontSize: '13px', color: 'var(--text-gray)', marginBottom: '25px' }}>
                  * เนื่องจากไม่มีการระบุอีเมล คุณสามารถแคปหน้าจอนี้เพื่อใช้แสดงเป็นหลักฐานหน้าเคาน์เตอร์ขณะเช็คอิน
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to="/" className="btn btn-primary btn-block">กลับสู่หน้าแรก</Link>
                <span style={{ fontSize: '11px', color: 'var(--text-gray)' }}>* เจ้าหน้าที่ต้อนรับจะอนุมัติและล็อกห้องพักให้คุณโดยเร็วที่สุด</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
