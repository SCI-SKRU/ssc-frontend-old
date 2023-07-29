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
import { Dayjs } from "dayjs"
import { AppDispatch, useAppSelector } from "@/redux/store"

import CModal from "./Modal"
import { optionsCours } from "./value"
import { useDispatch } from "react-redux"
import { saveData } from "@/redux/features/booking"

const disableDates: any = []
let dateArr: any = []
let showDateSelected: any = []

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  if (current && current < dayjs().startOf("day")) {
    return true
  }

  const dateString = current && current.format("YYYY-MM-DD")
  if (dateString) dateArr.push(current)
  return disableDates.includes(dateString)
}

export default function Step3() {
  const cValue = useAppSelector((state) => state.bookingReducer.value)
  const distpatch = useDispatch<AppDispatch>()

  const targetOption = optionsCours.find(
    (option) => option.value === cValue.cours
  )

  const changeDate: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      distpatch(saveData({ dateSelect: dateString }))
      showDateSelected = []
      console.log("Selected Date:", dateString)
      showDateSelected.push(dateString)
      for (let i = 1; i <= Number(targetOption?.day) - 1; i++) {
        const nextDate = date.clone().add(i, "days").format("YYYY-MM-DD")
        showDateSelected.push(nextDate)
        console.log("Next Date:", nextDate)
      }
      console.log(showDateSelected)
    }
  }

  useEffect(() => {
    showDateSelected = []
  }, [showDateSelected])

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
                {showDateSelected.length > 0
                  ? showDateSelected.map((el: string, i: any) => (
                      <Space direction="vertical" key={i}>
                        <h3>วันที่ {el}</h3>
                        <Space direction="vertical">
                          <CModal
                            timetext={"09.00 - 12.00"}
                            ckey={`first${i}`}
                          />
                          <CModal
                            timetext={"09.00 - 12.00"}
                            ckey={`second${i}`}
                          />
                          <Space>
                            <Button type="text">กิจกรรมช่วงค่ำ</Button>
                            <Checkbox />
                          </Space>
                        </Space>
                      </Space>
                    ))
                  : ""}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
