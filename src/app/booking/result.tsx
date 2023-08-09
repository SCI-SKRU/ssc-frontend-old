import React, { useEffect } from "react"
import { Card, Col, Row } from "antd"
import { useAppSelector } from "@/redux/store"
import { convertToThaiDate } from "@/utils/thaiDateUtils"
import { findPriceByCode } from "@/utils/findPriceByCode"

const styleFlexBetween = {
  display: "flex",
  justifyContent: "space-between",
}

export default function Result({ form }: any) {
  const booking = useAppSelector((state) => state.bookingReducer.value)
  const booking_subject_details = booking.subject_details
  console.log(booking)

  const findPrice = (afterString: string) => {
    const parts = afterString.split(" ")
    if (parts && parts.length >= 2) {
      const result = findPriceByCode(parts[1])
      return String(result + " บาท")
    } else {
      console.log("Invalid or missing parts in the input.")
    }
  }

  useEffect(() => {}, [])

  return (
    <>
      <Row gutter={[16, 16]} style={{ padding: "12px" }}>
        <Col span={24}>
          <Card
            title="Card title"
            bordered={false}
            style={{ textAlign: "left" }}
          >
            <div style={{ fontSize: "1.25rem" }}>
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
                      <div>
                        กิจกรรม:{" "}
                        {String(
                          booking_subject_details?.[`date${i}`]?.activity
                            ? booking_subject_details?.[`date${i}`]?.activity
                            : false
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
              <div className="result-price">
                <div style={styleFlexBetween}>
                  <p>ค่าดำเนินการ</p>
                  <p>10,000 บาท</p>
                </div>
                <div style={styleFlexBetween}>
                  <p>คูปอง</p>
                  <p> -1,000 บาท</p>
                </div>
                <div style={styleFlexBetween}>
                  <p>ส่วนลดโรงเรียนขนาดเล็ก (-10%)</p>
                  <p> -3,500 บาท</p>
                </div>
                <div style={styleFlexBetween}>
                  <p>ส่วนลดการเข้าร่วมกิจกรรมครั้งแรก (-5%)</p>
                  <p> -1,625 บาท</p>
                </div>
                <div style={styleFlexBetween}>
                  <p>รวม</p>
                  <p>30,875 บาท</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}
