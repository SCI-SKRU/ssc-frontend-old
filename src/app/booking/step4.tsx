import React, { useState } from "react"
import { Button, Divider, Form, Input, Space } from "antd"

type Props = {}

export default function Step4({}: Props) {
  const [codeCoupon, setCodeCoupon] = useState("")
  return (
    <>
      <h1 style={{ textAlign: "center" }}>คูปอง</h1>
      <Space direction="vertical" align="start" style={{ marginTop: "24px" }}>
        <Form.Item
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 18 }}
          name="coupon"
          label="รหัสคูปอง"
        >
          <Input
            placeholder="กรอกคูปอง"
            onChange={(e) => setCodeCoupon(() => e.target.value)}
          />
        </Form.Item>
        <Button
          onClick={() => console.log(codeCoupon)}
          disabled={codeCoupon ? false : true}
        >
          ใช้คูปอง
        </Button>
      </Space>
    </>
  )
}
