import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- STATE FOR AUTH ---
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sino_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // --- LOCAL STATES SYNCED WITH SUPABASE ---
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [dailyAllotments, setDailyAllotments] = useState({});

  // --- REVIEWS & FAQS (STATIONARY/READONLY DATA) ---
  const [reviews] = useState([
    { id: 1, name: 'คุณ วิชัย K.', rating: 5, comment: 'สะอาดมาก ห้องกว้างขวาง ใกล้สถานีรถไฟทุ่งสง เดินไปนิดเดียวถึง สะดวกสบายมากครับ', date: '2026-06-15' },
    { id: 2, name: 'คุณ นิษฐา T.', rating: 5, comment: 'ราคาคุ้มค่ามาก ปลอดภัย มีมาตรการทำความสะอาดที่ดี พนักงานบริการสุภาพ มี 7-11 อยู่ใกล้ๆ', date: '2026-06-20' },
    { id: 3, name: 'คุณ ปรีชา M.', rating: 4, comment: 'ทำเลดีมากสำหรับคนเดินทางด้วยรถไฟ ห้องพักแอร์เย็นฉ่ำ แนะนำเลยครับ', date: '2026-06-22' }
  ]);

  const [faqs] = useState([
    { question: 'โรงแรมตั้งอยู่ไกลจากสถานีรถไฟทุ่งสงเท่าใด?', answer: 'โรงแรม ชิโน ทุ่งสง ตั้งอยู่ห่างจากทางออกสถานีรถไฟชุมทางทุ่งสงเพียง 20 เมตรเท่านั้น สามารถเดินเท้ามาได้ไม่ถึง 1 นาที' },
    { question: 'มีบริการที่จอดรถสำหรับผู้เข้าพักหรือไม่?', answer: 'มีครับ โรงแรมจัดเตรียมพื้นที่จอดรถที่สะดวกและปลอดภัยไว้บริการฟรีสำหรับลูกค้าที่เข้าพักทุกท่าน' },
    { question: 'เวลาเช็คอินและเช็คเอาต์คือช่วงเวลาใด?', answer: 'สามารถเช็คอินได้ตั้งแต่เวลา 14:00 น. เป็นต้นไป และเช็คเอาต์ก่อนเวลา 12:00 น. หากต้องการบริการเช็คอิน 24 ชั่วโมง สามารถติดต่อเจ้าหน้าที่ล่วงหน้าได้ครับ' },
    { question: 'มีบริการอินเทอร์เน็ตไร้สาย (Wi-Fi) หรือไม่?', answer: 'มีบริการ Wi-Fi ความเร็วสูงฟรีครอบคลุมห้องพักทุกห้องและทุกจุดในพื้นที่ของโรงแรม' }
  ]);

  // --- LOAD INITIAL DATA FROM SUPABASE ---
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // 1. Fetch Rooms
        const { data: roomsData, error: roomsErr } = await supabase.from('rooms').select('*');
        if (!roomsErr && roomsData) {
          const mappedRooms = roomsData.map(r => ({
            id: r.id,
            name: r.name,
            nameTh: r.name_th,
            price: r.price,
            allotment: r.allotment,
            desc: r.description,
            image: r.image,
            amenities: r.amenities
          }));
          setRooms(mappedRooms);
        }

        // 2. Fetch Promotions
        const { data: promoData, error: promoErr } = await supabase.from('promotions').select('*');
        if (!promoErr && promoData) {
          setPromotions(promoData);
        }

        // 3. Fetch Bookings
        const { data: bookingsData, error: bookingsErr } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!bookingsErr && bookingsData) {
          const mappedBookings = bookingsData.map(b => ({
            id: b.id,
            customerName: b.customer_name,
            customerEmail: b.customer_email || '',
            customerPhone: b.customer_phone,
            roomId: b.room_id,
            roomName: b.room_name,
            checkIn: b.check_in,
            checkOut: b.check_out,
            guests: b.guests,
            totalPrice: b.total_price,
            status: b.status,
            slipImage: b.slip_image,
            createdAt: b.created_at
          }));
          setBookings(mappedBookings);
        }

        // 4. Fetch Users (Admins)
        const { data: usersData, error: usersErr } = await supabase.from('users').select('*');
        if (!usersErr && usersData) {
          setUsers(usersData);
        }

        // 5. Fetch Blogs
        const { data: blogsData, error: blogsErr } = await supabase.from('blogs').select('*');
        if (!blogsErr && blogsData) {
          setBlogs(blogsData);
        }

        // 6. Fetch Daily Allotments
        const { data: allotmentData, error: allotmentErr } = await supabase.from('daily_allotments').select('*');
        if (!allotmentErr && allotmentData) {
          const allotmentsObj = {};
          allotmentData.forEach(item => {
            allotmentsObj[`${item.room_id}_${item.date}`] = item.count;
          });
          setDailyAllotments(allotmentsObj);
        }
      } catch (err) {
        console.error('Error connection/loading from Supabase:', err);
      }
    };

    loadInitialData();
  }, []);

  // --- APP ACTIONS WITH SUPABASE SYNC ---

  // Book a room (client flow)
  const addBooking = async (newBooking) => {
    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const dbBooking = {
      id: bookingId,
      customer_name: newBooking.customerName,
      customer_email: newBooking.customerEmail,
      customer_phone: newBooking.customerPhone,
      room_id: newBooking.roomId,
      room_name: newBooking.roomName,
      check_in: newBooking.checkIn,
      check_out: newBooking.checkOut,
      guests: newBooking.guests,
      total_price: newBooking.totalPrice,
      status: 'Pending',
      slip_image: newBooking.slipImage
    };

    try {
      const { data, error } = await supabase.from('bookings').insert([dbBooking]).select();
      if (!error && data && data[0]) {
        const saved = data[0];
        const mapped = {
          id: saved.id,
          customerName: saved.customer_name,
          customerEmail: saved.customer_email || '',
          customerPhone: saved.customer_phone,
          roomId: saved.room_id,
          roomName: saved.room_name,
          checkIn: saved.check_in,
          checkOut: saved.check_out,
          guests: saved.guests,
          totalPrice: saved.total_price,
          status: saved.status,
          slipImage: saved.slip_image,
          createdAt: saved.created_at
        };
        setBookings((prev) => [mapped, ...prev]);
        return mapped;
      } else {
        console.error('Error adding booking to Supabase:', error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update booking status (admin flow)
  const updateBookingStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (!error) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
      } else {
        console.error('Error updating booking status:', error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete/Cancel booking
  const deleteBooking = async (id) => {
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (!error) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        console.error('Error deleting booking:', error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Manage rooms setup
  const updateRoomRate = async (id, newPrice, newAllotment) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .update({ price: Number(newPrice), allotment: Number(newAllotment) })
        .eq('id', id);

      if (!error) {
        setRooms((prev) =>
          prev.map((r) => (r.id === id ? { ...r, price: Number(newPrice), allotment: Number(newAllotment) } : r))
        );
      } else {
        console.error('Error updating room settings:', error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Manage promotions
  const addPromotion = async (promo) => {
    try {
      const { error } = await supabase.from('promotions').insert([promo]);
      if (!error) {
        setPromotions((prev) => [...prev, promo]);
      } else {
        console.error('Error adding promotion:', error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removePromotion = async (code) => {
    try {
      const { error } = await supabase.from('promotions').delete().eq('code', code);
      if (!error) {
        setPromotions((prev) => prev.filter((p) => p.code !== code));
      } else {
        console.error('Error removing promotion:', error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Manage users
  const addUser = async (newUser) => {
    try {
      const { data, error } = await supabase.from('users').insert([newUser]).select();
      if (!error && data && data[0]) {
        setUsers((prev) => [...prev, data[0]]);
      } else {
        console.error('Error adding user:', error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeUser = async (id) => {
    try {
      const { error } = await supabase.from('users').delete().eq('id', id);
      if (!error) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        console.error('Error removing user:', error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Authentication flows (Using DB check)
  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('sino_admin_user', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sino_admin_user');
  };

  // Check room allotment with dates
  const getAvailableAllotment = (roomId, checkInDate) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return 0;
    const targetDate = checkInDate || new Date().toISOString().split('T')[0];
    const key = `${roomId}_${targetDate}`;
    const totalAllotment = dailyAllotments[key] !== undefined ? dailyAllotments[key] : room.allotment;
    
    const activeCount = bookings.filter(
      (b) => b.roomId === roomId && 
             (b.status === 'Approved' || b.status === 'Pending') &&
             b.checkIn <= targetDate && b.checkOut > targetDate
    ).length;
    
    return Math.max(0, totalAllotment - activeCount);
  };

  // Update specific day allotment
  const updateDailyAllotment = async (roomId, dateStr, count) => {
    const dbAllotment = {
      room_id: roomId,
      date: dateStr,
      count: Number(count)
    };

    try {
      // Upsert daily allotment
      const { error } = await supabase
        .from('daily_allotments')
        .upsert(dbAllotment, { onConflict: 'room_id,date' });

      if (!error) {
        setDailyAllotments((prev) => ({
          ...prev,
          [`${roomId}_${dateStr}`]: Number(count)
        }));
      } else {
        console.error('Error upserting daily allotment:', error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        rooms,
        promotions,
        bookings,
        reviews,
        faqs,
        blogs,
        dailyAllotments,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        updateRoomRate,
        addPromotion,
        removePromotion,
        addUser,
        removeUser,
        login,
        logout,
        getAvailableAllotment,
        updateDailyAllotment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
