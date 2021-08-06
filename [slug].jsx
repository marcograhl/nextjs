/* 
Version mit REST-Api
*/

import { useRouter } from 'next/router';
import Image from 'next/image';

import Layout from '@/components/Layout';

const apiPath = 'https://react.webworker.berlin/wp-json/wp/v2/';

/* Wenn man einen dynamischen Pfad hat, muss man Next mitteilen,
welche Pfade das System statisch generieren soll, hier also
eine Liste der vorhanden Blog-Slugs übergeben. */
export async function getStaticPaths() {
  let paths = [];

  try {
    const response = await fetch(`${apiPath}posts`);

    const posts = await response.json();

    /*    Die Einträge im paths-Array müssen den params entsprechen,
      die getStaticProps erhält. */
    paths = posts.map(({ slug }) => ({ params: { slug } }));
  } catch (e) {
    console.log(e);
  }

  /* fallback legt fest, dass ein neuer und noch nicht in paths
  enthaltene Slug frisch von WordPress geholt werden soll.
  Wenn man für paths einen leeren Array zurückgibt, werden
  also alle Blogbeiträge erst statisch generiert, wenn sie
  zum ersten Mal angefordert werden. Man könnte in paths
  auch nur z.B. die 20 neuesten Blogbeiträge übergeben. */

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  console.log(params);

  let post = {};

  try {
    const response = await fetch(`${apiPath}posts?slug=${params.slug}`);
    //Anfrage gibt einen Array mit einem Eintrag, nicht den einzelnen Post zurück
    const postsArray = await response.json();

    post = postsArray[0];

    // In der Antwort ist nur die ID des Titelbildes enthalten,
    // nicht die Daten zum Bild selbst, deshalb ist hier eine zweite Anfrage nötig.
    if (post.featured_media) {
      post.titleImage = await getTitleImage(post.featured_media);
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      post,
    },
    revalidate: 3600,
  };
}

async function getTitleImage(imageId) {
  try {
    const response = await fetch(`${apiPath}media/${imageId}`);
    const imageData = await response.json();

    return {
      src: imageData.guid.rendered,
      width: imageData.media_details.width,
      height: imageData.media_details.height,
      alt: imageData.alt_text,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function BlogPost({ post }) {
  // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  const router = useRouter();
  if (router.isFallback) {
    return <strong>Laden...</strong>;
  }

  const { title, content, titleImage } = post;

  return (
    <Layout title={title.rendered}>
      {titleImage && (
        <Image
          {...titleImage}
          layout="responsive"
          sizes="(max-width: 50rem) 100vw, 50rem"
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
    </Layout>
  );
}
