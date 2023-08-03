import React, { useState } from "react"
import { Button, Col, Divider, Input, Modal, Row, Space } from "antd"
import type { RadioChangeEvent } from "antd"
import { Radio } from "antd"

import subjectAll from "./api/subject.json"

type Props = {
  sujectindex: number
  textButton: string
  form: any
}

export default function Modal2({ sujectindex, textButton, form }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [firstValue, setFirstValue] = useState(0)
  const [secondValue, setSeconValue] = useState("")
  const [selectedValue, setSelectedValue] = useState<string>("")

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value)
    setFirstValue(e.target.value)
  }

  const onChangeSecond = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value)
    setSeconValue(e.target.value)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    subjectAll.map((item) => {
      if (item.id == firstValue) {
        form.setFieldsValue({
          [`suject${sujectindex}`]: `${item.title} ${secondValue}`,
        })
      }
    })

    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {textButton}
      </Button>
      <Modal
        title={`Basic Modal ${sujectindex}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"720px"}
      >
        <Row>
          <Col span={12}>
            <Radio.Group onChange={onChange} value={firstValue}>
              <Space direction="vertical">
                <Divider orientation="left">วิชาหลัก</Divider>
                {subjectAll.map((item, i) => (
                  <Radio
                    key={i}
                    value={item.id}
                    title={item.title}
                    disabled={item.disable}
                  >
                    {item.title}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Col>
          <Col span={12}>
            <Radio.Group onChange={onChangeSecond} value={secondValue}>
              <Space direction="vertical">
                <Divider orientation="left">เลือกวิชาย่อย</Divider>
                {subjectAll
                  .find((subject) => subject.id === firstValue)
                  ?.level.map((item, i) => {
                    return (
                      <Space direction="vertical" key={i}>
                        {item.first.map((item, i) => (
                          <Radio value={item.code} key={`first${i}`}>
                            {item.msg}
                          </Radio>
                        ))}
                        {item.second.map((item, i) => (
                          <Radio value={item.code} key={`second${i}`}>
                            {item.msg}
                          </Radio>
                        ))}
                        {item.third.map((item, i) => (
                          <Radio value={item.code} key={`third${i}`}>
                            {item.msg}
                          </Radio>
                        ))}
                      </Space>
                    )
                  })}
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      </Modal>
    </>
  )
}
