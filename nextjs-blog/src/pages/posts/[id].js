import React, { useState } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import utilStyles from '../../../styles/utils.module.css';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Date from '@/components/date';
import CodeBlock from '@/components/CodeBlock';
import Head from 'next/head';
import { siteTitle } from '../_document';

// fallback: true
// 빌드시, 조회했을때는 없었는데 getStaticProps으로 조회했을떄는 있을 수 있다.
// 빌드 했을 때는 데이터가 없었는데 사용하다가 데이터가 조회 되어서 그 화면을 그려야 하는 경우가 있다.
// fallback: blocking , 데이터가 발생되면 그려준다
export async function getStaticPaths() {
  const paths = getAllPostIds();
  // const paths = [
  //   {
  //     params: {
  //       id: 'ssg-ssr',
  //     },
  //   },
  // ];
  return {
    paths,
    fallback: true,
  };
}

// getStaticProps : 빌드 시, 화면을 그린다.,  빌드시 데이터 조회부분에서 에러가 난다.
export async function getStaticProps({ params, preview }) {
  console.log('>>>>>>>>>>>>>>>>>', preview);
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

// dynamic 부분 서버단에서 pre렌더링 하지 않고 클라이언트 단에서 렌더링
const Button = dynamic(() => import('../../../components/Button'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const components = { Button, CodeBlock };

const ErrorComponent = () => {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Error occured');
  }

  return (
    <button className="rounded px-2 bg-green-500" onClick={() => setError(true)}>
      Error Fire
    </button>
  );
};

const Post = ({ postData, pathname }) => {
  console.log(postData);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading ...</div>;
  }
  return (
    <>
      <Head>
        <title>{`${postData.title} - ${siteTitle}`}</title>
      </Head>
      <ErrorComponent />
      <article>
        <h2>pathname: {pathname}</h2>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />}
        {postData.mdxSource && <MDXRemote {...postData.mdxSource} components={components} />}
      </article>
    </>
  );
};

export default Post;
