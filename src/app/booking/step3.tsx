import { Row, Col, Card } from "antd"
import React from "react"

export default function Step3() {
  return (
    <>
      <div style={{ textAlign: "left", paddingBottom: "48px" }}>
        <h1 style={{ textAlign: "center" }}>Step3</h1>
        <Row gutter={[16, 16]} justify="space-evenly">
          <Col span={20}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={20}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={20}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
