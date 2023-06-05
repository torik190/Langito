import './Home.css';
import img1 from '../images/home1.png';
import img2 from '../images/home2.png';
import img3 from '../images/home3.gif';
import img4 from '../images/home4.gif';

export default function Home() {
  return (
    <div id='HomeSide' className='Side'>
      <table><tbody>
        <tr>
          <td className='HomeText'>
            <h2>Czym jest Langito.pl?</h2>
            <p>
            Langito.pl to darmowa aplikacja do nauki języków obcych przeznaczona dla uczniów szkół podstawowych.
            Zakres materiału jest zgodny z zakresem uczonym w szkołach, więc aplikacja może stanowić dopełnienie szkolnych zajęć.
            </p>
          </td>
          <td className='HomeImg'><img src={img1} alt=''/></td>
        </tr>
        <tr>
          <td className='HomeImg'><img src={img2} alt=''/></td>
          <td className='HomeText'>
            <h2>Co oferujemy?</h2>
            <p>
            Langito.pl pomaga w nauce takich języków jak: angielski, niemiecki, francuski czy hiszpański.
            Nauka jest prosta i przyjemna.
            Każdy język został podzielony na lekcje, które nie zajmują wiele czasu i można je przejść nawet podczas przerwy od codzienny zajęć.
            </p>
          </td>
        </tr>
        <tr>
          <td className='HomeText'>
            <h2>Dlaczego my?</h2>
            <p>
            Langito.pl jest darmowe i nie wymaga rejestracji. Naukę można kontynuować w dowolnym miejscu o dowolnej porze.
            Aplikacja została zaprojektowana tak, aby sama zachęcała uczniów do nauki poprzez ciągłe wykonywanie kolejnych lekcji na różne sposoby.
            </p>
          </td>
          <td className='HomeImg'><img src={img3} alt=''/></td>
        </tr>
        <tr>
          <td className='HomeImg'><img src={img4} alt=''/></td>
          <td className='HomeText'>
            <h2>Jak to działa?</h2>
            <p>
            Aby rozpocząć naukę wystarczy że wybierzesz interesujący cię język z paska na górze strony.
            Jeśli twojego języka nie ma na pasku możesz wybrać opcję wszystkie języki.
            Następnie możesz wybrać klasę, po czym zobaczysz spis wszystkich lekcji pogrupowanych w działy.
            </p>
          </td>
        </tr>
      </tbody></table>
    </div>
  );
}
