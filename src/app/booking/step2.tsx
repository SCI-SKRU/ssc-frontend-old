import { Button, Form, Radio } from "antd"
import type { CheckboxOptionType } from "antd"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "@/redux/store"
import { getDataCourse } from "./api/routes"

export default function Step2() {
  const [course, setCourse] = useState<CheckboxOptionType[]>([])
  const selected = useAppSelector((state) => state.bookingReducer.value.cours)

  async function fetchCourse() {
    const result = await getDataCourse()
    const transformedCourses = result.courses.map((course: any) => ({
      label: `${course.name} ${course.description}`,
      value: course.timeSlot,
    })) as []
    setCourse(transformedCourses)
  }

  useEffect(() => {
    fetchCourse()
  }, [])

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <h1 style={{ textAlign: "center" }}>Step2</h1>
        <Form.Item
          wrapperCol={{ span: 24 }}
          style={{ paddingLeft: 24 }}
          name="cours"
          rules={[{ required: true, message: "โปรดเลือกคอร์ส" }]}
        >
          <Radio.Group
            style={{ fontSize: "1.5rem" }}
            options={course}
            value={selected}
          />
        </Form.Item>
      </div>
    </>
  )
}
