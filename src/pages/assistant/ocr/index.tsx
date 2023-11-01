import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Form,
  Grid,
  Space,
  Typography,
  Upload,
} from '@arco-design/web-react';
import OcrForm from '@/pages/assistant/ocr/form';

const { Row, Col } = Grid;

export default function Ocr() {
  return (
    <Space size={16} direction="vertical" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Typography.Title heading={6}>Ocr识别</Typography.Title>

            <OcrForm></OcrForm>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Typography.Title heading={6}>识别结果</Typography.Title>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
