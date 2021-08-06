import Layout from '@/components/Layout';
import NewsList from '@/components/NewsList';

/* https://nextjs.org/docs/basic-features/environment-variables
Achtung: process.env ist kein normales Objekt, Destructuring
funktioniert nicht, immer process.env.KEY ausschreiben! 
Achtung: Werte stehen erst nach Neustart des Servers bzw.
dev-Prozesses zur Verfügung.
*/
//const apiKey = process.env.NEWS_API_KEY;

const testResults = {
  status: 'ok',
  totalResults: 38,

  articles: [
    {
      source: {
        id: 'cnn',
        name: 'CNN',
      },
      author: 'Chris Isidore, CNN Business',
      title: "Boeing's 737 Max gets approval to fly passengers again - CNN",
      description:
        "The Federal Aviation Administration Wednesday gave approval for the Boeing 737 Max to carry passengers again, ending the jet's 20-month grounding.",
      url: 'https://www.cnn.com/2020/11/18/business/boeing-737-max-approval/index.html',
      urlToImage:
        'https://cdn.cnn.com/cnnnext/dam/assets/201116084430-boeing-737-max-southwest-restricted-super-tease.jpg',
      publishedAt: '2020-11-18T12:12:00Z',
      content: null,
    },

    {
      source: {
        id: null,
        name: 'HuffPost',
      },
      author: 'Yahoo Entertainment',
      title: "'MasterChef Junior' Star Ben Watkins Dies At Age 14 - HuffPost",
      description:
        '"MasterChef Junior" judge Gordon Ramsay hailed Watkins as "an incredibly talented home cook and even stronger young man."',
      url: 'https://www.huffpost.com/entry/ben-watkins-dead_n_5fb508edc5b66cd4ad40820e',
      urlToImage:
        'https://img.huffingtonpost.com/asset/5fb5105e2400008630b047cf.png?ops=1778_1000',
      publishedAt: '2020-11-18T11:59:00Z',
      content:
        'Ben Watkins, a fan-favorite from MasterChef Junior, died on Monday after an 18-month battle with cancer. He was 14.\r\nWatkins was diagnosed with angiomatoid fibrous histiocytoma, an extremely rare for… [+2665 chars]',
    },
  ],
};

export async function getStaticProps() {
  //  let news = [];

  /*   try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=de&category=technology&pageSize=10`
    );

    const newsData = await response.json();

    news = newsData.articles;
  } catch (error) {
    console.log(error);
  } */

  return {
    props: {
      test: 'Hallo vom Server! 👋',
      time: new Date().toLocaleTimeString(),
      news: testResults.articles,
    },
    revalidate: 600,
  };
}

export default function news({ news }) {
  return (
    <Layout title="News">
      <NewsList news={news} title={'Die neuesten Meldungen'} />
    </Layout>
  );
}
