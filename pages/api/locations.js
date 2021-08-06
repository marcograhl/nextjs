/* Datenquelle:  https://github.com/zauberware/postal-codes-json-xml-csv
 */
const allLocations = require('../../library/zipcodes.de.json');

export default function zipcode(req, res) {
  const { search = '' } = req.query;
  const locations = search.length > 1 ? getLocations(search) : [];
  res.status(200).json(locations);
}

function getLocations(searchTerm) {
  /*  Datensatz filtern, zipcode ist ein String und kein Integer, da
    PLZ mit 0 beginnen können. startsWith ist einen String-Methode, die
    prüft, ob ein String mit einem anderen String beginnt, und entsprechend
    true oder false zurückgibt.
    Bei der Ortssuche wird ein Regulärer Ausdruck verwendet, um nicht nur den
    Anfang des Strings zu suchen und dadurch auch Stadteile wie "Berlin Kreuzberg"
    oder Orte wie "Lutherstadt Wittenberg" zu finden. 
*/

  const regExp = new RegExp(searchTerm, 'i');
  return allLocations.filter(
    ({ zipcode, place }) => zipcode.startsWith(searchTerm) || regExp.test(place)
  );
}
