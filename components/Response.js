//formater
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

//style
import styles from '../styles/index.module.css';
import { toast } from 'react-hot-toast';

const Response = ({ message }) => {
  const copyText = () => {
    navigator.clipboard
      .writeText(message.content)
      .then(() => toast.success('کپی شد', { className: 'font-yekan' }))
      .catch((err) =>
        toast.success('مشکلی پیش آمده', { className: 'font-yekan' })
      );
  };
  if (message) {
    return (
      <article
        className={` bg-opacity-80 w-[85%] rounded-xl p-4 mt-4 animate-appear ${
          message.role !== 'user'
            ? 'bg-primary text-neutral-50 self-end'
            : 'bg-neutral-300 dark:bg-neutral-600 text-neutral-900 dark:text-neutral-50'
        }`}
        dir={/[\u0591-\u07FF]/.test(message.content) ? 'rtl' : 'ltr'}
      >
        <h4 className="mb-1 font-extrabold leading-8 text-lg select-none">
          {message.role === 'user' ? 'YOU' : 'GPT'}
        </h4>
        <div className={`${styles.result}`}>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    dir="ltr"
                    PreTag="section"
                    language={match[1]}
                    // showLineNumbers
                    {...props}

                    // style={oneDark}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    `{children}`
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
          <button onClick={copyText} className="mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
              />
            </svg>
          </button>
        </div>
      </article>
    );
  }
  return <></>;
};

export default Response;
