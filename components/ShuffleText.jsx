/* 
1. Fügt ein kontrolliertes Text-Input-Element hinzu.
2. Wenn der Text sich ändert, soll der Inhalt des
Input-Elements an unsere shuffletext-Schnittstelle gesendet
werden, der Antwort-Text soll in einem strong-Element
mit der KLasse .big-text angezeigt werden.
3. Die Komponente auf z.B. der Startseite einsetzen.
4. Bonus: Nutzt den Hook useDebouncedValue
*/

import { useState, useEffect } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { shuffle } from '@/library/helpers';

export default function ShuffleText() {
  const [text, setText] = useState('');
  const [shuffledText, setShuffledText] = useState('');

  const debouncedText = useDebouncedValue(text, 300);

  useEffect(() => {
    async function fetchShuffledText() {
      try {
        const response = await fetch(`/api/shuffletext?text=${debouncedText}`);

        if (!response.ok) {
          throw new Error('Netzwerkproblem!');
        }

        const bigTextData = await response.json();

        setShuffledText(bigTextData.text);
      } catch (error) {
        console.log(error);
      }
    }
    fetchShuffledText();
  }, [debouncedText]);

  return (
    <div>
      <label htmlFor="text">Text</label>
      <br />
      <input id="text" value={text} onChange={(e) => setText(e.target.value)} />
      <strong className="big-text">
        {shuffle(
          [...shuffledText].map((char) => (
            <span
              key={Math.random()}
              style={{
                '--delay': `${(Math.random() * 1).toFixed(2)}s`,
              }}
            >
              {char}
            </span>
          ))
        )}
      </strong>
    </div>
  );
}

/* 

 {[...shuffledText].map((char, index) => (
          <span
            key={Math.random()}
            style={{
              '--delay': `${(index * 0.2).toFixed(2)}s`,
            }}
          >
            {char}
          </span>
        ))}*/
