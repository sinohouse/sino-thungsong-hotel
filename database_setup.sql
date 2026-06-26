-- ==========================================
-- Supabase PostgreSQL Database Setup Script
-- Project: Sino @ Thungsong Hotel Web App
-- Run this script in the Supabase SQL Editor
-- ==========================================

-- 1. Create Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_th TEXT NOT NULL,
    price INTEGER NOT NULL,
    allotment INTEGER NOT NULL,
    description TEXT,
    image TEXT,
    amenities TEXT[]
);

-- 2. Create Promotions Table
CREATE TABLE IF NOT EXISTS promotions (
    code TEXT PRIMARY KEY,
    discount INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'percent' or 'fixed'
    label TEXT NOT NULL
);

-- 3. Create Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT NOT NULL,
    room_id TEXT REFERENCES rooms(id) ON DELETE SET NULL,
    room_name TEXT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INTEGER NOT NULL DEFAULT 1,
    total_price INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'Approved', 'Cancelled'
    slip_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, now())
);

-- 4. Create Users Table (Admin Panel Access)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, -- Store plain text or hashed password (e.g., admin123)
    name TEXT NOT NULL,
    role TEXT NOT NULL
);

-- 5. Create Blogs Table (Local Travel Articles)
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    image TEXT
);

-- 6. Create Daily Allotments Table
CREATE TABLE IF NOT EXISTS daily_allotments (
    room_id TEXT REFERENCES rooms(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    count INTEGER NOT NULL,
    PRIMARY KEY (room_id, date)
);

-- ==========================================
-- Insert Default Data
-- ==========================================

-- Insert Default Rooms
INSERT INTO rooms (id, name, name_th, price, allotment, description, image, amenities)
VALUES 
('standard-single', 
 'ห้องสแตนดาร์ด เตียงเดี่ยว (Standard Single Bed)', 
 'ห้องสแตนดาร์ด เตียงเดี่ยว (Standard Single Bed)', 
 500, 
 10, 
 'ห้องพักเตียงเดี่ยวขนาดใหญ่ นุ่มสบาย เหมาะสำหรับผู้เข้าพัก 1-2 ท่าน เพียบพร้อมด้วยอินเทอร์เน็ต Wi-Fi ความเร็วสูง โต๊ะทำงาน และสิ่งอำนวยความสะดวกครบครัน', 
 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_34.jpg', 
 ARRAY['📶 Wi-Fi ฟรี (แรงและเสถียร)', '❄️ เครื่องปรับอากาศ', '🖥️ โต๊ะทำงานพร้อมโคมไฟ', '🚿 ห้องน้ำสะอาดพร้อมเครื่องทำน้ำอุ่น', '📺 ทีวีจอใหญ่', '🧾 ออกใบเสร็จเบิกบริษัทได้']),

('standard-twin', 
 'ห้องสแตนดาร์ด เตียงคู่ (Standard Twin Beds)', 
 'ห้องสแตนดาร์ด เตียงคู่ (Standard Twin Beds)', 
 600, 
 8, 
 'ห้องพักแบบเตียงแฝด เหมาะสำหรับคณะทำงาน เซลส์ หรือเพื่อนร่วมงานที่เดินทางร่วมกัน มีพื้นที่ทำงานพร้อมปลั๊กไฟครบครัน', 
 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_169.jpg', 
 ARRAY['📶 Wi-Fi ฟรี (แรงและเสถียร)', '❄️ เครื่องปรับอากาศ', '🖥️ โต๊ะทำงานพร้อมโคมไฟ', '🚿 ห้องน้ำสะอาดพร้อมเครื่องทำน้ำอุ่น', '👥 เหมาะสำหรับการพักสองท่าน', '🧾 ออกใบเสร็จเบิกบริษัทได้']),

('standard-triple', 
 'ห้องสแตนดาร์ด 3 เตียง (Standard Triple Beds)', 
 'ห้องสแตนดาร์ด 3 เตียง (Standard Triple Beds)', 
 800, 
 5, 
 'ห้องพักขนาดใหญ่รองรับเตียงเดี่ยว 3 เตียง เหมาะสำหรับคณะปฏิบัติงาน ทีมช่าง หรือครอบครัวที่ต้องการความสะดวกสบายในการพักผ่อนร่วมกัน', 
 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_34.jpg', 
 ARRAY['📶 Wi-Fi ฟรี (แรงและเสถียร)', '❄️ เครื่องปรับอากาศ', '🖥️ โต๊ะทำงานพร้อมโคมไฟ', '🚿 ห้องน้ำสะอาดพร้อมเครื่องทำน้ำอุ่น', '👨‍👩‍👦 พักได้สูงสุด 3 ท่าน', '🧾 ออกใบเสร็จเบิกบริษัทได้']),

('vip-business', 
 'ห้องวีไอพี บิสซิเนส (VIP Business Room)', 
 'ห้องวีไอพี บิสซิเนส (VIP Business)', 
 1200, 
 3, 
 'ห้องพักสุดหรูพร้อมพื้นที่ทำงานแบบพรีเมียม โซฟานั่งเล่นสำหรับต้อนรับแขกหรือจัดประชุมย่อย เหมาะอย่างยิ่งสำหรับผู้บริหารและผู้มาติดต่อราชการระดับสูง', 
 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_2683152491774748_1920x1080.jpg', 
 ARRAY['📶 Wi-Fi ความเร็วสูงพิเศษ', '❄️ เครื่องปรับอากาศ', '🖥️ มุมทำงานระดับพรีเมียมพร้อมโต๊ะทำงานกว้าง', '🛋️ โซฟาพักผ่อน / โซนรับแขก', '📺 ทีวีจอใหญ่พร้อมเคเบิลทีวี', '🧾 ออกใบเสร็จ/ใบกำกับภาษีได้สะดวก'])
ON CONFLICT (id) DO NOTHING;

-- Insert Default Promotions
INSERT INTO promotions (code, discount, type, label)
VALUES 
('SINO10', 10, 'percent', 'ส่วนลด 10% ต้อนรับเปิดเว็บไซต์ใหม่'),
('WELCOME100', 100, 'fixed', 'ส่วนลดพิเศษ 100 บาท เมื่อจองครั้งแรก'),
('CORP200', 200, 'fixed', 'แคชแบ็คคืนเงิน 200 บาทสำหรับพนักงานบริษัท (แสดงบัตรตอนเช็คอิน)')
ON CONFLICT (code) DO NOTHING;

-- Insert Default Users
INSERT INTO users (id, username, password, name, role)
VALUES 
(1, 'admin', 'admin123', 'ผู้ดูแลระบบ ชิโน', 'Super Admin'),
(2, 'reception', 'rec123', 'ฝ่ายต้อนรับ ชิโน', 'Receptionist')
ON CONFLICT (id) DO NOTHING;

-- Insert Default Blogs
INSERT INTO blogs (id, title, slug, excerpt, content, date, image)
VALUES 
(1, 
 'ปักหมุด 9 จุดเช็คอิน ทุ่งสง นครศรีธรรมราช ห้ามพลาด!', 
 '9-checkin-thungsong', 
 'รวบรวมแหล่งท่องเที่ยวธรรมชาติ วัฒนธรรม และแลนด์มาร์กสำคัญทั่วทุ่งสงให้ตามรอยง่ายๆ', 
 'ทุ่งสง เมืองน่ารักที่เต็มไปด้วยธรรมชาติและวัฒนธรรม ปักหมุดที่เที่ยวสำคัญอาทิ อุทยานแห่งชาติน้ำตกโยง ชมน้ำตกใสเย็นฉ่ำ, ทะเลหมอกเขาขาว จุดชมพระอาทิตย์ขึ้นสุดอลังการ, เหมืองดินดำ SCG แลนด์มาร์กถ่ายรูปสุดเก๋, และไหว้พระวัดก้างปลา หากมีเวลาก็ไม่ควรพลาดชมสตรีทอาร์ตแถบสถานีรถไฟทุ่งสง', 
 '2026-06-25', 
 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_2683152491774748_1920x1080.jpg'),
(2, 
 'ชวนชิม "ขนมจีน ซอย 8" ทีเด็ดความอร่อยแห่งเมืองทุ่งสง', 
 'khanom-jeen-soi-8', 
 'รสชาติแกงใต้แท้ๆ เข้มข้นถึงใจ บริการส่งถึงโรงแรมโดยเจ้ปุ๊ยเดลิเวอรี่', 
 'หากพูดถึงเมนูขึ้นชื่อของทุ่งสง ขนมจีน ซอย 8 ในหมู่บ้านพัฒนาคือร้านที่ทุกคนพูดถึง ด้วยน้ำยาที่เข้มข้น รสจัดจ้านตามสไตล์ปักษ์ใต้แท้ๆ เสิร์ฟพร้อมผักเหนาะสดๆ หลากหลายชนิด ใครมาเที่ยวแล้วไม่สะดวกร้านก็สามารถโทรสั่งเจ้ปุ๊ย เดลิเวอรี่มาส่งที่ล็อบบี้โรงแรมได้เลยที่เบอร์ 081-5697199', 
 '2026-06-24', 
 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_34.jpg'),
(3, 
 'ประวัติศาสตร์ชุมทางรถไฟทุ่งสง และวิถีชีวิตคลาสสิก', 
 'history-thungsong-junction', 
 'ย้อนรอยความสำคัญของสถานีรถไฟชุมทางที่เป็นจุดเชื่อมต่อหลักของภาคใต้', 
 'สถานีรถไฟชุมทางทุ่งสงเป็นสถานีประวัติศาสตร์ที่เป็นจุดเริ่มต้นสายกันตัง เชื่อมต่อการเดินทางและการขนส่งตั้งแต่อดีต รอบๆ ชุมทางรายล้อมไปด้วยตึกแถวสไตล์ชิโนโปรตุกีสโบราณที่ยังคงความสวยงามและสะท้อนวิถีชีวิตคลาสสิกของชาวทุ่งสง การพักใกล้สถานีรถไฟทำให้เข้าถึงเสน่ห์นี้ได้ทันที', 
 '2026-06-23', 
 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_3791118907644762_640x1316.jpg')
ON CONFLICT (id) DO NOTHING;
