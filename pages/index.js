import Link from 'next/link';

//style
import ChatGPT from '../components/chatGPT';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="w-full min-h-[100svh] flex flex-col items-center bg-white dark:bg-black">
      <div className="flex items-center justify-between flex-row-reverse w-full max-w-3xl p-2">
        <div className="flex items-center gap-x-2 flex-row-reverse">
          <Link href="/">
            <ChatGPT />
          </Link>
          <Link href="/">
            <h3
              className="
            font-colfax text-gray-900 dark:text-gray-50 
            text-lg
            font-bold
            "
            >
              OpenAI
            </h3>
          </Link>
        </div>

        <a href="https://github.com/amirhrb/gpt-no-auth" target="_blank">
          <Image src="/images/github-mark.png" width={40} height={40} />
        </a>
      </div>
      <main className="w-full max-w-3xl h-72 flex flex-col justify-center items-center gap-2">
        <span className="mb-4 text-gray-900 dark:text-gray-50" dir="ltr">
          (Tap on the links below)
        </span>
        <Link
          href="/dall-e"
          className="px-4 py-1 font-bold text-gray-900 dark:text-gray-50 hover:bg-neutral-900 hover:text-sky-100 rounded-md"
        >
          Dall-E
        </Link>
        <Link
          href="/chat-gpt"
          className="px-4 py-1 font-bold text-gray-900 dark:text-gray-50 hover:bg-neutral-900 hover:text-sky-100 rounded-md"
        >
          Chat-gpt
        </Link>
      </main>
    </div>
  );
};

export default Home;
