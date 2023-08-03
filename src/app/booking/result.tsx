import React, { useEffect } from "react"
import { Card, Col, Row } from "antd"
import { useAppSelector } from "@/redux/store"

export default function Result({ form }: any) {
  const test = useAppSelector((state) => state.bookingReducer.value)
  const formValues = form.getFieldsValue()
  console.log(test)

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
            <h4>
              โรงงเรียน: <span>{test.schoolname}</span>
            </h4>
            <h4>
              ที่อยู่: <span>{test.subaddress}</span>
            </h4>
            <h4>
              ผู้ดำเนินการจอง: <span>{test.operator}</span>
            </h4>
            <h4>
              อีเมล: <span>{test.email}</span>
            </h4>
            <h4>
              จำนวนห้้องเรียน: <span>{test.countclassroom}</span>
            </h4>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </>
  )
}
