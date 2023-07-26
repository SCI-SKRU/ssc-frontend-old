import { Col, Row, Card } from 'antd'

export default function Booking() {
  return (
    <Row>
      <Col span={12} offset={6}>
        <Card>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
    </Row>
  )
}
