import { fetchEventSource } from '@fortaine/fetch-event-source';
// import { getToken } from './http';

interface IChatOptions {
  message: string;
  messageId?: string;
  onFinish: (message: string) => void;
  onError?: (err: Error) => void;
  onUpdate?: (message: string, chunk: string) => void;
  onId?: (id: string) => void;
  onOpen?: () => void;
}

export class Sse {
  curPath = '/api/v1/chat/stream';
  sessionId = '';
  abortController: null | AbortController = null;

  path(): string {
    return `${process.env.NEXT_PUBLIC_API_BASE}${this.curPath}`;
  }

  abort() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  async chat(options: IChatOptions) {
    const controller = new AbortController();
    this.abortController = controller;
    const chatPath = this.path();
    const payload: any = {
      message: options.message,
    };

    // 分享对话
    if (this.sessionId) {
      payload.sessionId = this.sessionId;
    }

    if (options.messageId) {
      payload.messageId = options.messageId;
    }

    const chatPayload = {
      headers: {
        'Content-Type': 'application/json',
        'x-requested-with': 'XMLHttpRequest',
        // ...getToken(),
      },
      method: 'POST',
      body: JSON.stringify(payload),
      signal: controller.signal,
    };

    const requestTimeoutId = setTimeout(() => controller.abort(), 5000);

    let responseText = '';
    let finished = false;

    const finish = () => {
      if (!finished) {
        finished = true;
        options.onFinish(responseText);
      }
    };
    controller.signal.onabort = finish;

    fetchEventSource(chatPath, {
      ...chatPayload,
      openWhenHidden: true,
      async onopen() {
        clearTimeout(requestTimeoutId);
        options.onOpen?.();
      },
      onmessage(msg) {
        if (msg.data === '[DONE]' || finished) {
          return finish();
        }
        if (msg.data.includes('[ID]')) {
          const id = msg.data as string;
          return options.onId?.(id.replace('[ID]', ''));
        }

        const text = msg.data;
        if (text) {
          const curText = JSON.parse(text);

          responseText += curText;
          options.onUpdate?.(responseText, curText);
        }
        // console.log('~~onmessage~~', msg.data);
      },
      onclose() {
        finish();
      },
      onerror(e) {
        options.onError?.(e);
        throw e;
      },
    });
  }
}
