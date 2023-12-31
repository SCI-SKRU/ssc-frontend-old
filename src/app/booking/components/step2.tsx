import type { CheckboxOptionType } from 'antd'
import { Form, Radio } from 'antd'
import { useEffect, useState } from 'react'

import config from '@/config'
import { useAppContext } from '@/contexts/BookingContext'
import { Course, GetCourses } from '@/types/course'

export default function Step2() {
  const [course, setCourse] = useState<CheckboxOptionType[]>([])
  // new
  const { state, dispatch } = useAppContext()

  async function fetchCourse() {
    const response = await fetch(`${config.environments.BASE_API_URL}/courses`)
    const result: GetCourses = await response.json()
    const transformedCourses = result.courses.map((course: Course) => ({
      label: `${course.name} ${course.description}`,
      value: course.timeSlot,
    })) as []
    setCourse(transformedCourses)
  }

  useEffect(() => {
    fetchCourse()
    dispatch({
      type: 'SET_FIELD',
      field: 'dateSelect',
      value: [],
    })
  }, [])

  return (
    <>
      <div style={{ textAlign: 'left' }}>
        <h1 style={{ textAlign: 'center' }}>เลือกคอร์ส</h1>
        <Form.Item
          wrapperCol={{ span: 24 }}
          style={{ paddingLeft: 24 }}
          name="cours"
          rules={[{ required: true, message: 'โปรดเลือกคอร์ส' }]}
        >
          <Radio.Group
            style={{ fontSize: '1.5rem' }}
            options={course}
            value={state.cours}
          />
        </Form.Item>
      </div>
    </>
  )
}
