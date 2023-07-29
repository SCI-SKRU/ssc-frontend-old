import { Form, Radio } from "antd"
import React from "react"
import { optionsCours } from "./value"

export default function Step2() {
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
          <Radio.Group style={{ fontSize: "1.5rem" }} options={optionsCours} />
        </Form.Item>
      </div>
    </>
  )
}
