import React from 'react';
import { Avatar, Comment } from '@arco-design/web-react';
import { Markdown } from '@/components/Markdown';
import styles from './style/index.module.less';
import ReceiverItem from '@/pages/assistant/chat/components/ReceiverItem/receive-item';
import SenderItem from '@/pages/assistant/chat/components/SenderItem/sender-item';

export interface MessageProps {
  messageId?: string;
  file?: string;
  content?: string;
  avatar?: string;
  isBot?: boolean;
  createAt?: string;
}

function MessageItem(props: any) {
  const message: MessageProps = props.message;
  const commentStyle = { margin: '20px 0' };

  return (
    <div className={styles['chat-container']}>
      {message.isBot ? (
        <ReceiverItem userName={'assistant'} item={message}></ReceiverItem>
      ) : (
        <SenderItem userName={'eric'} item={message} />
      )}
    </div>
  );
}

export default MessageItem;
