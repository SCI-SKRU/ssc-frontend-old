import React, { useEffect, useState } from "react"
import { Button, Card, Checkbox, Col, Form, Row } from "antd"
import { useAppSelector } from "@/redux/store"
import { convertToThaiDate } from "@/utils/thaiDateUtils"
import { findPriceByCode } from "@/utils/findPriceByCode"

const styleFlexBetween = {
  display: "flex",
  justifyContent: "space-between",
}

const couponAll = [
  { code: "SSC001", value: 10, unit: "%", expiredAt: "2023-08-10" },
  { code: "SSC002", value: 1000, unit: "baht", expiredAt: "2023-08-17" },
]

const disSchoolSize = [
  { size: "ขนาดเล็ก", value: 10, unit: "%" },
  { size: "ขนาดกลาง", value: 15, unit: "%" },
  { size: "ขนาดใหญ่", value: 20, unit: "%" },
  { size: "ขนาดใหญ่พิเศษ", value: 25, unit: "%" },
]

export default function Result({ form }: any) {
  const booking = useAppSelector((state) => state.bookingReducer.value)
  const booking_subject_details = booking.subject_details
  // console.log(booking)

  // ค่าดำเนินการ
  const defaultOperationFee = 10000
  // ราคารวม
  let sumPrice = 0
  const countJoin = 1

  function findPriceCoupon(codeCoupon: string) {
    const targetCoupon = couponAll.find((coupon) => coupon.code === codeCoupon)
    if (targetCoupon) {
      return Number(targetCoupon.value)
    } else {
      return 0
    }
  }

  // ค้นหาราคาวิชา
  function findPrice(afterString: string) {
    const parts = afterString.split(" ")
    if (parts && parts.length >= 2) {
      const result = findPriceByCode(parts[1])
      sumPrice = sumPrice + Number(result)
      return result
    } else {
      console.log("Invalid or missing parts in the input.")
    }
  }

  // รวมราคา กิจกรรม
  function sumPriceActivity() {
    sumPrice = sumPrice + 2000
    return 2000
  }

  // รวมราคา ค่าดำเนินการ +10000
  function sumOperationFee() {
    sumPrice += defaultOperationFee
    return defaultOperationFee
  }

  // รวมราคา ใช้คูปอง
  function sumDisCoupon() {
    const resultCoupon = booking.coupon ? findPriceCoupon(booking.coupon) : 0
    if (resultCoupon) {
      // น้อยกว่า 100 นับเป็น % มากกว่า 100 นับเป็น บาท
      if (resultCoupon < 100) {
        const resultCal = sumPrice * (resultCoupon / 100)
        sumPrice -= Math.round(resultCal)
        return Math.round(resultCal)
      } else if (resultCoupon > 100) {
        sumPrice -= resultCoupon
        return resultCoupon
      }
    } else if (resultCoupon === 0) {
      return 0
    } else {
      alert("Error Coupon")
    }
  }

  // รวมราคา ส่วนลดขนาดโรงเรียน
  function sumDisSchoolSize() {
    const targetSchoolSize = disSchoolSize.find(
      (size) => size.size === booking.schoolsize
    )
    if (targetSchoolSize) {
      const resultCal = sumPrice * (targetSchoolSize.value / 100)
      sumPrice -= resultCal
      return resultCal
    }
  }

  // รวมราคา เข้าร่วมครั้งแรก -5%
  function sunDisFirstJoin() {
    const resultCal = sumPrice * (5 / 100)
    sumPrice -= resultCal
    return resultCal
  }

  useEffect(() => {}, [])

  return (
    <>
      <Row gutter={[16, 16]} style={{ padding: "12px" }}>
        <Col span={24}>
          <Card title="สรุป" bordered={false} style={{ textAlign: "left" }}>
            <div style={{ fontSize: "1rem" }}>
              <p>
                โรงเรียน: <span>{booking.schoolname}</span>
              </p>
              <p>
                ตำบล: {booking.subaddress[2]}, อำเภอ: {booking.subaddress[1]},
                จังหวัด: {booking.subaddress[0]}
              </p>
              <p>
                ผู้ดำเนินการจอง: <span>{booking.operator}</span>
              </p>
              <p>
                อีเมล: <span>{booking.email}</span>
              </p>
              <p>จำนวนห้้องเรียน: {booking.countclassroom} ห้อง</p>
              <hr />
              {booking.dateSelect.map((item, i) => {
                return (
                  <div key={i}>
                    <p>
                      {convertToThaiDate(item)} (วันที่ {i + 1})
                    </p>
                    <div style={styleFlexBetween}>
                      <p>
                        09.00 - 12.00 :{" "}
                        {
                          booking_subject_details?.[`date${i}`]?.subject
                            .mainsubject
                        }
                      </p>
                      <p>
                        {findPrice(
                          String(
                            booking_subject_details?.[`date${i}`]?.subject
                              .mainsubject
                          )
                        )}
                      </p>
                    </div>
                    {booking_subject_details?.[`date${i}`]?.subject
                      .subsubject ? (
                      <>
                        <div style={styleFlexBetween}>
                          <p>
                            13.00 - 16.00 :{" "}
                            {
                              booking_subject_details?.[`date${i}`]?.subject
                                .subsubject
                            }
                          </p>
                          <p>
                            {findPrice(
                              String(
                                booking_subject_details?.[`date${i}`]?.subject
                                  .subsubject
                              )
                            )}
                          </p>
                        </div>
                        {booking.cours != 2 && (
                          <div style={styleFlexBetween}>
                            <p>
                              กิจกรรมช่วงค่ำ :
                              <Checkbox
                                style={{ marginLeft: "8px" }}
                                checked={
                                  booking_subject_details?.[`date${i}`]
                                    ?.activity
                                }
                              />
                            </p>

                            {booking_subject_details?.[`date${i}`]
                              ?.activity && <p>{sumPriceActivity()}</p>}
                          </div>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    <hr />
                  </div>
                )
              })}
              <div className="result-price">
                <div style={styleFlexBetween}>
                  <p>ค่าดำเนินการ</p>
                  <p>{sumOperationFee()}</p>
                </div>
                {findPriceCoupon(booking.coupon) != 0 && (
                  <>
                    <div style={styleFlexBetween}>
                      <p>คูปอง</p>
                      <p style={{ color: "red" }}> -{sumDisCoupon()}</p>
                    </div>
                  </>
                )}

                <div style={styleFlexBetween}>
                  <p>ส่วนลดโรงเรียนขนาดเล็ก (-10%)</p>
                  <p style={{ color: "red" }}> -{sumDisSchoolSize()}</p>
                </div>
                {countJoin === 1 && (
                  <div style={styleFlexBetween}>
                    <p>ส่วนลดการเข้าร่วมกิจกรรมครั้งแรก (-5%)</p>
                    <p style={{ color: "red" }}> -{sunDisFirstJoin()}</p>
                  </div>
                )}
                <hr />
                <div style={styleFlexBetween}>
                  <p style={{ fontSize: "1.5rem" }}>รวม</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {sumPrice}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Button onClick={() => console.log(sumPrice)}>Chewck</Button>
    </>
  )
}
