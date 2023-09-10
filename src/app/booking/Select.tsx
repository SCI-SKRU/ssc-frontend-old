import type { FormInstance } from 'antd'
import { Checkbox, Divider, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'

import { useAppContext } from '@/contexts/BookingContext'
import { fetchSubjectsByDate } from '@/utils/findPriceByCode'
import { convertToThaiDate } from '@/utils/thaiDateUtils'

const handleChange = (value: string) => {
  console.log(value)
}

type Options1 = {
  label: string
  options: Option2[]
}

type Option2 = {
  label: string
  value: string
}

type Subjects = {
  category: string
  id: number
  code: string
  name: string
  price: number
  status: string
  level: string
}

type Props = {
  form: FormInstance
  dayString: string
  date: string
  disableCheckbox: boolean
  disable1Day: boolean
  index: number
}

export default function CustomSelect({
  form,
  dayString,
  date,
  disableCheckbox,
  disable1Day,
  index,
}: Props) {
  const [option, setOption] = useState<Options1[]>()
  const { state } = useAppContext()

  useEffect(() => {
    const fetchAndSetData = async () => {
      const fetchedData = await fetchSubjectsByDate(state)
      let convertData: Options1[] = []

      fetchedData.forEach((course: Subjects) => {
        const existingCategory = convertData.find(
          (cat) => cat.label === course.category,
        )

        if (existingCategory) {
          existingCategory.options.push({
            label: course.name,
            value: course.code,
          })
        } else {
          convertData.push({
            label: course.category,
            options: [
              {
                label: course.name,
                value: course.code,
              },
            ],
          })
        }
      })

      setOption(convertData)
    }

    fetchAndSetData()
  }, [])

  return (
    <>
      <Divider orientation="left">{convertToThaiDate(dayString)}</Divider>

      <Form.Item
        name={[`${date}`, 'day']}
        label={'วันที่'}
        initialValue={dayString}
        style={{ display: 'none' }}
      >
        <Input bordered={false} />
      </Form.Item>

      <Form.Item
        name={[`${date}`]}
        label="09.00 - 12.00"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ marginBottom: 0 }}
      >
        <Form.Item
          name={[`${date}`, `subject`, `mainsubject`]}
          rules={[{ required: true, message: 'โปรดเลือกวิชา' }]}
        >
          <Select
            placeholder="เลือกวิชา"
            onChange={(e) => handleChange(e)}
            options={option || []}
          />
        </Form.Item>
      </Form.Item>

      {disableCheckbox && (
        <>
          <Form.Item
            name={[`${date}`]}
            label="13.00 - 16.00"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              name={[`${date}`, `subject`, `subsubject`]}
              rules={[{ required: true, message: 'โปรดเลือกวิชา' }]}
            >
              <Select
                placeholder="เลือกวิชา" 
                onChange={(e) => handleChange(e)}
                options={option || []}
              />
            </Form.Item>
          </Form.Item>

          {/* disable1Day คือ ถ้าเลือกคอส์ 1 วันจะให้ปิดกิจกรรมช่วงค่ำ */}
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
    </>
  )
}
