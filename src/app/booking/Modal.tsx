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
  FormInstance,
} from "antd"

import subjectAll from "./api/subject.json"

export default function Cmodal({ timetext, index }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [valueFirst, setValueFirst] = useState<number>(0)
  const [valueSecond, setValueSecond] = useState(null)
  const [selectedValue, setSelectedValue] = useState("")
  const [form] = Form.useForm()
  const formRef = React.useRef<FormInstance>(null)

  const onChangeF = (e: RadioChangeEvent) => {
    setValueFirst(e.target.value)
    setSelectedValue(String(e.target.title))
  }

  const onChangeS = async (e: RadioChangeEvent) => {
    setValueSecond(null)
    setValueSecond(e.target.value)
    setSelectedValue(`${valueFirst} ${e.target.value}`)
    let youSeleced = ""
    const subject = document.querySelectorAll(`input[name="subject"]`)
    const mainsubject = subject.forEach((item, i) => {
      const itemNow = item as HTMLInputElement
      if (itemNow.checked) {
        youSeleced += itemNow.value
        // console.log(itemNow.value)
      }
    })

    const subsubject = document.querySelectorAll(`input[name="subsubject"]`)
    const now = subsubject.forEach((item, i) => {
      const itemNow = item as HTMLInputElement
      if (itemNow.checked) {
        youSeleced += ` ${itemNow.value}`
        // console.log(itemNow.value)
      }
    })
    console.log(youSeleced)
  }

  const showModal = () => {
    setSelectedValue("")
    setIsModalOpen(true)
  }

  const handleOk = () => {
    formRef.current?.submit()
    console.log(formRef.current?.getFieldValue("subsubject"))
    // setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    setValueFirst(0)
    setValueSecond(null)
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
          <Form ref={formRef} form={form}>
            <Col span={24}>
              <Divider style={{ fontWeight: "bold" }} orientation="left">
                เลือกวิชาหลัก
              </Divider>
              <Form.Item
                name={`subject${index}`}
                rules={[{ required: true, message: "test" }]}
              >
                <Radio.Group
                  name="subject"
                  onChange={onChangeF}
                  value={valueFirst}
                >
                  <Space style={{ minWidth: "360px" }} direction="vertical">
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
              </Form.Item>
            </Col>
            <Col span={24}>
              {valueFirst != 0 && (
                <>
                  <Divider style={{ fontWeight: "bold" }} orientation="left">
                    เลือกวิชาย่อย
                  </Divider>
                  <p>ประถมศึกษา (ป.1 - ป.6)</p>
                  <Radio.Group
                    name="subsubject"
                    onChange={onChangeS}
                    value={valueSecond}
                  >
                    <Space style={{ minWidth: "360px" }} direction="vertical">
                      {subjectAll
                        .find((subject) => subject.id === valueFirst)
                        ?.level?.map((item, i) => (
                          <Space direction="vertical" key={i}>
                            {item.first.map((item2) => (
                              <Radio value={item2.code} key={item2.code}>
                                {item2.msg}
                              </Radio>
                            ))}
                          </Space>
                        ))}
                    </Space>
                  </Radio.Group>
                  <p>มัธยมศึกษาตอนตน (ม.1 - ม.3)</p>
                  <Radio.Group
                    name="subsubject"
                    onChange={onChangeS}
                    value={valueSecond}
                  >
                    <Space style={{ minWidth: "360px" }} direction="vertical">
                      {subjectAll
                        .find((subject) => subject.id === valueFirst)
                        ?.level?.map((item, i) => (
                          <Space direction="vertical" key={i}>
                            {item.second.map((item2) => (
                              <Radio value={item2.code} key={item2.code}>
                                {item2.msg}
                              </Radio>
                            ))}
                          </Space>
                        ))}
                    </Space>
                  </Radio.Group>
                  <p>มัธยมศึกษาตอนปลาย (ม.4 - ม.6)</p>
                  <Radio.Group
                    name="subsubject"
                    onChange={onChangeS}
                    value={valueSecond}
                  >
                    <Space style={{ minWidth: "360px" }} direction="vertical">
                      {subjectAll
                        .find((subject) => subject.id === valueFirst)
                        ?.level?.map((item, i) => (
                          <Space direction="vertical" key={i}>
                            {item.third.map((item2) => (
                              <Radio value={item2.code} key={item2.code}>
                                {item2.msg}
                              </Radio>
                            ))}
                          </Space>
                        ))}
                    </Space>
                  </Radio.Group>
                </>
              )}
            </Col>
          </Form>
        </Row>
      </Modal>
    </>
  )
}
