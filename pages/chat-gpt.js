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
    console.log(messages);
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
    <>
      <div className="flex items-center justify-center fixed top-0 left-0  bg-opacity-20 backdrop-blur-sm w-full p-2 z-10">
        <div className="flex items-center justify-between flex-row-reverse w-full max-w-3xl">
          <div className="flex items-center gap-x-2 flex-row-reverse">
            <ChatGPT />
            <h3
              className="
            font-colfax text-gray-900 dark:text-gray-50 
            text-lg
            font-bold
            "
            >
              OpenAI
            </h3>
          </div>
          {!!messages.length && (
            <h1
              className={`font-colfax
             text-gray-900 dark:text-gray-50 
             text-lg
             font-bold animate-appear
             transition-all duration-100
         `}
            >
              Chat GPT
            </h1>
          )}
        </div>
      </div>
      <main
        className={`rtl min-h-screen flex flex-col items-center justify-center pt-16 bg-white dark:bg-black font-yekan `}
        ref={containerRef}
      >
        <div
          className={
            'max-w-3xl w-full flex flex-col items-center justify-centers relative -top-10'
          }
        >
          <section
            className={`${
              messages.length
                ? 'hidden'
                : 'flex flex-col items-center self-end '
            }`}
          >
            <h1
              className={`
             text-gray-900 dark:text-gray-50 font-bold text-[23vw] leading-none sm:text-8xl md:text-9xl
             whitespace-nowrap tracking-tighter
         `}
            >
              CHAT GPT
            </h1>
          </section>
          <div className="w-full max-w-lg overflow-y-auto pb-20 pt-12">
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
              className={`
          rounded-xl px-2 py-1 resize-none 
              bg-neutral-200 
              placeholder:text-center 
              placeholder:text-neutral-400
              text-neutral-800 
              dark:text-neutral-100 
              dark:bg-neutral-600 
              border-neutral-300
              dark:border-neutral-600
                ${messages.length ? '' : 'leading-7'}
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
        </div>
      </main>
    </>
  );
}
