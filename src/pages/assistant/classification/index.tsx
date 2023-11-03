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
import OcrForm from '@/pages/assistant/classification/ocr-form';
import ClassificationForm from '@/pages/assistant/classification/classification-form';

const { Row, Col } = Grid;

export default function Ocr() {
  return (
    <Space size={16} direction="vertical" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Typography.Title heading={6}>图片分类</Typography.Title>
            <ClassificationForm></ClassificationForm>
          </Card>
        </Col>

        <Col span={12}>
          <Card>
            <Typography.Title heading={6}>OCR识别</Typography.Title>
            <OcrForm></OcrForm>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
