import React from "react"
import { Button, Divider, Form, Input, Space } from "antd"

type Props = {}

export default function Step4({}: Props) {
  return (
    <>
      <Divider>ใช้คูปอง</Divider>
      <Space direction="horizontal" align="start" style={{ marginTop: "24px" }}>
        <Form.Item
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          name="coupon"
          label="รหัสคูปอง"
        >
          <Input placeholder="กรอกคูปอง" />
        </Form.Item>
        <Button>ใช้คูปอง</Button>
      </Space>
    </>
  )
}
