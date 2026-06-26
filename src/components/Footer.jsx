import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">SINO @ THUNGSONG</span>
          <p>บริการห้องพัก สะอาด สะดวก ปลอดภัย ใจกลางเมืองทุ่งสง จังหวัดนครศรีธรรมราช ใกล้สถานีรถไฟชุมทางทุ่งสงเพียง 20 เมตร เท่านั้น</p>
        </div>
        <div className="footer-links">
          <h4>ลิงก์ด่วน</h4>
          <Link to="/">หน้าแรก</Link>
          <Link to="/rooms">ห้องพัก</Link>
          <Link to="/promotions">โปรโมชัน</Link>
          <Link to="/blog">บทความท่องเที่ยว</Link>
          <Link to="/login">ระบบหลังบ้าน (Admin Panel)</Link>
        </div>
        <div className="footer-social">
          <h4>ติดต่อสื่อสาร 24 ชั่วโมง</h4>
          <p>โทรสำรองห้องพักโดยตรงเพื่อรับข้อเสนอและส่วนลดพิเศษสูงสุด</p>
          <div className="phone-calls">
            <span>📞 088-757-2195</span>
            <span>📞 075-332-088</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>ลิขสิทธิ์ &copy; 2026 โรงแรม ชิโน ทุ่งสง - สงวนสิทธิ์ทุกประการ</p>
        <p className="developer-tag">
          By <a href="https://kiraluxproperty.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Kiralux property</a>
        </p>
      </div>
    </footer>
  );
}
