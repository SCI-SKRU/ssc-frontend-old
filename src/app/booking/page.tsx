"use client"

import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import dayjs from "dayjs"
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

import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"
import Result from "./result"
import { saveData } from "@/redux/features/booking"
import { AppDispatch, useAppSelector } from "@/redux/store"

export default function Booking() {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const booking = useAppSelector((state) => state.bookingReducer.value)
  const [form] = Form.useForm()
  const formRef = React.useRef<FormInstance>(null)
  const distpatch = useDispatch<AppDispatch>()
  const refSubSubject = useRef<HTMLDivElement>(null)

  const steps = [
    {
      title: "รายละเอียดพื้นฐาน",
      content: <Step1 form={form} />,
    },
    {
      title: "เลือกคอร์ส",
      content: <Step2 />,
    },
    {
      title: "เลือกตารางเวลา/วิชา",
      content: <Step3 formRef={formRef} form={form} />,
    },
    {
      title: "สรุป",
      content: <Result />,
    },
  ]

  const scrollToTop = () => {
    setTimeout(() => {
      if (refSubSubject.current) {
        refSubSubject.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 200)
  }

  const next = (values: any) => {
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
      values.dateSelect = dayjs(values.dateSelect).format("YYYY-MM-DD")
      distpatch(saveData({ dateSelect: dateSelected }))
      distpatch(saveData({ subject_details: [values][0] }))
    } else {
      distpatch(saveData(values))
    }
    setCurrent(current + 1)
    scrollToTop()
  }

  const prev = () => {
    setCurrent(current - 1)
    scrollToTop()
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    minHeight: "600px",
    textAlign: "center",
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  }

  return (
    <>
      <Row justify={"center"}>
        <Col xs={20} lg={12}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div style={ { marginTop: '20px' } }>
              <Steps current={current} items={items} />
            </div>
          </Col>
          <Col span={24}>
          <Form
            ref={formRef}
            form={form}
            onFinish={next}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
          >
            <div style={contentStyle} ref={refSubSubject}>
              {steps[current].content}
            </div>
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
                  {current == 4 - 1 ? "สรุปรวม" : "ต่อไป"}
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    message.success("Processing complete!")
                    console.log(booking)
                  }}
                >
                  ยืนยัน
                </Button>
              )}
            </div>
          </Form>
          </Col>

        </Row>

        </Col>
      </Row>
    </>
  )
}
