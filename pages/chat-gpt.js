//react
import { useEffect, useRef } from 'react';
//style
import ChatGPT from '../components/chatGPT';
import AirPlane from '../components/airPlane';
import Loading from '../components/loadingArrows';

//3rd p lib imports
import toaster from 'react-hot-toast';
//component
import Response from '../components/Response';
//zustand store
import useChatStore from '../lib/store/chatStore';

export default function Chat() {
  const { messages, inProcess, sendMessage, toast } = useChatStore(
    (state) => state
  );

  const inputRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (toast.toastMsg)
      toaster.error(toast.toastMsg, { className: 'font-yekan' });
  }, [toast]);

  useEffect(() => {
    if (!inProcess) {
      window.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    if (inputRef.current) inputRef.current.value = '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, inProcess]);

  async function submitHandler(event) {
    event.preventDefault();
    if (inputRef.current) {
      if (!inputRef.current.value) {
        toaster.error('اول یه چیزی بنویس!', { className: 'font-yekan' });
        return;
      }
      window.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
      await sendMessage(inputRef.current.value);
    }
  }

  return (
    <main
      className={`rtl min-h-screen relative flex flex-col items-center pt-16 bg-white dark:bg-black font-yekan ${
        messages.length ? 'justify-end' : 'justify-normal'
      }`}
      ref={containerRef}
    >
      <section
        className={`flex ${
          messages.length
            ? 'w-full fixed top-0 left-0 justify-center bg-opacity-20 backdrop-blur-sm p-2'
            : ''
        } items-center `}
      >
        <div
          className={`flex items-center 
        ${
          messages.length
            ? 'w-full max-w-lg justify-between'
            : 'flex-col gap-y-4'
        }
        `}
        >
          <ChatGPT />
          <h3
            className={`
            font-colfax text-gray-900 dark:text-gray-50 ${
              messages.length ? 'font-bold text-lg ' : 'font-bold text-xl'
            }
         `}
          >
            OpenAi chatgpt
          </h3>
        </div>
      </section>
      <div
        className={
          messages.length ? 'w-full max-w-lg overflow-y-auto pb-20' : ''
        }
      >
        <div className="flex flex-col items-start px-1">
          {messages.length
            ? messages.map((message, index) => (
                <Response message={message} key={index} />
              ))
            : ''}
        </div>
      </div>
      <form
        onSubmit={submitHandler}
        className={`
        flex flex-row-reverse items-center my-2 gap-x-1 ${
          messages.length ? 'fixed bottom-0' : 'mt-8'
        }
        `}
      >
        <textarea
          placeholder="سوال خودتو اینجا بنویس"
          ref={inputRef}
          disabled={inProcess}
          className={`rounded-xl px-2 py-1 resize-none bg-neutral-200 placeholder:text-neutral-600 dark:bg-neutral-600 dark:placeholder:text-neutral-100 placeholder:text-center ${
            messages.length ? '' : 'leading-7'
          }
          `}
          // ${messages.length ? '' : ''}
        />
        <button
          disabled={inProcess}
          className={`text-primary${inProcess ? '' : ''}`}
        >
          {inProcess ? (
            <Loading className="w-7 h-7 animate-spin" />
          ) : (
            <AirPlane className="w-7 h-7 rotate-[225deg]" />
          )}
        </button>
      </form>
    </main>
  );
}
