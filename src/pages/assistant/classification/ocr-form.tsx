import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  Button,
  Select,
  Upload,
  Card,
  Typography,
} from '@arco-design/web-react';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import { FormInstance } from '@arco-design/web-react/es/Form';
import axios from '@/utils/axios';

const uploadUrl = `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/upload`;
export default function OcrForm() {
  const t = useLocale(locale);

  const formRef = useRef<FormInstance>();

  const Option = Select.Option;
  const fileTypeOptions = [
    { label: '身份证', value: 'idCard' },
    { label: '驾驶证', value: 'driverLicense' },
    { label: '银行卡', value: 'bankCard' },
  ];

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({});

  function onSubmitClick(values) {
    setLoading(true);
    values.imgUrl =
      values.imgUrl?.[0]?.response?.data?.success_data?.[0]?.preview_url;

    axios.post('/api/v1/ocr', values).then((res) => {
      const { status, data } = res.data;
      if (status === 'ok') {
        console.log(data);
        setResult(data);
      }
    });
    formRef.current.resetFields();
    setLoading(false);
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
          label="识别内容"
          field="fileType"
          rules={[{ required: true, message: t['ocr.form.filetype.errMsg'] }]}
        >
          <Select
            placeholder="请选择你要识别的内容"
            style={{ width: '100%' }}
            allowClear
          >
            {fileTypeOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

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
            {t['ocr.form.submit']}
          </Button>
        </Form.Item>
      </Form>

      <Card>
        <Typography.Title heading={6}>识别结果</Typography.Title>
        <div>{JSON.stringify(result, null, 2)}</div>
      </Card>
    </div>
  );
}
