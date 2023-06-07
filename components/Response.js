//formater
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

//style
import styles from '../styles/index.module.css';

const Response = ({ message }) => {
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
        </div>
      </article>
    );
  }
  return <></>;
};

export default Response;
