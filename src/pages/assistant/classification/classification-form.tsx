import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  Button,
  Select,
  Upload,
  Card,
  Typography,
  Space,
  Image,
} from '@arco-design/web-react';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import { FormInstance } from '@arco-design/web-react/es/Form';
import axios from '@/utils/axios';
import { get } from '@antv/util';

const uploadUrl = `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/upload`;
export default function ClassificationForm() {
  const t = useLocale(locale);

  const formRef = useRef<FormInstance>();

  const [targetImg, setTargetImg] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function getClassification(params) {
    setLoading(true);
    axios.post('/api/v1/img/classification', { imgUrl: params }).then((res) => {
      const { status, data } = res.data;
      if (status === 'ok') {
        console.log(data);
        setResultMessage(data.imgType);
        setTargetImg(data.img_url);
      }
    });
    setLoading(false);
  }

  function onSubmitClick(values) {
    getClassification(
      values.imgUrl?.[0]?.response?.data?.success_data?.[0]?.preview_url
    );
    formRef.current.resetFields();
  }

  return (
    <div>
      <Form
        autoComplete="off"
        layout={'horizontal'}
        style={{ width: '100%' }}
        onSubmit={onSubmitClick}
        ref={formRef}
      >
        <Form.Item
          label="上传文件"
          field="imgUrl"
          rules={[{ required: true, message: t['ocr.form.upload.errMsg'] }]}
          triggerPropName="fileList"
        >
          <Upload
            listType="picture-card"
            limit={1}
            multiple={false}
            name="files"
            action={uploadUrl}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary" loading={loading} htmlType="submit">
            {t['classification.form.submit']}
          </Button>
        </Form.Item>
      </Form>

      <Card>
        <Typography.Title heading={6}>识别结果</Typography.Title>

        {resultMessage != '' ? (
          <Space size={60} align="start">
            <Image width={200} src={targetImg} />
            <p> 识别结果:{resultMessage}</p>
          </Space>
        ) : null}
      </Card>
    </div>
  );
}
