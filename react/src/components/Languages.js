import {Link} from 'react-router-dom';
import LoadingSide from './LoadingSide';
import ErrorServer from './ErrorServer.js';
import './Browse.css';

export default function Languages({data}) {
  if(data === undefined)
    return <LoadingSide/>;
  if(Number.isInteger(data))
    return <ErrorServer code={data}/>;
  return (
    <div id='BrowseSide' className='Side'>
      <h1 className='SideHeader'>Wszystkie języki</h1>
      {data.map((l, n) => <Language data={l} key={n}/>)}
    </div>
  );
}

function Language({data}) {
  return (
    <>
      <hr id={data.code}/>
      <h2 className='Language'>Język {data.name.toLowerCase()}</h2>
      <ul className='BrowseList'>
        {data.classes.map((c, n) => <Class code={c.code} name={c.name} key={n}/>)}
      </ul>
    </>
  );
}

function Class({code, name}) {
  return <li><Link to={'/class?code=' + code}>{name}</Link></li>;
}
