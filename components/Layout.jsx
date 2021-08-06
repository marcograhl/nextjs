import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ title, children }) {
  return (
    <div className="site-wrapper">
      {/* Hier soll die Head-Komponente sein.
            Gebt hier den title aus, und zwar soll er als prop
            title an Layout übergeben werden. Wenn title leer ist,
            soll stattdessen im title-Element NextJS ausgegeben werden.
            */}
      <Head>
        <title>{title || 'NextJS'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="site-main inner-width">
        {/* Hier soll eine h1 mit dem Inhalt von title ausgegeben werden,
        aber nur, wenn title nicht leer ist. */}
        {title && <h1>{title}</h1>}
        {/* Hier sollen die Kind-Elemente von Layout ausgegeben werden. */}
        {children}
      </main>
      {/* Hier die Footer-Komponente ausgeben. */}
      <Footer />
    </div>
  );
}
