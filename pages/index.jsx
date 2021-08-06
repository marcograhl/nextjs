import Layout from '@/components/Layout';
import ShuffleText from '@/components/ShuffleText';
export default function Home() {
  return (
    /* Hier die Layout-Komponente einsetzen und ihr den
    Inhalt der Seite als Kindelement übergeben. Dazu den title-Prop.  */
    <Layout title="Start">
      <p>Websites mit NextJS</p>
      <ShuffleText />
    </Layout>
  );
}
