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
  FormInstance,
  Alert,
  Divider,
} from "antd"
import type { RangePickerProps, DatePickerProps } from "antd/es/date-picker"
import dayjs from "dayjs"
import type { Dayjs } from "dayjs"
import "dayjs/locale/th"
import locale from "antd/es/date-picker/locale/th_TH"
import { AppDispatch, useAppSelector } from "@/redux/store"

import CModal from "./Modal"
import CModal2 from "./Modal2"
import { optionsCours } from "./value"
import { useDispatch } from "react-redux"
import { saveData } from "@/redux/features/booking"
import { getDataCourse } from "./api/routes"
import { CheckboxChangeEvent } from "antd/es/checkbox"

const dateFormat = "YYYY/MM/DD"

// disable from database
const disableDates: any = []
let dateSelected: any[] = []

export default function Step3({ formRef, form }: any) {
  const [course, setCourse] = useState<[]>([])
  const [dateVal, setDateVal] = useState<Dayjs>()
  const [error, setError] = useState<string>("")
  const [disableCheckbox, setDisableCheckbox] = useState(false)
  const booking = useAppSelector((state) => state.bookingReducer.value)
  const distpatch = useDispatch<AppDispatch>()

  async function fetchCourse() {
    const result = await getDataCourse()
    setCourse(result)
  }

  const changeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDisableCheckbox(false)
    if (date) {
      setDateVal(date)
      dateSelected = []
      setError("")
      let cours = booking.cours
      if (cours < 3) cours = 1
      else if (cours < 5) cours = 2
      else if (cours < 7) cours = 3
      for (let i = 0; i < cours; i++) {
        const nextDate = date.clone().add(i, "days").format("YYYY-MM-DD")
        dateSelected.push(nextDate)
        if (disableDates.includes(nextDate)) {
          setError("โปรดเลือกวันที่ที่ไม่ชนกับวันอื่น")
          formRef.current?.resetFields(["dateSelect"])
        }
      }
      distpatch(saveData({ dateSelect: dateSelected }))
    }
  }

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (current && current < dayjs().startOf("day")) return true

    const dateString = current && current.format("YYYY-MM-DD")
    return disableDates.includes(dateString)
  }

  function ckeckbox(e: CheckboxChangeEvent, text: any) {
    form.setFieldsValue({
      [text]: e.target.checked,
    })
  }

  function afterSelect() {
    if (dateSelected.length == 0) return <></>
    let count = 0
    const result = dateSelected.map((date, i) => {
      let el = (
        <Space direction="vertical" key={i}>
          <Divider orientation="left">
            {date} วันที่ ({i + 1})
          </Divider>
          <Space direction="horizontal" align="start">
            <Button type="text">09.00 - 12.00</Button>
            <CModal2 textButton="เลือกวิชา" sujectindex={count} form={form} />
            <Form.Item
              name={`suject${count}`}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "โปรดเลือกวิชา" }]}
            >
              <Input disabled />
            </Form.Item>
          </Space>
          <Space direction="horizontal" align="start">
            <Button type="text">13.00 - 16.00</Button>
            <CModal2
              textButton="เลือกวิชา"
              sujectindex={count + 1}
              form={form}
            />
            <Form.Item
              name={`suject${count + 1}`}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "โปรดเลือกวิชา" }]}
            >
              <Input disabled />
            </Form.Item>
          </Space>
          <Form.Item name={`checkbox${i}`} valuePropName="checked" noStyle>
            <Checkbox
              name={`checkbox${i}`}
              key={i}
              onChange={(e) => ckeckbox(e, `checkbox${i}`)}
            >
              กิจกรรมช่วงค่ำ
            </Checkbox>
          </Form.Item>
        </Space>
      )
      count += 2
      // เซท default สำหรับ checkbox
      form.setFieldsValue({
        [`checkbox${i}`]: false,
      })
      return el
    })
    // const arrInput = document.querySelectorAll('input[id="suject0"]')
    // console.log(arrInput)
    return result
  }

  useEffect(() => {
    fetchCourse()
    formRef.current?.resetFields(["dateSelect"])
    dateSelected = []
  }, [])

  return (
    <>
      <div style={{ textAlign: "left", paddingBottom: "48px" }}>
        <h1 style={{ textAlign: "center" }}>Step3</h1>
        <Row gutter={[16, 16]} justify="space-evenly">
          <Col span={20}>
            <Card title={<>{}</>} bordered={false}>
              <Space direction="vertical" style={{ width: "100%" }}>
                {error && (
                  <Alert
                    message="โปรดเลือกวันที่ที่ไม่ชนกับวันอื่น"
                    type="error"
                  />
                )}
                <Form.Item
                  label="เลือกวันที่"
                  name="dateSelect"
                  rules={[{ required: true, message: "โปรดเลือกวันที่" }]}
                  wrapperCol={{ span: 12 }}
                  labelCol={{ span: 8 }}
                  initialValue={
                    booking?.dateSelect[0]
                      ? dayjs(booking?.dateSelect[0], dateFormat)
                      : ""
                  }
                >
                  <DatePicker
                    disabledDate={disabledDate}
                    onChange={changeDate}
                    locale={locale}
                    allowClear
                  />
                </Form.Item>
              </Space>
              {booking?.dateSelect[0] ? afterSelect() : ""}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
