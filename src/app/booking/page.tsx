"use client"

import { Col, Row, Button, Steps, message, theme, Form } from "antd"
import { useState } from "react"
// import components step
import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"
import Result from "./result"

import { saveData, showData } from "@/redux/features/booking"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"

const steps = [
  {
    title: "Step 1",
    content: <Step1 />,
  },
  {
    title: "Step 2",
    content: <Step2 />,
  },
  {
    title: "Step 3",
    content: <Step3 />,
  },
  {
    title: "Result",
    content: <Result />,
  },
]

export default function Booking() {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)

  const distpatch = useDispatch<AppDispatch>()

  const next = (values: any) => {
    distpatch(saveData(values))
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }
  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    minHeight: "600px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  }

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Steps current={current} items={items} />
          <Form
            onFinish={next}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
          >
            <div style={contentStyle}>{steps[current].content}</div>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "end",
              }}
            >
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  ย้อนกลับ
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  ต่อไป
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                >
                  ยืนยัน
                </Button>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </>
  )
}
