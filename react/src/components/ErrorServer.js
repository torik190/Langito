import Error404 from './Error404';
import error from '../images/error.svg';
import './Error.css';

export default function ErrorServer({code = 404}) {
  if(code === 404) {
    return <Error404/>
  }
  if(code === 0) {
    return (
      <div id='ErrorSide' className='Side'>
        <img src={error} alt='loading'/>
        <h1>Błąd połączenia</h1>
        Brak połączenia z serwerem. Spróbuj ponownie później.
      </div>
    );
  }
  if(code === 501) {
    return (
      <div id='ErrorSide' className='Side'>
        <img src={error} alt='error'/>
        <h1>Klasa niedostępna</h1>
        Langito.pl jest aktualnie w wersji demonstracyjnej i nie ma dostępu do wszystkich funkcji. Dostępne klasy to:<br/>
        Język angielski - Klasa 1
      </div>
    );
  }
  return (
    <div id='ErrorSide' className='Side'>
      <img src={error} alt='error'/>
      <h1>Nieoczekiwany błąd</h1>
      Nastąpił błąd podczas komunikacji z serwerem. Kod błędu: {code}
    </div>
  );
}
