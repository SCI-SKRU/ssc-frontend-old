import { Form, Input, Select, Cascader, Radio, Space, Button } from "antd"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "@/redux/store"

// path now
import { schoolsize, Optionz } from "./value"
import { CascaderOption } from "@/types/cascader"
import api_province from "./api/api_province_with_amphure_tambon.json"

const { Option } = Select

// for dev step1 required ?
const required: boolean = true

function getProvince(): CascaderOption[] {
  return api_province.map((data: any, index: any) => ({
    label: data.name_th,
    value: data.name_th,
    children: data.amphure.map((item: any) => {
      return {
        label: item.name_th,
        value: item.name_th,
        children: item.tambon.map((item2: any) => {
          return {
            label: item2.name_th,
            value: item2.name_th,
          }
        }),
      }
    }),

  }))
}

export default function Step1({ form }: any) {
  const [options, setOptions] = useState<CascaderOption[]>([])

  const selected = useAppSelector((state) => state.bookingReducer.value)

  async function getOptions() {
    const result = await getProvince()
    setOptions(result)
  }

  const onFill = () => {
    form.setFieldsValue({
      schoolname: "โรงเรียนปฤษณา",
      schoolsize: "ขนาดเล็ก",
      subaddress: ["สงขลา", "เมืองสงขลา", "บ่อยาง"],
      operator: "จอห์น แมว",
      position: "ครู",
      email: "radis@gmail.com",
      mobile: "085542225",
      countclassroom: 1,
    })
  }

  useEffect(() => {
    getOptions()
  }, [])

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <h1 style={{ textAlign: "center" }}>รายละเอียดพื้นฐาน</h1>
        <Form.Item
          label="ชื่อโรงเรียน"
          name="schoolname"
          rules={[{ required: required, message: "โปรดกรอกชื่อโรงเรียน" }]}
        >
          <Input placeholder="ชื่อโรงเรียน" value={selected.schoolname} />
        </Form.Item>

        <Form.Item
          name="schoolsize"
          label="ขนาดโรงเรียน"
          rules={[{ required: required, message: "โปรดเลือกขนาดโรงเรียน" }]}
        >
          <Select
            placeholder="ขนาดโรงเรียน"
            value={selected.schoolsize}
            allowClear
          >
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
          <Cascader
            value={selected.subaddress}
            options={options}
            placeholder="จังหวัด/อำเภอ/ตำบล"
          />
        </Form.Item>

        <Form.Item
          name="operator"
          label="ผู้ดำเนินการ"
          rules={[{ required: required, message: "โปรดกรอกชื่อผู้ดำเนินการ" }]}
        >
          <Input placeholder="ผู้ดำเนินการ" value={selected.operator} />
        </Form.Item>
        <Form.Item
          name="position"
          label="ตำแหน่ง"
          rules={[{ required: required, message: "โปรดกรอกตำแหน่ง" }]}
        >
          <Input placeholder="ตำแหน่ง" value={selected.position} />
        </Form.Item>
        <Form.Item
          name="email"
          label="อีเมล"
          rules={[
            { 
              required: required, 
              message: "โปรดกรอกอีเมล" 
            }, 
            {
              type: 'email',
              message: 'รูปแบบของอีเมลไม่ถูกต้อง'
            },
          ]}
        >
          <Input placeholder="อีเมล" value={selected.email} />
        </Form.Item>
        <Form.Item
          name="mobile"
          label="เบอร์โทรศัพท์"
          rules={[
            {
              required: true,
              message: 'โปรดกรอกเบอร์โทรศัพท์',
            },
            {
              pattern: /^[0-9]*$/,
              message: 'รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง',
            },
            {
              min: 10,
              message: 'รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง',
            },
          ]}
        >
          <Input placeholder="เบอร์โทรศัพท์" value={selected.mobile} />
        </Form.Item>

        <Form.Item
          name="countclassroom"
          label="จํานวนห้องเรียนในคอร์ส (ห้องละ 40 คน)"
          rules={[{ required: required, message: "โปรดเลือกจำนวนห้องเรียน" }]}
        >
          <Radio.Group name="countclassroom" value={selected.countclassroom}>
            <Space direction="horizontal">
              <Radio value={1}>1 ห้อง</Radio>
              <Radio value={2}>2 ห้อง</Radio>
              <Radio value={3}>3 ห้อง</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {/* <Button onClick={onFill}>Auto Fill</Button> */}
      </div>
    </>
  )
}
