import { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

  const handleSubmit = (e) => {
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
    <Layout>
      <h1>wirte a post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />
        <input type="text" name="title" placeholder="title" required ref={titleRef} />
        <br />
        <textarea type="text" name="content" placeholder="content" required ref={contentRef} />
        <br />
        <input type="submit" value="Create" />
      </form>
      {showLink && <Link href={`/posts/${idRef.current.value}`}>Created Post</Link>}
    </Layout>
  );
};

export default Write;

// 요새는 별로 추천하지 않지만
// getserever ~ 나 getstat~~~~~~~~~~ 나오기 전에 자주 쓰임
// Write.getInitialProps = async () => {
//   return {};
// };
