"use client"

import {
  Col,
  Row,
  Button,
  Steps,
  message,
  theme,
  Form,
  FormInstance,
} from "antd"
import { useState } from "react"
// import components step
import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"
import Result from "./result"

import { saveData, showData } from "@/redux/features/booking"
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "@/redux/store"
import React from "react"

export default function Booking() {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const booking = useAppSelector((state) => state.bookingReducer.value)
  const [form] = Form.useForm()
  const formRef = React.useRef<FormInstance>(null)

  const steps = [
    {
      title: "Step 1",
      content: <Step1 form={form} />,
    },
    {
      title: "Step 2",
      content: <Step2 />,
    },
    {
      title: "Step 3",
      content: <Step3 formRef={formRef} form={form} />,
    },
    {
      title: "Result",
      content: <Result form={form} />,
    },
  ]

  const distpatch = useDispatch<AppDispatch>()

  const next = (values: any) => {
    console.log(booking)
    // step3
    if (values.dateSelect) {
      let date = values.dateSelect
      let cours = booking.cours
      let dateSelected: any = []
      if (cours < 3) cours = 1
      else if (cours < 5) cours = 2
      else if (cours < 7) cours = 3
      for (let i = 0; i < cours; i++) {
        const nextDate = date.clone().add(i, "days").format("YYYY-MM-DD")
        dateSelected.push(nextDate)
      }
      distpatch(saveData({ dateSelect: dateSelected }))
    } else {
      distpatch(saveData(values))
    }
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
            ref={formRef}
            form={form}
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
