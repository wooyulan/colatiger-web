import React from 'react';
import { Avatar, Comment } from '@arco-design/web-react';

export interface MessageProps {
  messageId?: string;
  content?: string;
  avatar?: string;
  isBot?: boolean;
  createAt?: string;
}

function MessageItem(props: any) {
  const message: MessageProps = props.message;
  return (
    <div>
      {message.isBot ? (
        <Comment
          align="right"
          author="Assistant"
          avatar={
            <Avatar>
              <img
                alt="avatar"
                src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
              />
            </Avatar>
          }
          content={<div>{message.content}</div>}
          datetime={message.createAt}
        />
      ) : (
        <Comment
          align="left"
          author="Assistant"
          avatar={
            <Avatar>
              <img
                alt="avatar"
                src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
              />
            </Avatar>
          }
          content={<div>{message.content}</div>}
          datetime={message.createAt}
        />
      )}
    </div>
  );
}

export default MessageItem;
