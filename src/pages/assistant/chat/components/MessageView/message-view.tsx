import React from 'react';

import cls from 'classnames';
import { Markdown } from '@/components/Markdown';
import styles from './style/index.module.less';
import {
  IconDelete,
  IconLeft,
  IconPlus,
  IconRight,
} from '@arco-design/web-react/icon';
import { Button } from '@arco-design/web-react';

const ButtonGroup = Button.Group;

const MessageView = ({ content, isSender, createAt, ...rest }) => {
  const textStyles = cls(styles['text-message-view'], {
    [styles.sender]: isSender,
    [styles.receiver]: !isSender,
  });

  const popMenuStyles = cls(styles['show-popmenu'], {
    [styles.sender]: isSender,
    [styles.receiver]: !isSender,
  });

  const bubbleStyles = cls(styles.bubble, {
    [styles.sender]: isSender,
    [styles.receiver]: !isSender,
  });

  const messageTimeStyle = cls(styles['message-time'], {
    [styles.sender]: isSender,
    [styles.receiver]: !isSender,
  });

  const renderPopuMenu = () => {
    return <div className={popMenuStyles}></div>;
  };

  const deleteMessage = (rest: any) => () => {
    console.log(rest);
  };

  const renderMessageView = () => {
    if (!rest?.file) {
      return (
        <div className={styles['text-item']}>
          <Markdown content={content} />
          {!isSender && (
            <Button
              size="mini"
              type="dashed"
              icon={<IconDelete />}
              onClick={deleteMessage(rest)}
            ></Button>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <div className={styles['image-item']}>
            <img src={rest.file} />
          </div>
          <div className={styles['text-item']}>
            <Markdown content={content} />
            {!isSender && (
              <Button
                size="mini"
                type="dashed"
                icon={<IconDelete />}
                onClick={deleteMessage(rest)}
              ></Button>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={textStyles}>
      <div className={styles['text-message-wrapper']}>
        <div className={messageTimeStyle}>{createAt}</div>
        <div className={bubbleStyles}>
          {/*{isSender && renderPopuMenu()}*/}
          {renderMessageView()}
          {!isSender && renderPopuMenu()}
        </div>
      </div>
    </div>
  );
};

export default MessageView;
