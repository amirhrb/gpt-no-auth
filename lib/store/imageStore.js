import { create } from 'zustand';

// interact = {url} Or {prompt}
const useImageStore = create((set, get) => ({
  interacts: [
    // { prompt: 'hello you you' },
    // { url: '/images/apple-touch-icon.png' },
  ],
  inProcess: false,
  toast: { status: '', toastMsg: '' },
  sendPrompt: async (prompt) => {
    set({ interacts: [...get().interacts, { prompt }] });
    set({ inProcess: true });
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        body: JSON.stringify({
          prompt,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        set({
          inProcess: false,
          toast: {
            status: 'failure',
            toastMsg: `${data.error.message}`,
          },
        });
        return;
      }
      set({
        inProcess: false,
        interacts: [...get().interacts, { url: data.url }],
      });
    } catch (error) {
      set({
        inProcess: false,
        toast: { status: 'error', toastMsg: error?.data?.message || '' },
      });
    }
  },
}));

export default useImageStore;
