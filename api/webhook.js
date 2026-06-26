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

async function replyMessage(replyToken, messages) {
  if (!LINE_CHANNEL_ACCESS_TOKEN) return;

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
