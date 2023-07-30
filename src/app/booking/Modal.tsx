import React, { useEffect, useState } from "react"
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

import subjectAll from "./subject.json"

export default function Cmodal({ timetext }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [valueFirst, setValueFirst] = useState(1)
  const [valueSecond, setValueSecond] = useState(null)
  const [selectedValue, setSelectedValue] = useState("")

  const onChangeF = (e: RadioChangeEvent) => {
    setValueFirst(e.target.value)
    setSelectedValue(String(e.target.title))
  }

  const onChangeS = async (e: RadioChangeEvent) => {
    setValueSecond(e.target.value)
    setSelectedValue(`${selectedValue} ${e.target.value}`)
  }

  const showModal = () => {
    setSelectedValue("")
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    console.log(valueFirst)
  }, [])

  return (
    <>
      <Space direction="horizontal">
        <Button type="text">{timetext}</Button>
        <Button type="primary" onClick={showModal}>
          เลือกวิชา
        </Button>
        <Input disabled value={selectedValue} />
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
              <Radio.Group name="test0" onChange={onChangeF} value={valueFirst}>
                <Space style={{ minWidth: "360px" }} direction="vertical">
                  {subjectAll.map((item, i) => (
                    <Radio key={i} value={item.id} title={item.title}>
                      {item.title}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            {valueFirst !== null && (
              <>
                <Divider orientation="left">เลือกวิชาย่อย</Divider>
                <p>ประถมศึกษา (ป.1 - ป.6)</p>
                <Radio.Group
                  name="test1"
                  onChange={onChangeS}
                  value={valueSecond}
                >
                  <Space style={{ minWidth: "360px" }} direction="vertical">
                    {subjectAll
                      .find((subject) => subject.id === valueFirst)
                      ?.level?.map((item, i) => (
                        <div key={i}>
                          {item.first.map((item2) => (
                            <Radio value={item2.code} key={item2.code}>
                              {item2.msg}
                            </Radio>
                          ))}
                        </div>
                      ))}
                  </Space>
                </Radio.Group>
                <p>มัธยมศึกษาตอนตน (ม.1 - ม.3)</p>
                <Radio.Group
                  name="test2"
                  onChange={onChangeS}
                  value={valueSecond}
                >
                  <Space style={{ minWidth: "360px" }} direction="vertical">
                    {subjectAll
                      .find((subject) => subject.id === valueFirst)
                      ?.level?.map((item, i) => (
                        <div key={i}>
                          {item.second.map((item2) => (
                            <Radio value={item2.code} key={item2.code}>
                              {item2.msg}
                            </Radio>
                          ))}
                        </div>
                      ))}
                  </Space>
                </Radio.Group>
                <p>มัธยมศึกษาตอนปลาย (ม.4 - ม.6)</p>
                <Radio.Group
                  name="test3"
                  onChange={onChangeS}
                  value={valueSecond}
                >
                  <Space style={{ minWidth: "360px" }} direction="vertical">
                    {subjectAll
                      .find((subject) => subject.id === valueFirst)
                      ?.level?.map((item, i) => (
                        <div key={i}>
                          {item.third.map((item2) => (
                            <Radio value={item2.code} key={item2.code}>
                              {item2.msg}
                            </Radio>
                          ))}
                        </div>
                      ))}
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
