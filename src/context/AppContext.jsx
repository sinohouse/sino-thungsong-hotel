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
  const [gallery, setGallery] = useState([]);

  // --- REVIEWS & FAQS (STATIONARY/READONLY DATA) ---
  const [reviews] = useState([
    { id: 1, name: 'คุณ วิชัย K.', rating: 5, comment: 'สะอาดมาก ห้องกว้างขวาง ใกล้สถานีรถไฟทุ่งสง เดินไปนิดเดียวถึง สะดวกสบายมากครับ', date: '2026-06-15' },
    { id: 2, name: 'คุณ นิษฐา T.', rating: 5, comment: 'ราคาคุ้มค่ามาก ปลอดภัย มีมาตรการทำความสะอาดที่ดี พนักงานบริการสุภาพ มี 7-11 อยู่ใกล้ๆ', date: '2026-06-20' },
    { id: 3, name: 'คุณ ปรีชา M.', rating: 4, comment: 'ทำเลดีมากสำหรับคนเดินทางด้วยรถไฟ ห้องพักแอร์เย็นฉ่ำ แนะนำเลยครับ', date: '2026-06-22' }
  ]);

  const [faqs] = useState([
    { 
      question: 'โรงแรมตั้งอยู่ที่ไหน?', 
      answer: 'โรงแรมชิโนทุ่งสง ตั้งอยู่ในอำเภอทุ่งสง จังหวัดนครศรีธรรมราช (ตั้งอยู่ติดกับทางออกสถานีรถไฟชุมทางทุ่งสงเพียง 20 เมตร แผนกต้อนรับบริการตลอด 24 ชั่วโมง) ท่านสามารถดูแผนที่ Google Maps ได้ที่หน้า "ติดต่อเรา"' 
    },
    { 
      question: 'เวลาเช็คอินและเช็คเอาต์คือช่วงเวลาใด?', 
      answer: 'ปกติสามารถเช็คอินได้ตั้งแต่เวลา 14:00 น. เป็นต้นไป และเช็คเอาต์ก่อนเวลา 12:00 น. แต่สำหรับลูกค้าจองตรงผ่านเว็บไซต์โรงแรม สามารถเช็คอินเร็ว (Early Check-in) ตั้งแต่เวลา 11:00 น. เป็นต้นไปได้ฟรี! และหากต้องการบริการเช็คอิน 24 ชั่วโมง สามารถติดต่อเจ้าหน้าที่ล่วงหน้าได้ครับ' 
    },
    { 
      question: 'สามารถเช็คอินก่อนเวลา (Early Check-in) หรือเช็คเอาท์ล่วงเวลา (Late Check-out) ได้หรือไม่?', 
      answer: 'การเช็คอินก่อนเวลาหรือเช็คเอาท์หลังเวลาที่กำหนด จะขึ้นอยู่กับความพร้อมของห้องพักในวันนั้นๆ โดยอาจมีค่าบริการเพิ่มเติม กรุณาติดต่อพนักงานต้อนรับล่วงหน้าเพื่อตรวจสอบสถานะห้องพัก' 
    },
    { 
      question: 'ทางโรงแรมสามารถออกใบกำกับภาษีเต็มรูปแบบในนามบริษัทได้หรือไม่?', 
      answer: 'สามารถออกได้ครับ ลูกค้าสามารถแจ้งชื่อ ที่อยู่ และเลขประจำตัวผู้เสียภาษีของบริษัทกับพนักงานต้อนรับในขั้นตอนการเช็คอิน เพื่อให้ทางเราเตรียมใบกำกับภาษีสำหรับนำไปเบิกจ่ายได้อย่างถูกต้อง' 
    },
    { 
      question: 'มีเรทราคาพิเศษสำหรับลูกค้าองค์กร (Corporate Rate) หรือเซลส์ที่ต้องเดินทางมาพักบ่อยๆ หรือไม่?', 
      answer: 'ทางโรงแรมมีเรทราคาพิเศษและโปรโมชั่นสุดคุ้มสำหรับการเข้าพักระยะยาว หรือการจองตรงกับทางโรงแรมโดยเฉพาะ ลูกค้าองค์กรสามารถแอด LINE ของโรงแรมเพื่อรับสิทธิพิเศษ สอบถามราคา Walk-in หรือขอใบเสนอราคา (Quotation) ล่วงหน้าได้โดยตรง' 
    },
    { 
      question: 'ภายในห้องพักมีพื้นที่สำหรับนั่งทำงาน และมีปลั๊กไฟเพียงพอหรือไม่?', 
      answer: 'ทุกห้องพักของเรามีโต๊ะทำงานและเก้าอี้ที่นั่งสบาย พร้อมเต้ารับไฟฟ้าบริเวณโต๊ะทำงานเพื่อให้คุณสามารถเสียบชาร์จแล็ปท็อปและอุปกรณ์ต่างๆ ได้อย่างสะดวกสบาย' 
    },
    { 
      question: 'มีบริการที่จอดรถสำหรับผู้เข้าพักหรือไม่?', 
      answer: 'มีครับ โรงแรมจัดเตรียมพื้นที่จอดรถที่สะดวกและปลอดภัยไว้บริการฟรีสำหรับลูกค้าที่เข้าพักทุกท่าน' 
    },
    { 
      question: 'มีบริการอินเทอร์เน็ตไร้สาย (Wi-Fi) หรือไม่?', 
      answer: 'มีบริการ Wi-Fi ความเร็วสูงฟรีครอบคลุมห้องพักทุกห้องและทุกจุดในพื้นที่ของโรงแรม' 
    }
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
        try {
          const { data: blogsData, error: blogsErr } = await supabase.from('blogs').select('*');
          const defaultBlogs = [
            {
              id: 1,
              title: 'ปักหมุด 9 จุดเช็คอิน ทุ่งสง นครศรีธรรมราช ห้ามพลาด!',
              slug: '9-checkin-thungsong',
              excerpt: 'รวบรวมแหล่งท่องเที่ยวธรรมชาติ วัฒนธรรม และแลนด์มาร์กสำคัญทั่วทุ่งสงให้ตามรอยง่ายๆ ครอบคลุมทั้งสายธรรมชาติและสายถ่ายรูปเช็คอิน',
              content: 'ทุ่งสง อำเภอใหญ่ของนครศรีธรรมราชที่เป็นทั้งชุมทางรถไฟและเมืองท่องเที่ยวที่อุดมสมบูรณ์ด้วยเสน่ห์ท้องถิ่น สำหรับนักท่องเที่ยวที่มาเยือนทุ่งสง นี่คือ 9 จุดเช็คอินที่ไม่ควรพลาด:\n\n1. อุทยานแห่งชาติน้ำตกโยง: น้ำตกสวยงามสูง 7 ชั้น มีแอ่งน้ำใสและฝูงปลาพลวงหิน เหมาะแก่การพักผ่อนหย่อนใจและแคมป์ปิ้งกับครอบครัว\n2. จุดชมทะเลหมอกเขาขาว: สัมผัสอากาศเย็นสบายและทะเลหมอกหนานุ่มแบบ 180 องศาที่ชมได้ตลอดทั้งปี\n3. ถ้ำตลอด: ถ้ำหินปูนธรรมชาติความยาวเกือบ 200 เมตรที่เดินทะลุผ่านภูเขาได้ ด้านในประดิษฐานพระพุทธรูปปางไสยาสน์ขนาดใหญ่\n4. เหมืองดินดำ SCG: อดีตขุมเหมืองดินขาวที่ปัจจุบันกลายเป็นบึงน้ำสีฟ้าเทอร์ควอยซ์โอบล้อมด้วยหน้าผาดินสีเหลืองทอง แลนด์มาร์กสุดชิคสำหรับสายถ่ายรูปพอร์ตเทรต\n5. วัดเขาปรีดี: วัดร่มรื่นเงียบสงบตั้งอยู่บนเนินเขา มองเห็นวิวเมืองทุ่งสงได้อย่างชัดเจน\n6. มูลนิธิซำปอกง: สักการะองค์เจ้าแม่กวนอิมขนาดใหญ่ที่สุดในประเทศไทยเพื่อความเป็นสิริมงคล\n7. สตรีทอาร์ตทุ่งสง: ภาพวาดฝาผนังสะท้อนวิถีชีวิตดั้งเดิมและวัฒนธรรมรอบสถานีรถไฟทุ่งสง\n8. วัดก้างปลา: วัดเก่าแก่อีกแห่งหนึ่งที่มีพุทธศาสนิกชนเลื่อมใสศรัทธาอย่างมาก\n9. ตลาดโต้รุ้งทุ่งสง: แหล่งรวมอาหารใต้รสชาติจัดจ้านท้องถิ่นยามค่ำคืนในราคามิตรภาพ',
              date: '2026-06-25',
              image: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_2683152491774748_1920x1080.jpg'
            },
            {
              id: 2,
              title: 'ชวนชิม "ขนมจีน ซอย 8" ทีเด็ดความอร่อยแห่งเมืองทุ่งสง',
              slug: 'khanom-jeen-soi-8',
              excerpt: 'ลิ้มรสขนมจีนน้ำยาใต้สูตรต้นตำรับแท้ๆ รสจัดจ้านพร้อมผักเคียงล้นจาน บริการส่งตรงถึงห้องพักโรงแรมโดยเจ้ปุ๊ยเดลิเวอรี่',
              content: 'หากพูดถึงของอร่อยประจำเมืองทุ่งสง ขนมจีน ซอย 8 (ตั้งอยู่ในหมู่บ้านพัฒนา ซอย 8) คือหนึ่งในร้านที่ไม่ว่าใครมาเยือนก็ต้องแวะชิม จุดเด่นของร้านอยู่ที่น้ำยาขนมจีนที่มีรสชาติเข้มข้น จัดจ้านถึงพริกถึงแกงตามสูตรปักษ์ใต้โบราณ มีน้ำยาให้เลือกหลากหลาย:\n\n- น้ำยากะทิใต้: รสเข้มข้น หอมขมิ้นและสมุนไพร\n- น้ำยาป่า: รสจัดร้อนแรง ไร้กะทิ ดีต่อสุขภาพ\n- แกงไตปลา: เมนูเด็ดรสเข้มสุดร้อนแรง ใส่เนื้อปลาเน้นๆ\n- น้ำพริกหวาน: รสกลมกล่อมหวานกำลังดี ช่วยลดความเผ็ดร้อน\n\nทุกจานเสิร์ฟพร้อมผักเหนาะ (ผักเคียง) สดๆ และผักดองพื้นบ้านหลากหลายชนิดแบบไม่อั้น สำหรับลูกค้าที่พักที่ โรงแรม ชิโน ทุ่งสง หากไม่อยากเดินทางไปด้วยตนเอง สามารถใช้บริการเจ้ปุ๊ย เดลิเวอรี่ โทรสั่งตรงให้มาส่งที่เคาน์เตอร์ล็อบบี้โรงแรมได้ทันทีที่เบอร์ 081-5697199 ตลอดวันบริการ',
              date: '2026-06-24',
              image: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_34.jpg'
            },
            {
              id: 3,
              title: 'ประวัติศาสตร์ชุมทางรถไฟทุ่งสง และวิถีชีวิตคลาสสิก',
              slug: 'history-thungsong-junction',
              excerpt: 'ย้อนรอยความสำคัญของสถานีรถไฟชุมทางที่เป็นจุดเชื่อมต่อการคมนาคมและเศรษฐกิจหลักของภาคใต้มาตั้งแต่อดีต',
              content: 'สถานีรถไฟชุมทางทุ่งสง ถือเป็นหัวใจและจุดกำเนิดความเจริญของอำเภอทุ่งสง เริ่มก่อสร้างในสมัยรัชกาลที่ 6 เพื่อเป็นสถานีหลักในการเชื่อมต่อเส้นทางรถไฟสายใต้แยกไปยังท่าเรือกันตัง จังหวัดตรัง ส่งผลให้ทุ่งสงกลายเป็นศูนย์กลางการค้า การขนส่ง และเศรษฐกิจที่คึกคักที่สุดแห่งหนึ่งของภาคใต้\n\nรอบๆ สถานีรถไฟยังคงรายล้อมไปด้วยกลิ่นอายคลาสสิกของตึกแถวโบราณแนวชิโนโปรตุกีสดั้งเดิม วิถีชีวิตของชาวบ้านที่นี่ผูกพันกับเสียงหวูดรถไฟมานานหลายทศวรรษ การได้มาเดินเล่นชมสตรีทอาร์ตรอบทางรถไฟ สูดอากาศยามเช้า และลิ้มลองโรตีชาชักท้องถิ่น จะทำให้คุณสัมผัสถึงความสุขที่เรียบง่าย โรงแรม ชิโน ทุ่งสง ของเราตั้งอยู่ตรงข้ามสถานีรถไฟเพียง 20 เมตร มอบความสะดวกสบายสูงสุดให้คุณได้สัมผัสเสน่ห์คลาสสิกนี้ได้ตลอดเวลาพักผ่อน',
              date: '2026-06-23',
              image: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_3791118907644762_640x1316.jpg'
            },
            {
              id: 4,
              title: '5 คาเฟ่ทุ่งสงสุดชิค บรรยากาศดี ถ่ายรูปสวยสายคาเฟ่ห้ามพลาด!',
              slug: '5-cafes-thungsong-guide',
              excerpt: 'เจาะลึก 5 คาเฟ่ยอดนิยมในทุ่งสงที่มีทั้งกาแฟคุณภาพดี Specialty Coffee เบเกอรี่โฮมเมด และมุมถ่ายรูปสุดปัง',
              content: 'วันพักผ่อนในทุ่งสงจะสมบูรณ์แบบยิ่งขึ้นด้วยการไปเช็คอินคาเฟ่บรรยากาศดีๆ นี่คือ 5 คาเฟ่ที่เราคัดสรรมาฝาก:\n\n1. Green Zone Coffee & Community: คาเฟ่สายธรรมชาติกลางเมืองที่ตกแต่งร่มรื่นด้วยต้นไม้เขียวขจี มีทั้งพื้นที่ห้องแอร์และโซนสวนหย่อม กาแฟสกัดรสชาติดี เบเกอรี่อร่อย เหมาะกับการนั่งอ่านหนังสือหรือทำงาน\n2. Homeyard Coffee & Living Space: คาเฟ่สไตล์โฮมมี่ ตกแต่งน่ารักให้ความอบอุ่นเสมือนนั่งเล่นในสวนที่บ้านเพื่อน แสงธรรมชาติสวยมากและมีมุมถ่ายรูปหลากหลายมุม\n3. In Valley Cafe @ Robusta Valley Thungsong: คาเฟ่ท่ามกลางหุบเขาและไร่กาแฟ สูดอากาศบริสุทธิ์และมองวิวภูเขาได้ 180 องศา คอกาแฟ Specialty ต้องชื่นชอบสายพันธุ์กาแฟโรบัสต้าท้องถิ่นที่นี่แน่นอน\n4. Grateful House: คาเฟ่สไตล์มินิมอลสีโทนขาวสะอาดตา โดดเด่นด้วยเมนูเค้กโฮมเมดรสชาติไม่หวานเกินไป หน้าตาน่ารับประทาน\n5. Little Art Coffee: คาเฟ่ร่มรื่นมีโซนจัดแสดงศิลปะและบ่อน้ำเล็กๆ มีสัตว์เลี้ยงแสนน่ารักอย่างเต่าและนกคอยต้อนรับ เหมาะสำหรับกลุ่มครอบครัวและเด็กๆ',
              date: '2026-06-22',
              image: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_2683152491774748_1920x1080.jpg'
            },
            {
              id: 5,
              title: 'คู่มือเดินเที่ยว "หลาดชุมทางทุ่งสง" ถนนคนเดินวันอาทิตย์สุดคึกคัก',
              slug: 'sunday-walking-street-thungsong',
              excerpt: 'สัมผัสบรรยากาศยามเย็นของถนนคนเดินข้างสถานีรถไฟ แหล่งรวมสินค้า แฮนด์เมด อาหารพื้นบ้าน และการแสดงศิลปวัฒนธรรม',
              content: 'สำหรับผู้ที่เข้าพักในวันหยุดสุดสัปดาห์ "หลาดชุมทางทุ่งสง" หรือถนนคนเดินทุ่งสง ซึ่งจัดขึ้นเป็นประจำทุกเย็นวันอาทิตย์ บริเวณถนนข้างสถานีรถไฟชุมทางทุ่งสง คือจุดที่ไม่ควรพลาดเป็นอย่างยิ่ง:\n\n- ตระการตากับของกินเล่นท้องถิ่น: ตั้งแต่ขนมครกใบเตยร้อนๆ, ข้าวเกรียบปากหม้อสูตรโบราณ, ลูกชิ้นปิ้งน้ำจิ้มมะขามเปียกรสเด็ด, ไปจนถึงเมนูข้าวยำปักษ์ใต้\n- ช้อปปิ้งของทำมือและสินค้าแฟชั่น: มีทั้งเสื้อผ้าวัยรุ่น, กระเป๋าแฮนด์เมด, ของสะสมโบราณ และสินค้าตกแต่งบ้านจากชุมชน\n- การแสดงศิลปวัฒนธรรมสด: เพลิดเพลินกับการแสดงดนตรีเปิดหมวกของเยาวชน, รำโนราห์ประยุกต์ และกิจกรรมศิลปะสำหรับครอบครัว\n\nตลาดเริ่มคึกคักตั้งแต่เวลา 16.00 น. ไปจนถึง 21.00 น. เดินออกจาก โรงแรม ชิโน ทุ่งสง เพียง 2 นาทีก็สามารถเพลิดเพลินกับถนนคนเดินยอดฮิตนี้ได้ทันที!',
              date: '2026-06-21',
              image: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_3791118907644762_640x1316.jpg'
            },
            {
              id: 6,
              title: 'สักการะองค์เจ้าแม่กวนอิมใหญ่ที่สุดในไทย ณ มูลนิธิซำปอกง ทุ่งสง',
              slug: 'guan-yin-sam-po-kong-thungsong',
              excerpt: 'ขอพรเพื่อความเป็นสิริมงคล เสริมโชคลาภ และสัมผัสความยิ่งใหญ่ของสถาปัตยกรรมจีนโบราณใจกลางอำเภอทุ่งสง',
              content: 'มูลนิธิซำปอกง (หรือศาลเจ้าแม่กวนอิมทุ่งสง) เป็นสถานที่ศักดิ์สิทธิ์และศูนย์รวมจิตใจของชาวไทยเชื้อสายจีนในอำเภอทุ่งสงและจังหวัดใกล้เคียง สิ่งที่เป็นแลนด์มาร์กสำคัญคือ "องค์พระมหาโพธิสัตว์กวนอิม" ที่มีความสูงสง่างามและได้รับการบันทึกว่าเป็นองค์เจ้าแม่กวนอิมในปางประทับยืนที่ใหญ่ที่สุดในประเทศไทย\n\nเมื่อเดินทางมาถึง คุณจะพบกับซุ้มประตูจีนโบราณสีแดงทองขนาดใหญ่ สถาปัตยกรรมวิหารเพดานแกะสลักลวดลายมังกรอย่างประณีต ด้านในร่มรื่นด้วยการจัดสวนหินสไตล์จีน อ่างบัวหลวง และมีน้ำตกจำลองสร้างความร่มเย็น \nเคล็ดลับการไหว้ขอพร:\n1. จุดธูปสักการะเทพยดาฟ้าดินด้านนอกก่อน\n2. เข้าไปขอพรโชคลาภ สุขภาพ และความก้าวหน้าในการทำงานเบื้องหน้าองค์เจ้าแม่กวนอิม\n3. ขึ้นบันไดด้านหลังเพื่อไปชมทัศนียภาพรอบๆ มูลนิธิจากมุมสูง\n\nการเดินทาง: ห่างจากโรงแรม ชิโน ทุ่งสง เพียง 2.0 กิโลเมตร (เดินทางด้วยรถยนต์ 5 นาที) แผนกต้อนรับยินดีเรียกรถรับจ้างท้องถิ่นให้บริการรับส่งตลอดวัน',
              date: '2026-06-20',
              image: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_34.jpg'
            }
          ];

          if (!blogsErr && blogsData && blogsData.length > 0) {
            setBlogs(blogsData);
          } else {
            setBlogs(defaultBlogs);
          }
        } catch (e) {
          console.warn('Blog load error:', e);
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

        // 7. Fetch Gallery Photos
        try {
          const { data: galleryData, error: galleryErr } = await supabase.from('gallery').select('*');
          if (!galleryErr && galleryData && galleryData.length > 0) {
            setGallery(galleryData);
          } else {
            const defaultPhotos = [
              { id: 1, src: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_262.jpg', category: 'exterior', title: 'โรงแรม ชิโน ทุ่งสง' },
              { id: 2, src: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_34.jpg', category: 'rooms', title: 'ห้องพัก Deluxe King Room' },
              { id: 3, src: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_169.jpg', category: 'rooms', title: 'ห้องพัก Twin Deluxe Room' },
              { id: 4, src: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_2683152491774748_1920x1080.jpg', category: 'lobby', title: 'เคาน์เตอร์ต้อนรับส่วนหน้า 24 ชม.' },
              { id: 5, src: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/fb_3791118907644762_640x1316.jpg', category: 'exterior', title: 'สถานีรถไฟข้างโรงแรม' }
            ];
            const localSaved = localStorage.getItem('sino_local_gallery');
            if (localSaved) {
              setGallery(JSON.parse(localSaved));
            } else {
              setGallery(defaultPhotos);
              localStorage.setItem('sino_local_gallery', JSON.stringify(defaultPhotos));
            }
          }
        } catch (e) {
          console.warn('Gallery load error fallback:', e);
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
  const updateRoomRate = async (id, newPrice, newAllotment, newDesc, newImage) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .update({ 
          price: Number(newPrice), 
          allotment: Number(newAllotment),
          description: newDesc,
          image: newImage
        })
        .eq('id', id);

      if (!error) {
        setRooms((prev) =>
          prev.map((r) => (r.id === id ? { ...r, price: Number(newPrice), allotment: Number(newAllotment), desc: newDesc, image: newImage } : r))
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

  // Bulk update daily allotments
  const bulkUpdateDailyAllotments = async (roomId, startDateStr, endDateStr, count) => {
    const list = [];
    const current = new Date(startDateStr);
    const end = new Date(endDateStr);
    
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      list.push({
        room_id: roomId,
        date: dateStr,
        count: Number(count)
      });
      current.setDate(current.getDate() + 1);
    }

    try {
      const { error } = await supabase
        .from('daily_allotments')
        .upsert(list, { onConflict: 'room_id,date' });

      if (!error) {
        setDailyAllotments((prev) => {
          const next = { ...prev };
          list.forEach(item => {
            next[`${roomId}_${item.date}`] = item.count;
          });
          return next;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Gallery management actions
  const addGalleryPhoto = async (photo) => {
    try {
      const { data, error } = await supabase.from('gallery').insert([{
        src: photo.src,
        category: photo.category,
        title: photo.title
      }]).select();

      if (!error && data && data[0]) {
        setGallery(prev => [...prev, data[0]]);
        return data[0];
      } else {
        const newPhoto = {
          id: Date.now(),
          src: photo.src,
          category: photo.category,
          title: photo.title
        };
        const updated = [...gallery, newPhoto];
        setGallery(updated);
        localStorage.setItem('sino_local_gallery', JSON.stringify(updated));
        return newPhoto;
      }
    } catch (err) {
      const newPhoto = {
        id: Date.now(),
        src: photo.src,
        category: photo.category,
        title: photo.title
      };
      const updated = [...gallery, newPhoto];
      setGallery(updated);
      localStorage.setItem('sino_local_gallery', JSON.stringify(updated));
      return newPhoto;
    }
  };

  const deleteGalleryPhoto = async (id) => {
    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (!error) {
        setGallery(prev => prev.filter(p => p.id !== id));
      } else {
        const updated = gallery.filter(p => p.id !== id);
        setGallery(updated);
        localStorage.setItem('sino_local_gallery', JSON.stringify(updated));
      }
    } catch (err) {
      const updated = gallery.filter(p => p.id !== id);
      setGallery(updated);
      localStorage.setItem('sino_local_gallery', JSON.stringify(updated));
    }
  };

  const updateGalleryPhoto = async (photo) => {
    try {
      const { error } = await supabase.from('gallery').update({
        src: photo.src,
        category: photo.category,
        title: photo.title
      }).eq('id', photo.id);

      if (!error) {
        setGallery(prev => prev.map(p => p.id === photo.id ? photo : p));
      } else {
        const updated = gallery.map(p => p.id === photo.id ? photo : p);
        setGallery(updated);
        localStorage.setItem('sino_local_gallery', JSON.stringify(updated));
      }
    } catch (err) {
      const updated = gallery.map(p => p.id === photo.id ? photo : p);
      setGallery(updated);
      localStorage.setItem('sino_local_gallery', JSON.stringify(updated));
    }
  };

  const addBlog = async (blog) => {
    try {
      const slug = blog.title.toLowerCase().replace(/[^a-zA-Z0-9ก-๙]+/g, '-');
      const { data, error } = await supabase.from('blogs').insert([{
        title: blog.title,
        slug,
        excerpt: blog.excerpt,
        content: blog.content,
        date: blog.date || new Date().toISOString().split('T')[0],
        image: blog.image
      }]).select();

      if (!error && data && data[0]) {
        setBlogs(prev => [...prev, data[0]]);
        return data[0];
      } else {
        const newBlog = {
          id: Date.now(),
          title: blog.title,
          slug,
          excerpt: blog.excerpt,
          content: blog.content,
          date: blog.date || new Date().toISOString().split('T')[0],
          image: blog.image
        };
        const updated = [...blogs, newBlog];
        setBlogs(updated);
        localStorage.setItem('sino_local_blogs', JSON.stringify(updated));
        return newBlog;
      }
    } catch (err) {
      const slug = blog.title.toLowerCase().replace(/[^a-zA-Z0-9ก-๙]+/g, '-');
      const newBlog = {
        id: Date.now(),
        title: blog.title,
        slug,
        excerpt: blog.excerpt,
        content: blog.content,
        date: blog.date || new Date().toISOString().split('T')[0],
        image: blog.image
      };
      const updated = [...blogs, newBlog];
      setBlogs(updated);
      localStorage.setItem('sino_local_blogs', JSON.stringify(updated));
      return newBlog;
    }
  };

  const deleteBlog = async (id) => {
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (!error) {
        setBlogs(prev => prev.filter(b => b.id !== id));
      } else {
        const updated = blogs.filter(b => b.id !== id);
        setBlogs(updated);
        localStorage.setItem('sino_local_blogs', JSON.stringify(updated));
      }
    } catch (err) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      localStorage.setItem('sino_local_blogs', JSON.stringify(updated));
    }
  };

  const updateBlog = async (blog) => {
    try {
      const slug = blog.title.toLowerCase().replace(/[^a-zA-Z0-9ก-๙]+/g, '-');
      const { error } = await supabase.from('blogs').update({
        title: blog.title,
        slug,
        excerpt: blog.excerpt,
        content: blog.content,
        date: blog.date,
        image: blog.image
      }).eq('id', blog.id);

      if (!error) {
        setBlogs(prev => prev.map(b => b.id === blog.id ? blog : b));
      } else {
        const updated = blogs.map(b => b.id === blog.id ? blog : b);
        setBlogs(updated);
        localStorage.setItem('sino_local_blogs', JSON.stringify(updated));
      }
    } catch (err) {
      const updated = blogs.map(b => b.id === blog.id ? blog : b);
      setBlogs(updated);
      localStorage.setItem('sino_local_blogs', JSON.stringify(updated));
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
        gallery,
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
        updateDailyAllotment,
        bulkUpdateDailyAllotments,
        addGalleryPhoto,
        deleteGalleryPhoto,
        updateGalleryPhoto,
        addBlog,
        deleteBlog,
        updateBlog
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
