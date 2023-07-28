import { Form, Input, Select, Cascader, InputNumber, Radio, Space } from "antd"
import React, { useEffect, useState } from "react"

// path now
import { schoolsize, getValue, Optionz } from "./value"

const { Option } = Select

const layout = {
  labelCol: { span: 12, xs: 14, lg: 14, xl: 12 },
  wrapperCol: { span: 12 },
}

// for dev
const required = true

export default function Step1() {
  const [options, setOptions] = useState<Optionz[]>([])

  async function getOptions() {
    const result = await getValue()
    setOptions(result)
  }

  useEffect(() => {
    getOptions()
  }, [options])

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <h1 style={{ textAlign: "center" }}>Step1</h1>
        <Form.Item
          label="ชื่อโรงเรียน"
          name="schoolname"
          rules={[{ required: required, message: "โปรดกรอกชื่อโรงเรียน" }]}
        >
          <Input placeholder="ชื่อโรงเรียน" />
        </Form.Item>

        <Form.Item
          name="schoolsize"
          label="ขนาดโรงเรียน"
          rules={[{ required: required, message: "โปรดเลือกขนาดโรงเรียน" }]}
        >
          <Select placeholder="ขนาดโรงเรียน" allowClear>
            {schoolsize.map((el, index) => (
              <Option value={el.option} key={index}>
                {el.size}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="subaddress"
          label="จังหวัด/อำเภอ/ตำบล"
          rules={[
            { required: required, message: "โปรดเลือกจังหวัด/อำเภอ/ตำบล" },
          ]}
        >
          <Cascader options={options} placeholder="จังหวัด/อำเภอ/ตำบล" />
        </Form.Item>

        <Form.Item label="เข้าร่วมครั้งที่">
          <InputNumber value={0} disabled />
        </Form.Item>

        <Form.Item
          name="operator"
          label="ผู้ดำเนินการ"
          rules={[{ required: required, message: "โปรดกรอกชื่อผู้ดำเนินการ" }]}
        >
          <Input placeholder="ผู้ดำเนินการ" />
        </Form.Item>
        <Form.Item
          name="position"
          label="ตำแหน่ง"
          rules={[{ required: required, message: "โปรดกรอกตำแหน่ง" }]}
        >
          <Input placeholder="ตำแหน่ง" />
        </Form.Item>
        <Form.Item
          name="email"
          label="อีเมล"
          rules={[{ required: required, message: "โปรดกรอกอีเมล" }]}
        >
          <Input placeholder="อีเมล" />
        </Form.Item>
        <Form.Item
          name="mobile"
          label="เบอร์โทรศัพท์"
          rules={[{ required: required, message: "โปรดกรอกเบอร์โทรศัพท์" }]}
        >
          <Input placeholder="เบอร์โทรศัพท์" />
        </Form.Item>

        <Form.Item
          name="countclassroom"
          label="จํานวนห้องเรียนในคอร์ส (ห้องละ 40 คน)"
          rules={[{ required: required, message: "โปรดเลือกจำนวนห้องเรียน" }]}
        >
          <Radio.Group name="countclassroom">
            <Space direction="horizontal">
              <Radio value={1}>1 ห้อง</Radio>
              <Radio value={2}>2 ห้อง</Radio>
              <Radio value={3}>3 ห้อง</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </div>
    </>
  )
}
