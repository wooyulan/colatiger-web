import React from 'react';

import styles from './style/index.module.less';
import { Avatar } from '@arco-design/web-react';
import MessageView from '@/pages/assistant/chat/components/MessageView/message-view';

const avatarStyle = { backgroundColor: '#005EFF', verticalAlign: 'middle' };

const SenderItem = ({ userName, item }) => {
  return (
    <div className={styles['sender-item']}>
      {/* sender */}
      <MessageView isSender={true} {...item} />
      <div className={styles['avatar-wrap']}>
        <Avatar style={avatarStyle}>{userName}</Avatar>
      </div>
    </div>
  );
};

export default SenderItem;
