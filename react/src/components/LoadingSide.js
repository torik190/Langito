import loading from '../images/loading.gif';
import './Error.css';

export default function LoadingSide() {
  return (
    <div id='ErrorSide' className='Side'>
      <img className='Emergence' src={loading} alt='loading'/>
      <h1 className='Emergence'>Ładowanie...</h1>
    </div>
  );
}
