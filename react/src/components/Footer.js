import './Footer.css';
import {useContext} from "react";
import {Link} from 'react-router-dom';
import {DarkMode} from "../App";
import addressBlack from '../images/addressBlack.svg';
import emailBlack from '../images/emailBlack.svg';
import phoneBlack from '../images/phoneBlack.svg';
import addressWhite from '../images/addressWhite.svg';
import emailWhite from '../images/emailWhite.svg';
import phoneWhite from '../images/phoneWhite.svg';

export default function Footer() {
  const [address, email, phone] = useContext(DarkMode)[0] ? [addressWhite, emailWhite, phoneWhite] : [addressBlack, emailBlack, phoneBlack];
  return (
    <>
      <footer id='Footer'>
        <table>
          <thead>
            <tr>
              <th>Zasoby<hr/></th><th>Znajdź nas na<hr/></th><th>Informacje kontaktowe<hr/></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link to='/' onClick={() => {window.scroll(0, 0);}}>Aplikacja</Link></td><td><a href='https://facebook.com/' target='blank'>Facebook</a></td><td><img src={address} alt='address'/>Przykładowa 5 Gdańsk</td>
            </tr>
            <tr>
              <td><Link to='/faq' onClick={() => {window.scroll(0, 0);}}>FAQ</Link></td><td><a href='https://twitter.com/' target='blank'>Twitter</a></td><td><img src={email} alt='email'/>info@langito.pl</td>
            </tr>
            <tr>
              <td></td><td><a href='https://youtube.com/' target='blank'>Youtube</a></td><td><img src={phone} alt='phone'/>789 456 123</td>
            </tr>
          </tbody>
        </table>
      </footer>
      <div id='FooterBar'>
        © 2023 Wiktor Pacuk
      </div>
    </>
  );
}
