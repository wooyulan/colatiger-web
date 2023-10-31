import React from 'react';
import styles from './style/index.module.less';
import { Avatar } from '@arco-design/web-react';
import MessageView from '../MessageView/message-view';

const avatarStyle = { backgroundColor: '#00d0b6', verticalAlign: 'middle' };
const ReceiverItem = ({ userName, item }) => {
  return (
    <div className={styles['receiver-item']}>
      <div className={styles['avatar-wrap']}>
        <Avatar style={avatarStyle}>{userName}</Avatar>
      </div>
      <MessageView isSender={false} {...item} />
    </div>
  );
};

export default ReceiverItem;
