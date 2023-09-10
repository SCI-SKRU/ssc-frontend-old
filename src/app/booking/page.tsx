'use client'

import {
Button,
Col,
ConfigProvider,
Form,
FormInstance,
Row,
Steps,
message,
theme,
} from 'antd'
import React, { useRef, useState } from 'react'

import customTheme from '@/theme/themeConfig'
import Result from './result'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

// new data
import { useAppContext } from '@/contexts/BookingContext'
import type { AppState } from '@/types/booking'

export default function Booking() {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const formRef = React.useRef<FormInstance>(null)
  const refSubSubject = useRef<HTMLDivElement>(null)

  // new
  const { state, dispatch } = useAppContext()

  const steps = [
    {
      title: 'รายละเอียดพื้นฐาน',
      content: <Step1 />,
    },
    {
      title: 'เลือกคอร์ส',
      content: <Step2 />,
    },
    {
      title: 'เลือกตารางเวลา/วิชา',
      content: <Step3 formRef={formRef} form={form} />,
    },
    {
      title: 'สรุป',
      content: <Result />,
    },
  ]

  const scrollToTop = () => {
    setTimeout(() => {
      if (refSubSubject.current) {
        refSubSubject.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 200)
  }

  const next = (values: any) => {
    // new
    if (values.dateSelect) {
      dispatch({
        type: 'SET_FIELD',
        field: 'subject_details',
        value: [values][0],
      })
      let date = values.dateSelect
      let cours = state.cours
      let dateSelected: any = []
      if (cours < 3) cours = 1
      else if (cours < 5) cours = 2
      else if (cours < 7) cours = 3
      for (let i = 0; i < cours; i++) {
        const nextDate = date.clone().add(i, 'days').format('YYYY-MM-DD')
        dateSelected.push(nextDate)
      }
      dispatch({
        type: 'SET_FIELD',
        field: 'dateSelect',
        value: dateSelected,
      })
      setCurrent(current + 1)
      scrollToTop()
      return
    }

    const keys = Object.keys(values) as Array<keyof AppState>
    keys.forEach((key) => {
      dispatch({ type: 'SET_FIELD', field: key, value: values[key] })
    })

    setCurrent(current + 1)
    scrollToTop()
  }

  const prev = () => {    
    setCurrent(current - 1)
    scrollToTop()
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    minHeight: '600px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  }

  return (
    <>
      <ConfigProvider theme={customTheme}>
        <Row justify={'center'}>
          <Col xs={20} lg={12}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div style={{ marginTop: '20px' }}>
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
                      display: 'flex',
                      justifyContent: 'end',
                    }}
                  >
                    {current > 0 && (
                      <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => prev()}
                      >
                        ย้อนกลับ
                      </Button>
                    )}
                    {current < steps.length - 1 && (
                      <Button type="primary" htmlType="submit">
                        {current == 4 - 1 ? 'สรุปรวม' : 'ต่อไป'}
                      </Button>
                    )}
                    {current === steps.length - 1 && (
                      <Button
                        type="primary"
                        onClick={() => {
                          message.success('Processing complete!')
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
      </ConfigProvider>
    </>
  )
}
