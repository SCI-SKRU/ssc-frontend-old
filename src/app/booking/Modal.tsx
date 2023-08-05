import React, { useState, useEffect } from "react"
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Modal,
  Space,
  Col,
  Row,
  Radio,
} from "antd"
import type { FormInstance, RadioChangeEvent } from "antd"
import { convertToThaiDate } from "@/utils/thaiDateUtils"

import subjectAll from "./api/subject.json"

type Props = {
  form: FormInstance
  dayString: string
  date: string
  disableCheckbox: boolean
  disable1Day: boolean
  index: number
}

function CModal({
  form,
  dayString,
  date,
  disableCheckbox,
  disable1Day,
  index,
}: Props) {
  const [mainSubjectSelected, setMainSubjectSelected] = useState(undefined)
  const [titleMainSubject, setTitleMainSubject] = useState("")
  const [subSubjectSelected, setSubSubjectSelected] = useState(undefined)
  const [isMainSub, setIsMainSub] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = (e: any, isMainSub: number) => {
    setIsMainSub(isMainSub)
    setIsModalOpen(true)
  }

  const handleOk = (e: any) => {
    const notEmpty = mainSubjectSelected && subSubjectSelected
    const text = `${titleMainSubject} ${subSubjectSelected}`
    if (isMainSub === 1 && notEmpty) {
      form.setFieldsValue({
        [`${date}`]: {
          subject: {
            mainsubject: notEmpty ? text : `Error`,
          },
        },
      })
    } else if (isMainSub === 2 && notEmpty) {
      form.setFieldsValue({
        [`${date}`]: {
          subject: {
            subsubject: notEmpty ? text : `Error`,
          },
        },
      })
    } else {
      alert("Some thing error")
      resetSubject()
    }

    resetSubject()
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    resetSubject()
    setIsModalOpen(false)
  }

  const mainRadioOnchange = (e: RadioChangeEvent) => {
    setTitleMainSubject(String(e.target.title))
    setMainSubjectSelected(e.target.value)
  }

  const subRadioOnchange = (e: RadioChangeEvent) => {
    setSubSubjectSelected(e.target.value)
  }

  const resetSubject = () => {
    setMainSubjectSelected(undefined)
    setSubSubjectSelected(undefined)
  }

  useEffect(() => {
    resetSubject()
    form.setFieldsValue({
      [`${date}`]: {
        subject: {
          subsubject: "",
        },
      },
    })
    form.setFieldsValue({
      [`${date}`]: {
        subject: {
          mainsubject: "",
        },
      },
    })
  }, [])

  return (
    <>
      <div>
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
            <Button type="primary" onClick={(e) => showModal(e, 1)}>
              เลือกวิชา
            </Button>
            <Form.Item
              name={[`${date}`, `subject`, `mainsubject`]}
              rules={[{ required: true, message: "โปรดเลือกวิชา" }]}
            >
              <Input disabled />
            </Form.Item>
          </Space>
        </Form.Item>
      </div>

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
              <Button type="primary" onClick={(e) => showModal(e, 2)}>
                เลือกวิชา
              </Button>
              <Form.Item
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
        onOk={(e) => handleOk(e)}
        onCancel={handleCancel}
        width={720}
        key={index}
      >
        <Row>
          <Col span={12} style={{ backgroundColor: "#c2d9ff" }}>
            <Divider orientation="left" style={{ fontWeight: "bold" }}>
              เลือกวิชาหลัก
            </Divider>
            <Radio.Group
              value={mainSubjectSelected}
              onChange={mainRadioOnchange}
            >
              <Space direction="vertical">
                {subjectAll.map((option, i) => (
                  <Radio
                    key={i}
                    title={option.title}
                    value={option.id}
                    disabled={option.disable}
                  >
                    {option.title}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Col>
          <Col span={12} style={{ backgroundColor: "#c2ffca" }}>
            {mainSubjectSelected && (
              <>
                <Divider orientation="left" style={{ fontWeight: "bold" }}>
                  เลือกวิชาย่อย
                </Divider>
                <Radio.Group
                  value={subSubjectSelected}
                  onChange={subRadioOnchange}
                >
                  <Space direction="vertical">
                    {subjectAll
                      .find((subject) => subject.id === mainSubjectSelected)
                      ?.level.map((item, i) => (
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

export default CModal
