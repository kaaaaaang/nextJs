import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';
import { getSortedPostsData } from '../../lib/posts';

// getStaticProps : 빌드 시, 화면을 그린다.,  빌드시 데이터 조회부분에서 에러가 난다.
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData: allPostsData,
    },
  };
}

// server-side 에서는 api routes를 사용하지 않아야 한다.
// (api routes 는 client side 에서 server-side 요청을 위한 , server-side 에서 server-side 요청을 위한것 XXX)
// client-siede 에서 api 요청을 해야한다.
// 아래 server-side는 예시이지 실제에서는 이렇게 쓰면 안된다.
// export async function getServerSideProps() {
//     const res = await fetch('http://localhost:3000/api/posts');
//     const json = await res.json();
//   return {
//     props: {
//       allPostsData : json.allPostsData,
//     },
//   };
// }

export default function Home({ allPostsData }) {
  // const [allPostsData, setAllPostsData] = useState([]);
  // useEffect(() => {
  //   fetch('/api/posts')
  //     .then((res) => res.json())
  //     .then((data) => setAllPostsData(data.allPostsData));
  // }, []);
  return (
    <Layout home>
      <Head>
        {' '}
        F<title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
