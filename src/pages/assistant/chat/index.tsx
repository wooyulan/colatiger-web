import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  Grid,
  Space,
  Input,
  Comment,
  Table,
  Typography,
  Avatar,
  Upload,
} from '@arco-design/web-react';

import MultiInterval from '@/components/Chart/multi-stack-interval';
import { v4 as uuidv4 } from 'uuid';
import locale from './locale';
import { Sse } from '@/utils/sse';
import useLocale from '@/utils/useLocale';
import dayjs from 'dayjs';
import axios from '@/utils/axios';
import MessageItem, { MessageProps } from '@/pages/assistant/chat/message-item';
import { UploadItem } from '@arco-design/web-react/es/Upload';

const { Row, Col } = Grid;
const InputSearch = Input.Search;

const uploadUrl = `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/upload`;

function Chatbox() {
  const chat = useRef(new Sse());
  const t = useLocale(locale);
  // 搜索按钮loading状态
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  // 设置messageArray
  const [messageList, setMessageList] = useState<MessageProps[]>([]);
  const messagesEndRef = useRef(null);

  const handlerSearch = (e: string) => {
    setSearchText(e);
  };

  // 加载历史记录
  function loadHisChat() {
    setErrorMessage('');
    axios.post('/api/v1/chat/history').then((res) => {
      console.log(res.data.data);
      const { status, data } = res.data;
      if (status === 'ok') {
        data
          .sort(
            (a, b) =>
              dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf()
          )
          .forEach((v: any) => {
            messageList.push({
              messageId: uuidv4(),
              content: v.user_content,
              file: v.file,
              isBot: false,
              createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            });

            messageList.push({
              messageId: uuidv4(),
              content: v.answer,
              isBot: true,
              createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            });
          });

        setMessageList([...messageList]);
      }
    });
  }

  function onSearchClick(value: string) {
    setSearchLoading(true);
    setInputDisabled(true);
    messageList.push({
      messageId: uuidv4(),
      content: value,
      isBot: false,
      createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });

    const uuid = uuidv4;
    messageList.push({
      messageId: uuid,
      content: '',
      isBot: true,
      createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });

    chat.current.chat({
      message: value,
      images: fileUrl,
      onUpdate(message) {
        messageList[messageList.length - 1].content = message;
        setMessageList([...messageList]);
        scrollToBottom();
      },
      onFinish(message: string) {
        setSearchLoading(false);
        setSearchText('');
        setInputDisabled(false);
      },
    });
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUploadChange = (
    fileList: UploadItem[],
    file: UploadItem & { response: any }
  ) => {
    if (file?.status === 'done') {
      setFileUrl(file?.response?.data?.success_data?.[0]?.preview_url);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [Chatbox]);

  useEffect(() => {
    loadHisChat();
  }, []);

  return (
    <Space size={16} direction="vertical" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={14}>
          <Card>
            <Typography.Title heading={6}>
              {t['assistant.chat.card']}
            </Typography.Title>

            {/*     聊天窗口 */}
            <div
              style={{
                minHeight: '450px',
                maxHeight: '500px',
                overflow: 'auto',
              }}
            >
              <Card>
                {messageList.map((message: MessageProps, index: number) => (
                  <MessageItem message={message} key={index}></MessageItem>
                ))}
              </Card>
              <div ref={messagesEndRef} />
            </div>

            <div>
              <Upload
                name="files"
                action={uploadUrl}
                style={{ marginTop: 40 }}
                onChange={handleUploadChange}
              />
            </div>

            <InputSearch
              searchButton={t['assistant.chat.send']}
              placeholder={t['assistant.chat.search-content']}
              style={{ width: '100%', height: '50px', marginTop: '20px' }}
              value={searchText}
              disabled={inputDisabled}
              loading={searchLoading}
              onSearch={onSearchClick}
              onChange={handlerSearch}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card>
            <Typography.Title heading={6}>
              {t['dataAnalysis.title.authorsList']}
            </Typography.Title>
            <div style={{ height: '370px' }}></div>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}

export default Chatbox;
