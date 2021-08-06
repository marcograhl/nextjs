import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';

/* 
Die Komponente wird dynamisch importiert und dank der zweiten Option auch
nur im Browser geladen. Das ist nötig, da Leaflet mit dem window interagiert,
welches in Node nicht zur Verfügung steht.
https://nextjs.org/docs/advanced-features/dynamic-import
*/
const LocationFinder = dynamic(() => import('@/components/LocationFinder'), {
  ssr: false,
});

export default function standorte() {
  return (
    <Layout title="Standorte">
      <LocationFinder />
    </Layout>
  );
}
