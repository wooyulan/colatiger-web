import React from 'react';
import { Avatar, Comment } from '@arco-design/web-react';
import { Markdown } from '@/components/Markdown';

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
    <div>
      {message.isBot ? (
        <Comment
          style={commentStyle}
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
          content={
            <div>
              <Markdown content={message.content} />
            </div>
          }
          datetime={message.createAt}
        />
      ) : (
        <Comment
          style={commentStyle}
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
          content={
            <div>
              {message.file ? (
                <div>
                  <img
                    src={message.file}
                    alt=""
                    style={{ width: 100, height: 100 }}
                  />
                </div>
              ) : null}
              {message.content}
            </div>
          }
          datetime={message.createAt}
        />
      )}
    </div>
  );
}

export default MessageItem;
