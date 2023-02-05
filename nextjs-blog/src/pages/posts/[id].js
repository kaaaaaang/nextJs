import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../../styles/utils.module.css';
import { useRouter } from 'next/router';
import CodeBlock from '../../components/CodeBlock';

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
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

const Button = ({ children }) => {
  return (
    <button
      className="bg-black dark:bg-white text-lg text-teal-200 dark:text-teal-700 rounded-lg px-5"
      onClick={() => alert('Hello')}
    >
      {children}
    </button>
  );
};

const components = { Button, CodeBlock };

const Post = ({ postData }) => {
  console.log(postData);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading ...</div>;
  }
  return (
    <Layout>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />}
        {postData.mdxSource && <MDXRemote {...postData.mdxSource} components={components} />}
      </article>
    </Layout>
  );
};

export default Post;
