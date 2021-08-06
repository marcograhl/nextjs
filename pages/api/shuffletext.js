/* 
1. Exportiert eine Funktion, die req und res entgegegennimmt.
2. Die GET-Parameter, die man beim Aufruf der URL nutzt, sind in req.query 
zu finden. Holt dort den Wert für text heraus, nehmt "" als Standard.
Zum testen einfach console.log nutzen, ABER der Text wird im Editor-Terminal
ausgegeben, nicht im Browser!
3. Mischt den Text durcheinander und fügt ihn dann wieder zusammen.
4. Gebt den Text in einem JSON-Objekt unter dem Schlüssel text zurück.
*/
import { shuffle } from '../../library/helpers';
export default (req, res) => {
  console.log(req.query);
  const { text = '' } = req.query;
  // const textArray = text.split('');
  const shuffledText = shuffle([...text]).join('');
  res.status(200).json({ text: shuffledText });
};
