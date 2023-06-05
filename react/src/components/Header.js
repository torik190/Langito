import {Link} from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import logo from '../images/logo.png';
import smallLogo from '../images/smallLogo.png';
import loading from '../images/loading.gif';
import error from '../images/error.svg';
import './Header.css';

var prevScrollTop = window.scrollY;
var canHide = true;
var scrollTimeout;

const hasScrolled = () => {
  const scrollTop = window.scrollY;
  
  if (scrollTop > prevScrollTop && scrollTop > 50 && canHide) {
    document.getElementById('Header').style.top = '-51px';
  } else {
    document.getElementById('Header').style.top = '0px';
  }

  prevScrollTop = scrollTop;
};

document.addEventListener('scroll', hasScrolled);

export default function Header({data}) {
  let buttons;
  if(data === undefined) {
    buttons = <><HeaderLoading id='FirstLanguage'/><HeaderLoading id='SecondLanguage'/></>
  } else if(Number.isInteger(data)) {
    buttons = <><HeaderError id='FirstLanguage'/><HeaderError id='SecondLanguage'/></>
  } else {
    buttons = <><HeaderLanguage id='FirstLanguage' data={data[0]}/><HeaderLanguage id='SecondLanguage' data={data[1]}/></>
  }

  return (
    <header id='Header'>
      <Link className='HeaderElement' to='/' onClick={() => {window.scroll(0, 0);}}><img className='Logo' src={logo} alt='logo'/><img className='SmallLogo' src={smallLogo} alt='logo'/></Link>
      {buttons}
      <Link className='HeaderElement' to='/languages' onClick={() => {window.scroll(0, 0);}}>Wszystkie języki</Link>
      <div id='DarkModeToggle'><DarkModeToggle/></div>
    </header>
  );
}

function HeaderLoading(props) {
  return (
      <div className='HeaderElement' style={{margin: '0 0 0 0'}} {...props}>
        <Link to='/languages' style={{padding: '0 15px 0 15px', display: 'block'}}>Ładowanie...<img className='Error' src={loading} alt='loading'/></Link>
      </div>
  );
}

function HeaderError(props) {
  return (
      <div className='HeaderElement' style={{margin: '0 0 0 0'}} {...props}>
        <Link to='/languages' style={{padding: '0 15px 0 15px', display: 'block'}}>Błąd połączenia<img className='Error' src={error} alt='error'/></Link>
      </div>
  );
}

function HeaderLanguage({data, ...props}) {
  return (
      <div className='HeaderElement' style={{margin: '0 0 0 0', height: 'max-content'}} onMouseEnter={showList} onMouseLeave={hideList} {...props}>
        <Link to='/languages' onClick={() => {scrollTo(data.code)}} style={{padding: '0 15px 0 15px', display: 'block'}}>{data.name} ⯆</Link>
        <div className='List' style={{display: 'none'}}>
         {data.classes.map((c, n) => <Class code={c.code} name={c.name} key={n}/>)}
        </div>
      </div>
  );
}

function Class({code, name}) {
  return (
    <Link to={'/class?code=' + code} className='Option'>
      {name}
    </Link>
  );
}

function showList(event) {
  let target = event.target;
  while(!target.classList.contains('HeaderElement')) {
    target = target.parentElement;
  }
  target.getElementsByClassName('List')[0].setAttribute('style', 'display: block');
}

function hideList(event) {
  let target = event.target;
  while(!target.classList.contains('HeaderElement')) {
    target = target.parentElement;
  }
  target.getElementsByClassName('List')[0].setAttribute('style', 'display: none');
}

function scrollTo(code) {
  setTimeout(() => {
    let element = document.getElementById(code);
    if(!element)
      return;
    element.scrollIntoView({behavior: 'smooth', block: 'start'});

    canHide = false;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      canHide = true;
    }, 1000);
  }, 100);
}