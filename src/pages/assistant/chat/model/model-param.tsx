import React, { useEffect } from 'react';
import MessageItem from '@/pages/assistant/chat/message-item';
import { Form, Input } from '@arco-design/web-react';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
function ModelParam() {
  const [layout, setLayout] = React.useState('horizontal');

  useEffect(() => {
    setLayout('horizontal');
  }, []);

  return (
    <Form
      style={layout === 'horizontal' ? { width: '100%' } : { maxWidth: '100%' }}
      autoComplete="off"
    >
      <FormItem label="助理名称" field="modelName">
        <Input placeholder="给助理取个名字吧" />
      </FormItem>

      <FormItem label="助理描述" field="promotDefault">
        <TextArea
          placeholder="给助理设置它的工作内容"
          style={{ minHeight: 104 }}
        />
      </FormItem>
    </Form>
  );
}
export default ModelParam;
