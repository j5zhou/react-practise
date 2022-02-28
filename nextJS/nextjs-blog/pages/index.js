import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import Script from 'next/script';
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts';


export default function Home({allPostsData}) {

  return (
    <>
    <Layout HOME>
    <Head>
    <title>{siteTitle}</title>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
    </Head>
    <div className="container">
      <h1 className="title">
        Read
        <Link href="/posts/first-post">
          <a>this page!</a>
        </Link>
      </h1>
      <Image
      src="/images/test.jpg" // Route of the image file
      height={216} // Desired size with correct aspect ratio
      width={384} // Desired size with correct aspect ratio
      alt="test"
    />
    </div>
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
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
    </>
  )
}
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}