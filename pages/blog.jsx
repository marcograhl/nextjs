import Link from 'next/link';

import Layout from '@/components/Layout';

export async function getStaticProps() {
  let posts = [];

  try {
    const response = await fetch(
      'https://react.webworker.berlin/wp-json/wp/v2/posts'
    );

    posts = await response.json();
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      posts,
    },
    revalidate: 3600, // Einmal pro Stunde aktualisieren
  };
}

export default function Blog({ posts }) {
  return (
    <Layout title="Blog">
      <ul>
        {posts.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`}>
              <a>{title.rendered}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
