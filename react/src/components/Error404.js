import error from '../images/error.svg';
import './Error.css';

export default function Error404() {
  return (
    <div id='ErrorSide' className='Side'>
      <img src={error} alt='loading'/>
      <h1>Błąd 404</h1>
      Nie znaleziono strony powiązanej z podanym adresem URL.
    </div>
  );
}
