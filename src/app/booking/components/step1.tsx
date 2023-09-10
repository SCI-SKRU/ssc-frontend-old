import { Cascader, Form, Input, Radio, Select, Space } from 'antd'
import { useEffect, useState } from 'react'

import { useAppContext } from '@/contexts/BookingContext'
import type { Amphure, Province, Provinces, Tambon } from '@/types/address'
import { CascaderOption } from '@/types/cascader'
import provincesJSON from '../api/provinces.json'
import { schoolsize } from '../value'

const { Option } = Select

// for dev step1 required ?
const required: boolean = true

function getProvince(): CascaderOption[] {
  const provinces: Provinces = provincesJSON

  return provinces.map((province: Province) => ({
    label: province.name_th,
    value: province.name_th,
    children: province.amphure.map((amphure: Amphure) => ({
      label: amphure.name_th,
      value: amphure.name_th,
      children: amphure.tambon.map((tambon: Tambon) => ({
        label: tambon.name_th,
        value: tambon.name_th,
      })),
    })),
  }))
}

export default function Step1() {
  const [options, setOptions] = useState<CascaderOption[]>([])
  // new
  const { state } = useAppContext()

  async function getOptions() {
    const result = getProvince()
    setOptions(result)
  }

  useEffect(() => {
    getOptions()
  }, [])

  return (
    <>
      <div style={{ textAlign: 'left' }}>
        <h1 style={{ textAlign: 'center' }}>รายละเอียดพื้นฐาน</h1>
        <Form.Item
          label="ชื่อโรงเรียน"
          name="schoolname"
          rules={[{ required: required, message: 'โปรดกรอกชื่อโรงเรียน' }]}
        >
          <Input placeholder="ชื่อโรงเรียน" value={state.schoolname} />
        </Form.Item>

        <Form.Item
          name="schoolsize"
          label="ขนาดโรงเรียน"
          rules={[{ required: required, message: 'โปรดเลือกขนาดโรงเรียน' }]}
        >
          <Select placeholder="ขนาดโรงเรียน" value={state.schoolsize} allowClear>
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
          rules={[{ required: required, message: 'โปรดเลือกจังหวัด/อำเภอ/ตำบล' }]}
        >
          <Cascader
            value={state.subaddress}
            options={options}
            placeholder="จังหวัด/อำเภอ/ตำบล"
          />
        </Form.Item>

        <Form.Item
          name="operator"
          label="ผู้ดำเนินการ"
          rules={[{ required: required, message: 'โปรดกรอกชื่อผู้ดำเนินการ' }]}
        >
          <Input placeholder="ผู้ดำเนินการ" value={state.operator} />
        </Form.Item>
        <Form.Item
          name="position"
          label="ตำแหน่ง"
          rules={[{ required: required, message: 'โปรดกรอกตำแหน่ง' }]}
        >
          <Input placeholder="ตำแหน่ง" value={state.position} />
        </Form.Item>
        <Form.Item
          name="email"
          label="อีเมล"
          rules={[
            {
              required: required,
              message: 'โปรดกรอกอีเมล',
            },
            {
              type: 'email',
              message: 'รูปแบบของอีเมลไม่ถูกต้อง',
            },
          ]}
        >
          <Input placeholder="อีเมล" value={state.email} />
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
          <Input placeholder="เบอร์โทรศัพท์" value={state.mobile} />
        </Form.Item>

        <Form.Item
          name="countclassroom"
          label="จํานวนห้องเรียนในคอร์ส (ห้องละ 40 คน)"
          rules={[{ required: required, message: 'โปรดเลือกจำนวนห้องเรียน' }]}
          labelAlign="left"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 0 }}
        >
          <Radio.Group name="countclassroom" value={state.countclassroom}>
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
