export interface Optionz {
  value: string | number
  label: string
  children?: Optionz[]
  day: number
  subject: number
}

export const optionsCours: Optionz[] = [
  {
    label: "1.คอร์ส 6 ชั่วโมง (หนึ่งวัน, 9.00-16.00) เลือกได้ 2 วิชา",
    value: 1,
    day: 1,
    subject: 2,
  },
  {
    label:
      "2.คอร์ส 9 ชั่วโมง (สองวัน, 9.00-16.00) และวันที่สอง 9.00-12.00 เลือกได้ 3 วิชา + กิจกรรมช่วงค่ำ (เลือกหรือไม่ก็ได้)",
    value: 2,
    day: 2,
    subject: 3,
  },
  {
    label:
      "3.คอร์ส 12 ชั่วโมง (สองวัน, 9.00-16.00) และวันที่สอง 9.00-12.00 เลือกได้ 4 วิชา + กิจกรรมช่วงค่ำ (เลือกหรือไม่ก็ได้)",
    value: 3,
    day: 2,
    subject: 4,
  },
  {
    label:
      "4.คอร์ส 15 ชั่วโมง (สามวัน, 9.00-16.00) และวันที่สอง 9.00-12.00 เลือกได้ 5 วิชา + กิจกรรมช่วงค่ำ 2 ครั้ง (เลือกหรือไม่ก็ได้)",
    value: 4,
    day: 3,
    subject: 5,
  },
  {
    label:
      "5.คอร์ส 18 ชั่วโมง (สามวัน, 9.00-16.00) และวันที่สอง 9.00-12.00 เลือกได้ 6 วิชา + กิจกรรมช่วงค่ำ 2 ครั้ง (เลือกหรือไม่ก็ได้)",
    value: 5,
    day: 3,
    subject: 6,
  },
]

export function getValue(): Promise<Optionz[]> {
  return fetch(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
  )
    .then((data) => data.json())
    .then((response) => {
      const array: Optionz[] = response.map((data: any, index: any) => ({
        label: data.name_th,
        value: data.name_en,
        children: data.amphure.map((item: any) => {
          return {
            label: item.name_th,
            value: item.name_en,
            children: item.tambon.map((item2: any) => {
              return {
                label: item2.name_th,
                value: item2.name_en,
              }
            }),
          }
        }),
      }))

      return array
    })
}

export const schoolsize = [
  { size: "ขนาดเล็ก", option: "1" },
  { size: "ขนาดกลาง", option: "2" },
  { size: "ขนาดใหญ่", option: "3" },
  { size: "ขนาดใหญ่พิเศษ", option: "4" },
]

export const subjectAll = [
  {
    id: 1,
    title: "ฟิสิก",
    level: [
      {
        first: [
          {
            code: "1101A",
            msg: "การหักเหของแสง + การเกิดฤดูกาลและนํ้าขึ้นนํ้าลง (ป.4 - ป.6)",
          },
          { code: "1102A", msg: "จรวดขวดนํ้า (ป.4 - ป.6)" },
        ],
        second: [
          { code: "1201A", msg: "การวัดและความผิดพลาด" },
          { code: "1202A", msg: "การเคลื่อนที่ 1 มิติ (แนวดิ่ง)" },
          { code: "1203A", msg: "การเคลื่อนที่ 1 มิติ (แนวราบ)" },
        ],
        third: [
          { code: "1301A", msg: "การวัดและความผิดพลาด" },
          { code: "1302A", msg: "การเคลื่อนที่ 1 มิติ (แนวดิ่ง)" },
          { code: "1303A", msg: "การเคลื่อนที่ 1 มิติ (แนวราบ)" },
          { code: "1304A", msg: "การเคลื่อนที่แบบเพนดูลัมอยางงาย" },
          { code: "1305A", msg: "การเคลื่อนที่แบบวิถีโคง" },
          { code: "1306A", msg: "ดาราศาสตรการดูดาวเบื้องตน" },
          { code: "1307A", msg: "การทดลองทางไฟฟา" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "เคมี",
  },
  {
    id: 3,
    title: "ชีววิทยา จุลชีววิทยาและเทคโนโลยีชีวภาพ",
  },
]
