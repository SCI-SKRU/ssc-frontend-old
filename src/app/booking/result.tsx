import React, { useEffect } from "react"
import { Card, Col, Row } from "antd"
import { useAppSelector } from "@/redux/store"
import { convertToThaiDate } from "@/utils/thaiDateUtils"

export default function Result({ form }: any) {
  const booking = useAppSelector((state) => state.bookingReducer.value)
  const booking_subject_details = booking.subject_details
  console.log(booking)

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
                    <ul>
                      <li>
                        09.00 - 12.00 :{" "}
                        {
                          booking_subject_details?.[`date${i}`]?.subject
                            .mainsubject
                        }
                      </li>
                      <li>
                        13.00 - 16.00 :{" "}
                        {
                          booking_subject_details?.[`date${i}`]?.subject
                            .subsubject
                        }
                      </li>
                      <li>
                        กิจกรรม:{" "}
                        {String(
                          booking_subject_details?.[`date${i}`]?.activity
                        )}
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}
