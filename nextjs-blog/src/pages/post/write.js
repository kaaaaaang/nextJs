import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

// 빌드 후
// .next/server/post 경로에서
// getServerSideProps 경우 wirte.js 파일 생성
// 아닐 경우 정적인 write.html 생성됨
// export async function getServerSideProps() {
//   return {};
// }
const Write = () => {
  // router 의 query
  // client0side 페이지의 경우,
  // hydration 이후에 query 값을 읽을 수 있다.
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
  }, [router.query]);

  const idRef = useRef(undefined);
  const titleRef = useRef(undefined);
  const contentRef = useRef(undefined);
  const [showLink, setShowLink] = useState(false);

  const handleSumbit = (e) => {
    e.preventDefault();

    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title,
          content,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Fetch Error');
        })
        .then((data) => {
          setShowLink(true);
          alert(data.message);
        })
        .catch((error) => alert(`request error: ${error}`));
    }
  };

  return (
    <>
      <Head>
        <title>Write a post</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <h1>Write a post</h1>
      <form onSubmit={handleSumbit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />
        <br />
        <input type="text" name="title" placeholder="title" required ref={titleRef} />
        <br />
        <br />
        <textarea type="text" name="content" placeholder="content" required ref={contentRef} />
        <br />
        <input className="rounded bg-pink-500 px-2" type="submit" value="Create" />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>
          <a>Created Post</a>
        </Link>
      )}
      <br />
      <br />
      <button
        onClick={() =>
          // router.push('/posts/[id]', '/posts/ssg-ssr', { scroll: false })
          router.push({ pathname: '/posts/[id]', query: { id: 'ssg-ssr' } })
        }
        className="rounded bg-pink-200 px-2"
      >
        router.push
      </button>
      <br />
      <br />
      <button onClick={() => router.replace('/posts/ssg-ssr')} className="rounded bg-pink-200 px-2">
        router.replace
      </button>
      <br />
      <br />
      <button onClick={() => router.back()} className="rounded bg-pink-200 px-2">
        router.back
      </button>
      <br />
      <br />
      <button onClick={() => router.reload()} className="rounded bg-pink-200 px-2">
        router.reload
      </button>
      <br />
      <br />
      <Link href="/posts/ssg-ssr" passHref>
        <LinkButton />
      </Link>
      <br />
      <br />
      <Link href="/posts/ssg-ssr" replace scroll={false}>
        <a>가즈아</a>
      </Link>
    </>
  );
};

const LinkButton = forwardRef(function Button({ href }, ref) {
  return (
    <a href={href} ref={ref}>
      {href} 로
    </a>
  );
});

export default Write;

// 요새는 별로 추천하지 않지만
// getserever ~ 나 getstat~~~~~~~~~~ 나오기 전에 자주 쓰임
// Write.getInitialProps = async () => {
//   return {};
// };
