//react
import { useEffect, useRef } from 'react';
//style
import styles from '../styles/index.module.css';
import ChatGPT from '../public/images/chatGPT';
//3rd p lib imports
import { toast as toaster } from 'react-toastify';
//component
import Response from '../components/Response';
//zustand store
import useChatStore from '../lib/store/chatStore';

export default function Home() {
  const { messages, inProcess, sendMessage, toast } = useChatStore(
    (state) => state
  );

  const inputRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (toast.toastMsg) toaster.error(toast.toastMsg);
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
        toaster.info('ask a question first!');
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
      className={styles.main}
      style={{
        justifyContent: messages.length ? 'flex-end' : 'normal',
        backgroundColor: 'rgb(var(--foreground-rgb))',
      }}
      ref={containerRef}
    >
      <section
        className={`${messages.length ? styles.header : styles.iconCont} ${
          styles.headerBasics
        }`}
      >
        <ChatGPT />
        <h3>OpenAi chatgpt</h3>
      </section>
      <div className={messages.length ? styles.resultCont : ''}>
        <div>
          {messages.length
            ? messages.map((message, index) => (
                <Response message={message} key={index} />
              ))
            : ''}
        </div>
      </div>
      <form
        onSubmit={submitHandler}
        className={messages.length ? styles.fixedForm : ''}
      >
        <textarea
          placeholder="Enter your qustion"
          ref={inputRef}
          disabled={inProcess}
        />
        <button disabled={inProcess}>{inProcess ? 'loading' : 'submit'}</button>
      </form>
    </main>
  );
}
