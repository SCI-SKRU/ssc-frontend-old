import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Form, Radio } from "antd"
import type { CheckboxOptionType } from "antd"
import { useAppContext } from "@/components/AppContext"

export default function Step2() {
  const [course, setCourse] = useState<CheckboxOptionType[]>([])
  // new
  const { state, dispatch } = useAppContext()

  async function fetchCourse() {
    const endpoint =
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/courses` ||
      "http://localhost:3000/api/v1/courses"
    const response = await fetch(endpoint)
    const result = await response.json()
    const transformedCourses = result.courses.map((course: any) => ({
      label: `${course.name} ${course.description}`,
      value: course.timeSlot,
    })) as []
    setCourse(transformedCourses)
  }

  useEffect(() => {
    fetchCourse()
    dispatch({
      type: "SET_FIELD",
      field: "dateSelect",
      value: [],
    })
  }, [])

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <h1 style={{ textAlign: "center" }}>เลือกคอร์ส</h1>
        <Form.Item
          wrapperCol={{ span: 24 }}
          style={{ paddingLeft: 24 }}
          name="cours"
          rules={[{ required: true, message: "โปรดเลือกคอร์ส" }]}
        >
          <Radio.Group
            style={{ fontSize: "1.5rem" }}
            options={course}
            value={state.cours}
          />
        </Form.Item>
      </div>
    </>
  )
}
