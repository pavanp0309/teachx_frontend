import React from 'react'
import { Card, Row, Col } from "antd";

const SuperAdmin = () => {
  return (
    <div className="container mt-4">
    <h2>Dashboard</h2>
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card title="Total Users" bordered={false}>
          1500
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card title="Total Courses" bordered={false}>
          120
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card title="Live Classes" bordered={false}>
          15
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card title="Announcements" bordered={false}>
          5
        </Card>
      </Col>
    </Row>
  </div>
  )
}

export default SuperAdmin
