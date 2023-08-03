import React, { useState, useEffect } from "react"
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Space,
} from "antd"
import { convertToThaiDate } from "@/utils/thaiDateUtils"

type Props = {
  // mainsubject: number
  // subsubject: number
  dayString: string
  date: string
  disableCheckbox: boolean
  disable1Day: boolean
  ckey: number
}

const testSuject = "ฟิสิกส์"
// const testSuject = ""

function CModal({
  dayString,
  date,
  disableCheckbox,
  disable1Day,
  ckey,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {}, [])

  return (
    <>
      <Divider orientation="left">{convertToThaiDate(dayString)}</Divider>
      {/* <Divider orientation="left">วันที่ {dayString}</Divider> */}

      <Form.Item
        name={[`${date}`, "day"]}
        label={"วันที่"}
        initialValue={dayString}
        style={{ display: "none" }}
      >
        <Input bordered={false} />
      </Form.Item>

      <Form.Item
        name={[`${date}`]}
        label="09.00 - 12.00"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 8 }}
        style={{ marginBottom: 0 }}
      >
        <Space direction="horizontal" align="start">
          <Button type="primary" onClick={showModal}>
            เลือกวิชา
          </Button>
          <Form.Item
            initialValue={testSuject}
            name={[`${date}`, `subject`, `mainsubject`]}
            rules={[{ required: true, message: "โปรดเลือกวิชา" }]}
          >
            <Input disabled />
          </Form.Item>
        </Space>
      </Form.Item>

      {disableCheckbox && (
        <>
          <Form.Item
            name={[`${date}`]}
            label="13.00 - 16.00"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 8 }}
            style={{ marginBottom: 0 }}
          >
            <Space direction="horizontal" align="start">
              <Button type="primary" onClick={showModal}>
                เลือกวิชา
              </Button>
              <Form.Item
                initialValue={testSuject}
                name={[`${date}`, `subject`, `subsubject`]}
                rules={[{ required: true, message: "โปรดเลือกวิชา" }]}
              >
                <Input disabled />
              </Form.Item>
            </Space>
          </Form.Item>

          {disable1Day && (
            <Form.Item
              label="กิจกรรมช่วงค่ำ"
              name={[`${date}`, `activity`]}
              valuePropName="checked"
              initialValue={false}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 1 }}
            >
              <Checkbox />
            </Form.Item>
          )}
        </>
      )}

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default CModal
