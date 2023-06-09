import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  messages: [],
  inProcess: false,
  scrollCanceled: false,
  setsCrollCanceled: () => {
    set({ scrollCanceled: true });
  },
  toast: { status: '', toastMsg: '' },
  aiResponse: '',
  sendMessage: async (newMessage) => {
    set({ inProcess: true, scrollCanceled: false });
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
            ...get().messages,
            { role: 'user', content: newMessage, status: 'error' },
          ],
          toast: {
            status: 'failure',
            toastMsg: `${data.error.message}`,
          },
        });
        return;
      }
      set({
        messages: [...get().messages, { ...data.question, status: 'ok' }],
      });
      const prevMessages = get().messages;
      let newMsgContent = data.result.content;
      let wordsArr = newMsgContent.split(' ');
      let newWordIndex = 0;
      const addInterval = setInterval(() => {
        let newWord = `${wordsArr[newWordIndex++]} `;
        set({ aiResponse: (get().aiResponse += newWord) });
        set({
          messages: [
            ...prevMessages,
            { role: data.result.role, content: get().aiResponse, status: 'ok' },
          ],
        });
        if (newWordIndex >= wordsArr.length) {
          clearInterval(addInterval);
          newWordIndex = 0;
          set({ aiResponse: '', inProcess: false });
        }
      }, 100);
    } catch (error) {
      set({
        inProcess: false,
        messages: [
          ...get().messages,
          { role: 'user', content: newMessage, status: 'error' },
        ],
        toast: { status: 'error', toastMsg: error?.data?.message || '' },
      });
    }
  },
}));

export default useChatStore;
