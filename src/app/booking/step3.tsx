import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  DatePicker,
  Button,
  Form,
  Space,
  Checkbox,
  Input,
  Modal,
} from "antd"
import type { RangePickerProps, DatePickerProps } from "antd/es/date-picker"
import dayjs from "dayjs"
import type { Dayjs } from "dayjs"
import "dayjs/locale/th"
import locale from "antd/es/date-picker/locale/th_TH"
import { AppDispatch, useAppSelector } from "@/redux/store"

import CModal from "./Modal"
import { optionsCours } from "./value"
import { useDispatch } from "react-redux"
import { saveData } from "@/redux/features/booking"
import { getDataCourse } from "./api/routes"

// disable from database
const disableDates: any = []
let dateSelected: any = []

export default function Step3() {
  const [course, setCourse] = useState<[]>([])
  const booking = useAppSelector((state) => state.bookingReducer.value)
  const distpatch = useDispatch<AppDispatch>()

  async function fetchCourse() {
    const result = await getDataCourse()
    setCourse(result)
  }

  const changeDate: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      dateSelected = []
      let cours = booking.cours
      if (cours < 3) cours = 1
      else if (cours < 5) cours = 2
      else if (cours < 7) cours = 3
      for (let i = 0; i < cours; i++) {
        const nextDate = date.clone().add(i, "days").format("YYYY-MM-DD")
        dateSelected.push(nextDate)
      }
      distpatch(saveData({ dateSelect: dateSelected }))
    }
  }

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (current && current < dayjs().startOf("day")) return true

    const dateString = current && current.format("YYYY-MM-DD")
    return disableDates.includes(dateString)
  }

  useEffect(() => {
    fetchCourse()
  }, [])

  return (
    <>
      <div style={{ textAlign: "left", paddingBottom: "48px" }}>
        <h1 style={{ textAlign: "center" }}>Step3</h1>
        <Row gutter={[16, 16]} justify="space-evenly">
          <Col span={20}>
            <Card title={<>{}</>} bordered={false}>
              <Form.Item
                label="เลือกวันที่"
                name="dateSelect"
                rules={[{ required: true, message: "test" }]}
              >
                <DatePicker
                  disabledDate={disabledDate}
                  onChange={changeDate}
                  value={
                    booking?.dateSelect[0]
                      ? dayjs(booking?.dateSelect[0], "YYYY-MM-DD")
                      : null
                  }
                  locale={locale}
                />
              </Form.Item>
              {/* <Space direction="vertical">
                {dateSelected.length > 0 &&
                  dateSelected.map((el: string, i: any) => (
                    <Space direction="vertical" key={i}>
                      <h3>วันที่ {el}</h3>
                      <Space direction="vertical">
                        <CModal timetext={"09.00 - 12.00"} />
                        <CModal timetext={"13.00 - 16.00"} />
                        <Space>
                          <Button type="text">กิจกรรมช่วงค่ำ</Button>
                          <Checkbox
                            onChange={(e) => toggleCheckbox(e, i)}
                            name={`checkday${i}`}
                          />
                        </Space>
                      </Space>
                    </Space>
                  ))}
              </Space> */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
