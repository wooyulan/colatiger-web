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
} from '@arco-design/web-react';
import MultiInterval from '@/components/Chart/multi-stack-interval';
import { v4 as uuidv4 } from 'uuid';
import locale from './locale';
import { Sse } from '@/utils/sse';
import useLocale from '@/utils/useLocale';
import dayjs from 'dayjs';
import axios from '@/utils/axios';
import { any, string } from 'prop-types';
import handler from '@antv/component/src/slider/handler';
import MessageItem, { MessageProps } from '@/pages/assistant/chat/message-item';
import MessageList from '@/pages/dashboard/monitor/message-list';

const { Row, Col } = Grid;
const InputSearch = Input.Search;

function Chatbox() {
  const chat = useRef(new Sse());
  const t = useLocale(locale);
  // 搜索按钮loading状态
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 设置messageArray
  const [messageList, setMessageList] = useState<MessageProps[]>([]);
  const messagesEndRef = useRef(null);

  const handlerSearch = (e: string) => {
    setSearchText(e);
  };

  // 加载历史记录
  function loadHisChat(){
    setErrorMessage('');
    axios
        .post('/api/v1/chat/history')
        .then((res) => {
          console.log(res.data);
          const { status, msg } = res.data;
          if (status === 'ok') {

          } else {
            setErrorMessage(msg || t['res.data.data,msg']);
          }
        })
        .finally(() => {

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
      onError() {},
    });
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [Chatbox]);

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
