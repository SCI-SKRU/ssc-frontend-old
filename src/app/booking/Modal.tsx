import React, { useState } from "react"
import {
  Button,
  Modal,
  Input,
  Space,
  Radio,
  RadioChangeEvent,
  Form,
  Row,
  Col,
  Divider,
} from "antd"
import type { RadioGroupProps } from "antd"

export default function Cmodal(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [valueFirst, setValueFirst] = useState(null)
  const [valueSecond, setValueSecond] = useState(null)

  const onChangeF = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value)
    setValueFirst(e.target.value)
  }
  const onChangeS = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value)
    setValueSecond(e.target.value)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const radioItems = [
    { value: 1, title: "ฟิสิก" },
    { value: 2, title: "เคมี" },
    { value: 3, title: "ชีววิทยา จุลชีววิทยาและเทคโนโลยีชีวภาพ" },
    { value: 4, title: "คณิตศาสตร" },
    { value: 5, title: "คอมพิวเตอรและเทคโนโลยีสารสนเทศ" },
    { value: 6, title: "วิทยาศาสตรประยุกตและนวัตกรรม" },
    { value: 7, title: "วิทยาศาสตรสิ่งแวดลอม" },
    { value: 8, title: "คหกรรม" },
    { value: 9, title: "วิทยาศาสตรสุขภาพ" },
  ]

  return (
    <>
      <Space direction="horizontal">
        <Button type="text">{props.timetext}</Button>
        <Button type="primary" onClick={showModal}>
          เลือกวิชา
        </Button>
        <Input placeholder="Basic usage" value={"อังกฤษ"} disabled />
      </Space>
      <Modal
        title="เลือกหมวดวิชา"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={720}
      >
        <Row>
          <Col span={12}>
            <Divider orientation="left">เลือกวิชาหลัก</Divider>
            <Form.Item name="firstSub">
              <Radio.Group onChange={onChangeF} value={valueFirst}>
                <Space style={{ minWidth: "360px" }} direction="vertical">
                  {radioItems.map((item, i) => (
                    <Radio key={i} value={item.value}>
                      {item.title}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            {true && (
              <>
                <Divider orientation="left">เลือกวิชาย่อย</Divider>
                <p>test 1</p>
                <Radio.Group
                  name="test1"
                  onChange={onChangeS}
                  value={valueSecond}
                >
                  <Space style={{ minWidth: "360px" }} direction="vertical">
                    <Radio value={1}>test1</Radio>
                    <Radio value={2}>test2</Radio>
                    <Radio value={3}>test3</Radio>
                  </Space>
                </Radio.Group>
                <p>test 2</p>
                <Radio.Group
                  name="test1"
                  onChange={onChangeS}
                  value={valueSecond}
                >
                  <Space style={{ minWidth: "360px" }} direction="vertical">
                    <Radio value={4}>test4</Radio>
                    <Radio value={5}>test5</Radio>
                    <Radio value={6}>test6</Radio>
                  </Space>
                </Radio.Group>
                <p>test 3</p>
                <Radio.Group
                  name="test1"
                  onChange={onChangeS}
                  value={valueSecond}
                >
                  <Space style={{ minWidth: "360px" }} direction="vertical">
                    <Radio value={7}>test7</Radio>
                    <Radio value={8}>test8</Radio>
                    <Radio value={9}>test9</Radio>
                  </Space>
                </Radio.Group>
              </>
            )}
          </Col>
        </Row>
      </Modal>
    </>
  )
}
