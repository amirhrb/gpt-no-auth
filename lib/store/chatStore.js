import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  messages: [],
  inProcess: false,
  scrollCanceled: false,
  toast: { status: '', toastMsg: '' },
  aiResponse: '',
  sendMessage: async newMessage => {
    const messagesBeforeReq = get().messages;
    set({
      inProcess: true,
      scrollCanceled: false,
      messages: [
        ...messagesBeforeReq,
        { role: 'user', content: newMessage, status: 'ok', animated: true },
      ],
    });
    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        body: JSON.stringify({
          messages: [...get().messages, { role: 'user', content: newMessage }],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        set({
          inProcess: false,
          messages: [
            ...messagesBeforeReq,
            {
              role: 'user',
              content: newMessage,
              status: 'error',
              animated: true,
            },
          ],
          toast: {
            status: 'failure',
            toastMsg: `${data.error.message}`,
          },
        });
        return;
      }
      const messagesBeforeRes = get().messages;
      set({
        messages: [
          ...messagesBeforeRes,
          {
            role: data.result.role,
            content: data.result.content,
            status: 'ok',
            animated: false,
          },
        ],
        aiResponse: '',
        inProcess: false,
      });
    } catch (error) {
      set({
        inProcess: false,
        messages: [
          ...messagesBeforeReq,
          {
            role: 'user',
            content: newMessage,
            status: 'error',
            animated: true,
          },
        ],
        toast: { status: 'error', toastMsg: error?.data?.message || '' },
      });
    }
  },
}));

export default useChatStore;
