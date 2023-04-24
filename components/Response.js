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
        className={`${styles.resultItem} ${
          message.role !== 'user' ? styles.resultItemAI : ''
        }`}
        dir={/[\u0591-\u07FF]/.test(message.content) ? 'rtl' : 'ltr'}
      >
        <h4>{message.role === 'user' ? 'YOU:' : 'AI:'}</h4>
        <div className={styles.result}>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    PreTag="section"
                    language={match[1]}
                    showLineNumbers
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
