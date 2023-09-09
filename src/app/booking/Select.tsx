import type { FormInstance } from 'antd'
import { Checkbox, Divider, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'

import { useAppContext } from '@/contexts/BookingContext'
import { convertToThaiDate } from '@/utils/thaiDateUtils'

const handleChange = (value: string) => {
  // console.log(value)
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

  const fetchData = async () => {
    try {
      let startDate = ''
      let endDate = ''
      if (state.dateSelect.length === 1) {
        startDate = state.dateSelect[0]
        endDate = state.dateSelect[0]
      } else {
        startDate = state.dateSelect[0]
        endDate = state.dateSelect[state.dateSelect.length - 1]
      }
      const response = await fetch(
        `https://4dc0-159-223-93-76.ngrok-free.app/api/v1/subjects?startDate=${startDate}&endDate=${endDate}`,
      )
      const data = await response.json()
      return data.subjects
    } catch (error) {
      console.error('Error fetching data:', error)
      return []
    }
  }

  useEffect(() => {
    const fetchAndSetData = async () => {
      const fetchedData = await fetchData()
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
          initialValue={'เลือกวิชา'}
        >
          <Select
            // defaultValue="เลือกวิชา"
            // style={{ width: "300px" }}
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
              initialValue={'เลือกวิชา'}
            >
              <Select
                // defaultValue="เลือกวิชา"
                // style={{ width: "300px" }}
                onChange={handleChange}
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
