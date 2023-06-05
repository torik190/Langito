import {useState, useEffect} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import Error404 from './Error404.js';
import LoadingSide from './LoadingSide.js';
import ErrorServer from './ErrorServer.js';
import './Browse.css';

export default function Class() {
  const [params] = useSearchParams();
  const code = params.get('code');

  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:3001/class/' + code)
      .then(r => {
        if(!r.ok)
          return r.status;
        return r.json();
      })
      .then(r => setData(r))
      .catch(err => {setData(0); console.log(err);})
    };
    fetchData();
  }, [code]);
  
  if(!params.has('code'))
    return <Error404/>;
  if(data === undefined)
    return <LoadingSide/>;
  if(Number.isInteger(data))
    return <ErrorServer code={data}/>;
  return (
    <div id='BrowseSide' className='Side'>
      <h1 className='SideHeader'>Język {data.langName.toLowerCase()} - {data.name}</h1>
      {data.chapters.map((c, n) => <Chapter data={c} id={n + 1} key={n}/>)}
    </div>
  );
}

function Chapter({data, id}) {
  return (
    <>
      <h2 className='Chapter'>{id}. {data.name}</h2>
      <ul className='BrowseList'>
        {data.lessons.map((l, n) => <Lesson data={l} id={n + 1} key={n}/>)}
      </ul>
    </>
  );
}

function Lesson({data, id}) {
  return <li><Link className={'Lesson' + data.type} to={'/lesson?code=' + data.code}>{id}. {data.name}</Link></li>;
}
