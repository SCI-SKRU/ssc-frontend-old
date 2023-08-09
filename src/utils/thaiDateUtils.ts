export function convertToThaiDate(inputDate: string): string {
  const monthsThai = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ]

  const daysThai = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ]

  const [year, month, day] = inputDate.split("-").map(Number)
  const dateObj = new Date(year, month - 1, day)
  const dayIndex = dateObj.getDay() // 0: Sunday, 1: Monday, ..., 6: Saturday
  const thaiDate = `วัน${daysThai[dayIndex]} ที่ ${day} ${
    monthsThai[month - 1]
  } ${year}`

  return thaiDate
}
