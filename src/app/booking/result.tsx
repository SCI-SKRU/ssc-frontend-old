import { useAppSelector } from "@/redux/store"
import React, { useEffect } from "react"

export default function Result() {
  const test = useAppSelector((state) => state.bookingReducer.value)

  useEffect(() => {
    console.log(test)
  }, [])

  return (
    <>
      <div>
        <h1>โรงเรียน: {test.schoolname}</h1>
        <h1>ขนาดโรงเรียน: {test.schoolsize}</h1>
        <h1>จังหวัด/อำเภอ/ตำบล: {test.subaddress}</h1>
        <h1>เข้าร่วมครั้งที่: {test.countconnect}</h1>
        <h1>ผู้ดำเนินการ: {test.operator}</h1>
        <h1>ตำแหน่ง: {test.position}</h1>
        <h1>อีเมล: {test.email}</h1>
        <h1>เบอร์โทรศัพท์: {test.mobile}</h1>
        <h1>จํานวนห้องเรียนในคอร์ส: {test.countclassroom}</h1>
        <h1>Step2: {test.cours}</h1>
        <h1>Test</h1>
      </div>
    </>
  )
}
