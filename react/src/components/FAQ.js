import './Browse.css';

export default function Home() {
  return (
    <div id='BrowseSide' className='Side'>
      <h1>Pytania ogólne</h1>

      <h2>Czym jest Langito.pl?</h2>
      <p>Langito.pl to darmowa aplikacja do nauki języków obcych przeznaczona dla uczniów szkół podstawowych.</p>

      <h2>Czy Langito.pl posiada materiały dla szkół innych niż podstawowe?</h2>
      <p>Nie. Materiały obejmują tylko zakres ośmiu klas szkoły podstawowej.</p>

      <h2>Jak korzystać z Langito.pl?</h2>
      <p>Aby rozpocząć naukę wystarczy, że wybierzesz interesujący cię język z paska na górze strony.
      Jeśli twojego języka nie ma na pasku, możesz wybrać opcję wszystkie języki.
      Następnie możesz wybrać klasę, po czym zobaczysz spis wszystkich lekcji pogrupowanych w działy.</p>

      <h2>Jaki sposób nauki wybrać?</h2>
      <p>Każdą lekcje można wykonać na trzy sposoby:
      <ul>
        <li>Karty - Pozwalają nauczyć się nowych zwrotów</li>
        <li>Fiszki - Służą do treningu zwrotów sam ze sobą</li>
        <li>Quiz - Sprawdza twoją wiedzę z już nauczonych zwrotów</li>
      </ul>
      Proponujemy wykonać wszystkie po kolei, aby mieć pewność, że lekcja została skutecznie zrealizowana.</p>

      <h2>Jak włączyć/wyłączyć tryb ciemny w Langito.pl?</h2>
      <p>Tryb ciemny można włączyć lub wyłączyć przełącznikiem w prawym górnym rogu ekranu.</p>
    </div>
  );
}
