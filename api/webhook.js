import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || '';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const events = req.body.events || [];

  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const text = event.message.text.trim();
      const replyToken = event.replyToken;

      if (text === 'เช็คสถานะการจอง') {
        await replyMessage(replyToken, [
          {
            type: 'text',
            text: '🔍 กรุณาพิมพ์เบอร์โทรศัพท์ของคุณ 10 หลัก เพื่อตรวจสอบข้อมูลการจองล่าสุดครับ (ตัวอย่าง: 0812345678)'
          }
        ]);
      } else if (text === 'ติดต่อเจ้าหน้าที่') {
        await replyMessage(replyToken, [
          {
            type: 'text',
            text: '📞 ช่องทางการติดต่อโรงแรม Sino @ Thungsong Hotel:\n\n• โทรศัพท์: 075-411-536 หรือ 081-968-3566\n• ที่ตั้ง: ใจกลางเมืองทุ่งสง ใกล้สถานีรถไฟ\n\nหรือพิมพ์ข้อความทิ้งไว้ในแชตนี้ เจ้าหน้าที่จะเข้ามาตอบกลับโดยเร็วที่สุดครับ'
          }
        ]);
      } else if (text === 'หน้าแรกโรงแรม') {
        await replyMessage(replyToken, [
          {
            type: 'text',
            text: '🏨 เข้าสู่เว็บไซต์หลักเพื่อดูห้องพัก โปรโมชัน และทำรายการจองออนไลน์ได้ทันทีที่ https://thungsonghotel.com'
          }
        ]);
      } else if (text === 'เลือกห้องพัก') {
        try {
          const { data: dbRooms, error } = await supabase
            .from('rooms')
            .select('*')
            .limit(5);

          const finalRooms = dbRooms && dbRooms.length > 0 ? dbRooms : [
            {
              id: 'standard-single',
              name_th: 'ห้องสแตนดาร์ด เตียงเดี่ยว (Standard Single Bed)',
              price: 500,
              image: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_34.jpg'
            },
            {
              id: 'standard-twin',
              name_th: 'ห้องสแตนดาร์ด เตียงคู่ (Standard Twin Beds)',
              price: 600,
              image: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/%E0%B8%97%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B8%AA%E0%B8%871762021_210621_169.jpg'
            },
            {
              id: 'standard-triple',
              name_th: 'ห้องสแตนดาร์ด 3 เตียง (Standard Triple Beds)',
              price: 800,
              image: 'https://img1.wsimg.com/isteam/ip/915f6e68-1bd0-4cdd-a2b6-3e7af70abe43/DSC00171.jpg'
            }
          ];

          const roomBubbles = finalRooms.map(r => ({
            type: 'bubble',
            hero: {
              type: 'image',
              url: r.image || 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=500&auto=format&fit=crop',
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
                  text: r.name_th,
                  weight: 'bold',
                  size: 'md',
                  wrap: true
                },
                {
                  type: 'text',
                  text: `ราคาเริ่มต้น: ฿${r.price} / คืน`,
                  weight: 'bold',
                  size: 'sm',
                  color: '#d92b2b',
                  margin: 'sm'
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
                  style: 'primary',
                  color: '#d92b2b',
                  action: {
                    type: 'uri',
                    label: 'จองห้องนี้ทันที 🏨',
                    uri: `https://thungsonghotel.com/booking?roomId=${r.id}`
                  }
                }
              ]
            }
          }));

          await replyMessage(replyToken, [
            {
              type: 'text',
              text: '🛏️ รายการประเภทห้องพักแนะนำจากโรงแรม Sino @ Thungsong Hotel ครับ:'
            },
            {
              type: 'flex',
              altText: 'เลือกประเภทห้องพัก',
              contents: {
                type: 'carousel',
                contents: roomBubbles
              }
            }
          ]);
        } catch (roomErr) {
          console.error('Room query error:', roomErr);
        }
      } else if (text === 'โปรโมชั่นพิเศษ' || text === 'ขอดูโปรโมชั่น') {
        try {
          const { data: dbPromos, error } = await supabase
            .from('promotions')
            .select('*')
            .limit(5);

          const finalPromos = dbPromos && dbPromos.length > 0 ? dbPromos : [
            {
              code: 'SINO10',
              discount: 10,
              type: 'percent',
              label: 'ส่วนลด 10% ต้อนรับเปิดเว็บไซต์ใหม่'
            },
            {
              code: 'WELCOME100',
              discount: 100,
              type: 'fixed',
              label: 'ส่วนลดพิเศษ 100 บาท เมื่อจองครั้งแรก'
            },
            {
              code: 'CORP200',
              discount: 200,
              type: 'fixed',
              label: 'แคชแบ็คคืนเงิน 200 บาทสำหรับพนักงานบริษัท (แสดงบัตรตอนเช็คอิน)'
            }
          ];

          const promoBubbles = finalPromos.map(p => {
            const discountLabel = p.type === 'percent' ? `${p.discount}% OFF` : `฿${p.discount} OFF`;
            const headerColor = p.code === 'SINO10' ? '#e2c077' : p.code === 'WELCOME100' ? '#d92b2b' : '#4cd964';

            return {
              type: 'bubble',
              header: {
                type: 'box',
                layout: 'vertical',
                backgroundColor: headerColor,
                contents: [
                  {
                    type: 'text',
                    text: 'SINO @ THUNGSONG',
                    color: '#ffffff',
                    weight: 'bold',
                    size: 'xs',
                    align: 'center'
                  },
                  {
                    type: 'text',
                    text: discountLabel,
                    color: '#ffffff',
                    weight: 'bold',
                    size: 'xl',
                    align: 'center',
                    margin: 'sm'
                  },
                  {
                    type: 'text',
                    text: `โค้ด: ${p.code}`,
                    color: '#ffffff',
                    size: 'sm',
                    align: 'center',
                    margin: 'xs'
                  }
                ]
              },
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: p.label,
                    size: 'sm',
                    wrap: true,
                    weight: 'bold',
                    align: 'center'
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
                        contents: [
                          {
                            type: 'text',
                            text: 'เงื่อนไขพัก:',
                            size: 'xxs',
                            color: '#aaaaaa',
                            flex: 2
                          },
                          {
                            type: 'text',
                            text: 'ไม่มีขั้นต่ำ',
                            size: 'xxs',
                            color: '#666666',
                            flex: 3
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'text',
                            text: 'การใช้งาน:',
                            size: 'xxs',
                            color: '#aaaaaa',
                            flex: 2
                          },
                          {
                            type: 'text',
                            text: 'ใช้ได้เฉพาะการจองตรง',
                            size: 'xxs',
                            color: '#666666',
                            flex: 3
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
                    style: 'primary',
                    color: headerColor,
                    action: {
                      type: 'uri',
                      label: 'ใช้คูปองนี้จองเลย 📱',
                      uri: `https://thungsonghotel.com/booking?promoCode=${p.code}`
                    }
                  }
                ]
              }
            };
          });

          await replyMessage(replyToken, [
            {
              type: 'text',
              text: '💸 คูปองส่วนลดและโปรโมชันพิเศษล่าสุดจากโรงแรม Sino @ Thungsong Hotel ครับ:'
            },
            {
              type: 'flex',
              altText: 'โปรโมชันพิเศษ',
              contents: {
                type: 'carousel',
                contents: promoBubbles
              }
            }
          ]);
        } catch (promoErr) {
          console.error('Promo query error:', promoErr);
        }
      } else if (text === 'พิกัดโรงแรม') {
        await replyMessage(replyToken, [
          {
            type: 'text',
            text: '📍 โรงแรม Sino @ Thungsong Hotel ตั้งอยู่ใจกลางเมืองทุ่งสง ห่างจากสถานีรถไฟทุ่งสงเพียงไม่กี่ร้อยเมตร เดินทางสะดวกสบาย ใกล้ร้านอาหารและคาเฟ่ชื่อดังครับ'
          },
          {
            type: 'location',
            title: 'Sino @ Thungsong Hotel',
            address: '126/2 ถนนนิพัทธ์อุทิศ, อำเภอทุ่งสง, นครศรีธรรมราช',
            latitude: 8.169123,
            longitude: 99.680072
          }
        ]);
      } else if (/^\d{9,10}$/.test(text)) {
        // Query bookings by phone number
        try {
          const { data: bookings, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('customer_phone', text)
            .order('created_at', { ascending: false })
            .limit(3);

          if (error || !bookings || bookings.length === 0) {
            await replyMessage(replyToken, [
              {
                type: 'text',
                text: `❌ ไม่พบข้อมูลการจองสำหรับเบอร์โทรศัพท์ ${text} ในระบบ\n\nกรุณาตรวจสอบเบอร์โทรใหม่อีกครั้ง หรือเข้าเมนูจองห้องพักบนเว็บไซต์ครับ`
              }
            ]);
          } else {
            // Build a micro flex cards carousel
            const bubbleContents = bookings.map(b => {
              let statusText = 'รอตรวจสอบสลิป ⏳';
              let statusColor = '#e2c077';
              if (b.status === 'Approved') {
                statusText = 'ยืนยันห้องพักแล้ว ✓';
                statusColor = '#4cd964';
              } else if (b.status === 'Cancelled') {
                statusText = 'ยกเลิกแล้ว ❌';
                statusColor = '#d92b2b';
              }

              return {
                type: 'bubble',
                size: 'micro',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: b.room_name,
                      weight: 'bold',
                      size: 'sm',
                      wrap: true
                    },
                    {
                      type: 'text',
                      text: `รหัส: ${b.id}`,
                      size: 'xs',
                      color: '#aaaaaa',
                      margin: 'xs'
                    },
                    {
                      type: 'separator',
                      margin: 'md'
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      margin: 'md',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'text',
                              text: 'เช็คอิน',
                              size: 'xxs',
                              color: '#aaaaaa',
                              flex: 1
                            },
                            {
                              type: 'text',
                              text: b.check_in,
                              size: 'xxs',
                              color: '#666666',
                              flex: 2
                            }
                          ]
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'text',
                              text: 'เช็คเอาต์',
                              size: 'xxs',
                              color: '#aaaaaa',
                              flex: 1
                            },
                            {
                              type: 'text',
                              text: b.check_out,
                              size: 'xxs',
                              color: '#666666',
                              flex: 2
                            }
                          ]
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'text',
                              text: 'ยอดรวม',
                              size: 'xxs',
                              color: '#aaaaaa',
                              flex: 1
                            },
                            {
                              type: 'text',
                              text: `฿${b.total_price}`,
                              size: 'xxs',
                              color: '#d92b2b',
                              weight: 'bold',
                              flex: 2
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      margin: 'md',
                      contents: [
                        {
                          type: 'text',
                          text: statusText,
                          size: 'xs',
                          color: statusColor,
                          weight: 'bold',
                          align: 'center'
                        }
                      ]
                    }
                  ]
                }
              };
            });

            await replyMessage(replyToken, [
              {
                type: 'text',
                text: `🔍 พบข้อมูลการจองล่าสุดสำหรับเบอร์โทร ${text} ดังนี้ครับ:`
              },
              {
                type: 'flex',
                altText: 'ข้อมูลการจองห้องพัก',
                contents: bookings.length === 1 ? bubbleContents[0] : {
                  type: 'carousel',
                  contents: bubbleContents
                }
              }
            ]);
          }
        } catch (dbErr) {
          console.error('Supabase query error:', dbErr);
          await replyMessage(replyToken, [
            {
              type: 'text',
              text: '⚠️ ขออภัยครับ ระบบฐานข้อมูลขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้งในภายหลัง'
            }
          ]);
        }
      }
    }
  }

  return res.status(200).json({ ok: true });
}

const quickReplyPayload = {
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
};

async function replyMessage(replyToken, messages) {
  if (!LINE_CHANNEL_ACCESS_TOKEN) return;

  // Attach quick replies to the final message in the array
  if (messages && messages.length > 0) {
    const lastMsg = messages[messages.length - 1];
    lastMsg.quickReply = quickReplyPayload;
  }

  try {
    await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        replyToken,
        messages
      })
    });
  } catch (err) {
    console.error('Reply API error:', err);
  }
}
