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
import { AppDispatch, useAppSelector } from "@/redux/store"

import CModal from "./Modal"
import { optionsCours } from "./value"
import { useDispatch } from "react-redux"
import { saveData } from "@/redux/features/booking"

const disableDates: any = []
let dateArr: any = []
let showDateSelected: any = []

interface DateSubject {
  date: string
  subject: [
    {
      morning?: []
      afternoon?: []
    }
  ]
  activity: boolean
}

export default function Step3() {
  const [arr, setArr] = useState<DateSubject[]>([])
  const booking = useAppSelector((state) => state.bookingReducer.value)
  const distpatch = useDispatch<AppDispatch>()

  const targetOption = optionsCours.find(
    (option) => option.value === booking.cours
  )

  const changeDate: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      distpatch(saveData({ dateSelect: dateString }))
      showDateSelected = []
      // console.log("Selected Date:", dateString)
      showDateSelected.push(dateString)
      let pushArr: DateSubject[] = [
        {
          date: dateString,
          subject: [{ morning: [], afternoon: [] }],
          activity: false,
        },
      ]
      for (let i = 1; i <= Number(targetOption?.day) - 1; i++) {
        const nextDate = date.clone().add(i, "days").format("YYYY-MM-DD")
        showDateSelected.push(nextDate)
        pushArr.push({
          date: nextDate,
          subject: [{ morning: [], afternoon: [] }],
          activity: false,
        })
        // console.log("Next Date:", nextDate)
      }
      // console.log(pushArr)
      setArr(pushArr)
      // console.log(showDateSelected)
    }
  }

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (current && current < dayjs().startOf("day")) {
      return true
    }

    const dateString = current && current.format("YYYY-MM-DD")
    if (dateString) dateArr.push(current)
    return disableDates.includes(dateString)
  }

  function toggleCheckbox(e: any, i: any) {
    const input = document.querySelector(
      `input[name="checkday${i}"]`
    ) as HTMLInputElement
    const updatedArr = [...arr]
    updatedArr[i].activity = input.checked
    setArr(updatedArr)
    console.log(arr)
  }

  useEffect(() => {
    showDateSelected = []
    console.log
  }, [])

  return (
    <>
      <div style={{ textAlign: "left", paddingBottom: "48px" }}>
        <h1 style={{ textAlign: "center" }}>Step3</h1>
        <Row gutter={[16, 16]} justify="space-evenly">
          <Col span={20}>
            <Card title={<>{targetOption?.label}</>} bordered={false}>
              <Form.Item
                label="เลือกวันที่"
                rules={[{ required: true, message: "โปรดเลือกวันที่" }]}
              >
                <DatePicker
                  disabledDate={disabledDate}
                  onChange={changeDate}
                  allowClear
                />
              </Form.Item>
              <Space direction="vertical">
                {showDateSelected.length > 0 &&
                  showDateSelected.map((el: string, i: any) => (
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
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
