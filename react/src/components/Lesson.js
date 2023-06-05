import {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {ReactMarkdown} from 'react-markdown/lib/react-markdown.js';
import remarkGfm from 'remark-gfm'
import Error404 from './Error404.js';
import LoadingSide from './LoadingSide.js';
import ErrorServer from './ErrorServer.js';
import './Lesson.css';

var lessonLength;
var quizData;
var quizScore;
function prepareQuiz(data) {
  function shuffle(arr) {
    let currIdx = arr.length;
    let randomIdx;
    while(currIdx !== 0) {
      randomIdx = Math.floor(Math.random() * currIdx);
      currIdx--;
      [arr[currIdx], arr[randomIdx]] = [
        arr[randomIdx], arr[currIdx]];
    }
    return arr;
  }

  quizData = Object.keys(data).map((key, n) => {
    let values = Object.values(data);
    values.splice(n, 1);
    let arr = [data[key]];
    for(let i = 0; i < 3; i++) {
      let idx = Math.floor(Math.random() * values.length);
      arr.push(values[idx]);
      values.splice(idx, 1);
    }
    return shuffle(arr);
  })
  quizScore = 0;
}
function prepareWritting(data) {
  if(getInput()) {
    getInput().value = '';
  }
  quizScore = 0;
}
function getInput() {
  return document.getElementById('WrittingInput');
}

export default function Lesson() {
  const [params] = useSearchParams();
  const code = params.get('code');

  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:3001/lesson/' + code)
      .then(r => {
        if(!r.ok)
          return r.status;
        return r.json();
      })
      .then(d => {setData(d); if(d.value !== undefined) lessonLength = Object.keys(d.value).length;})
      .catch(err => {setData(0); console.log(err);})
    };
    fetchData();
    setGameMode(undefined);
  }, [code]);

  let navigate = useNavigate();
  const [gameMode, setGameMode] = useState();
  const [progress, setProgress] = useState(0);
  const [answer, setAnswer] = useState();
  function changeGameMode(gm) {
    lessonLength = Object.keys(data.value).length;
    setGameMode(gm);
    setProgress(0);
    setAnswer(undefined);
  }
  function nextCard() {
    if(getInput()) {
      getInput().value = '';
    }
    setAnswer(undefined);
    if(progress >= lessonLength) {
      setGameMode(undefined);
    } else {
      setProgress(progress + 1);
    }
  }
  function prevCard() {
    setAnswer(undefined);
    if(progress <= 0) {
      setGameMode(undefined);
    } else {
      setProgress(progress - 1);
    }
  }
  
  if(!params.has('code'))
    return <Error404/>;
  if(data === undefined)
    return <LoadingSide/>;
  if(Number.isInteger(data))
    return <ErrorServer code={data}/>;
  if(data.type === 0) {
    return (
      <div id='LessonSide' className='Side MarkDown'>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.value}</ReactMarkdown>
        <button onClick={() => navigate(-1)}>Wróć</button>
      </div>
    );
  } else if(data.type === 1 || data.type === 2) {
    if(gameMode === undefined) {
      if(data.type === 2) {
        return (
          <div id='LessonSide' className='Side'>
            <h1>Język {data.langName.toLowerCase()} - {data.name}</h1>
            <p className='Postscript'>Długość lekcji: {lessonLength} zwrotów</p>
            <GameMode name='Quiz' description='Sprawdź swoją wiedzę z quizem z czterema odpowiedziami.' onClick={() => {changeGameMode('quiz'); prepareQuiz(data.value);}}/>
            <GameMode name='Pisanie' description='Sprawdzaj pisownię w trybie wpisywania odpowiedzi.' onClick={() => {changeGameMode('writting'); prepareWritting();}} style={{animationDelay: '0.2s'}}/>
            <button onClick={() => navigate(-1)}>Wróć</button>
          </div>
        );
      } else {
        return (
          <div id='LessonSide' className='Side'>
            <h1>Język {data.langName.toLowerCase()} - {data.name}</h1>
            <p className='Postscript'>Długość lekcji: {lessonLength} zwrotów</p>
            <GameMode name='Karty' description='Ucz się szybko nowych zwrotów dzięki kartom z hasłami.' onClick={() => changeGameMode('cards')}/>
            <GameMode name='Fiszki' description='Powtórz nowo poznane zwroty przy pomocy fiszek.' onClick={() => changeGameMode('flashcards')} style={{animationDelay: '0.2s'}}/>
            <GameMode name='Quiz' description='Sprawdź swoją wiedzę z quizem z czterema odpowiedziami.' onClick={() => {changeGameMode('quiz'); prepareQuiz(data.value);}} style={{animationDelay: '0.4s'}}/>
            <GameMode name='Pisanie' description='Sprawdzaj pisownię w trybie wpisywania odpowiedzi.' onClick={() => {changeGameMode('writting'); prepareWritting();}} style={{animationDelay: '0.6s'}}/>
            <button onClick={() => navigate(-1)}>Wróć</button>
          </div>
        );
      }
    } else if(gameMode === 'cards') {
      return (
        <LessonSide data={data}>
            <Card lang='Polski' text={Object.keys(data.value)[progress]} lang2={data.langName} text2={Object.values(data.value)[progress]}/>
            <button onClick={prevCard}>{progress === 0 ? 'Wyjdź' : 'Poprzednia'}</button><button onClick={nextCard}>{progress === lessonLength ? 'Zakończ' : 'Następna'}</button>
            <ProgressBar progress={progress / lessonLength}/>
        </LessonSide>
      );
    } else if(gameMode === 'flashcards') {
      return (
        <LessonSide data={data}>
            <Card flashcard lang='Polski' text={Object.keys(data.value)[progress]} lang2={data.langName} text2={Object.values(data.value)[progress]}/>
            <button onClick={prevCard}>{progress === 0 ? 'Wyjdź' : 'Poprzednia'}</button><button onClick={nextCard}>{progress === lessonLength ? 'Zakończ' : 'Następna'}</button>
            <ProgressBar progress={progress / lessonLength}/>
        </LessonSide>
      );
    } else if(gameMode === 'quiz') {
      let question = Object.keys(data.value)[progress];
      let correct = Object.values(data.value)[progress];
      function check(ans) {
        let card = document.getElementById('Card');
        card.classList.remove('Flip');
        void card.offsetWidth;
        card.classList.add('Flip');
        setTimeout(() => {if(ans === correct) quizScore++; setAnswer(ans);}, 150);
      }
      
      if(progress === lessonLength) {
        return (
          <LessonSide data={data}>
              <div id='Card' className='Card LastCard'>
                <h6>{quizScore === lessonLength ? 'Gratulacje!' : 'Próbuj dalej.'} Twój wynik to:</h6>
                <p>{quizScore} / {lessonLength}</p>
              </div>
              <button onClick={() => {changeGameMode('quiz'); prepareQuiz(data.value);}}>Spróbuj jeszcze raz</button><button onClick={nextCard}>Zakończ</button>
              <ProgressBar progress={progress / lessonLength}/>
          </LessonSide>
        );
      } else if(answer) {
        return (
          <LessonSide data={data}>
              <div id='Card' className='Card LastCard'>
                <h6>{question} w języku {data.langName.toLowerCase()}m to:</h6>
                <p className={answer === correct ? 'Correct' : 'Wrong'}>{correct}</p>
              </div>
              <ol className='Answers'>
                {quizData[progress].map((ans, n) => <li className={ans === correct ? 'Correct' : answer === ans ? 'Wrong' : 'Other'} key={n}>{ans}</li>)}
              </ol>
              <button onClick={() => setGameMode(undefined)}>Wyjdź</button><button onClick={nextCard}>Następne pytanie</button>
              <ProgressBar progress={progress / lessonLength}/>
          </LessonSide>
        );
      } else {
        return (
          <LessonSide data={data}>
              <div id='Card' className='Card LastCard'>
                <h6>Jak w języku {data.langName.toLowerCase()}m jest:</h6>
                <p>{question}</p>
              </div>
              <ol className='Answers'>
                {quizData[progress].map((a, n) => <li className='Answer' onClick={() => check(a)} key={n}>{a}</li>)}
              </ol>
              <button onClick={() => setGameMode(undefined)}>Wyjdź</button><button className='disabled'>Następne pytanie</button>
              <ProgressBar progress={progress / lessonLength}/>
          </LessonSide>
        );
      }
    } else if(gameMode === 'writting') {
      let question = Object.keys(data.value)[progress];
      let correct = Object.values(data.value)[progress];
      let correctTrimmed;
      if(correct) {
        correctTrimmed = correct.trim().toLowerCase();
      }
      function check() {
        let ans = getInput().value.trim().toLowerCase();
        if(ans === '') {
          return;
        }
        let card = document.getElementById('Card');
        card.classList.remove('Flip');
        void card.offsetWidth;
        card.classList.add('Flip');
        setTimeout(() => {if(ans === correctTrimmed) quizScore++; setAnswer(ans);}, 150);
      }
      
      if(progress === lessonLength) {
        return (
          <LessonSide data={data}>
              <div id='Card' className='Card LastCard'>
                <h6>{quizScore === lessonLength ? 'Gratulacje!' : 'Próbuj dalej.'} Twój wynik to:</h6>
                <p>{quizScore} / {lessonLength}</p>
              </div>
              <button onClick={() => {changeGameMode('writting'); prepareWritting();}}>Spróbuj jeszcze raz</button><button onClick={nextCard}>Zakończ</button>
              <ProgressBar progress={progress / lessonLength}/>
          </LessonSide>
        );
      } else if(answer) {
        return (
          <LessonSide data={data}>
              <div id='Card' className='Card LastCard'>
                <h6>{question} w języku {data.langName.toLowerCase()}m to:</h6>
                <p className={answer === correctTrimmed ? 'Correct' : 'Wrong'}>{correct}</p>
              </div>
              <input id='WrittingInput' className={answer === correctTrimmed ? 'Correct' : 'Wrong'}/>
              <button onClick={() => setGameMode(undefined)}>Wyjdź</button><button onClick={nextCard}>Następne pytanie</button>
              <ProgressBar progress={progress / lessonLength}/>
          </LessonSide>
        );
      } else {
        return (
          <LessonSide data={data}>
              <div id='Card' className='Card LastCard'>
                <h6>Jak w języku {data.langName.toLowerCase()}m jest:</h6>
                <p>{question}</p>
              </div>
              <input id='WrittingInput'/>
              <button onClick={() => setGameMode(undefined)}>Wyjdź</button><button onClick={() => check()}>Sprawdź</button>
              <ProgressBar progress={progress / lessonLength}/>
          </LessonSide>
        );
      }
    } else {
      throw new Error("Undefined game mode: " + gameMode);
    }
  } else {
    return <ErrorServer code={415}/>
  }
}

function LessonSide({children, data}) {
  return (
    <div id='LessonSide' className='Side'>
      <h1>Język {data.langName.toLowerCase()} - {data.name}</h1>
      <div id='CardsContainer'>
        {children}
      </div>
    </div>
  )
}

function GameMode({name, description, onClick, ...props}) {
  return (
    <div className='GameMode' {...props}>
      <h2>{name}</h2><button onClick={onClick}>Zacznij</button>
      <p>{description}</p>
    </div>
  )
}

function Card({flashcard, lang, text, lang2, text2}) {
  const [isFlipped, setFlipped] = useState(false);
  useEffect(() => setFlipped(false), [text]);

  function flip() {
    let card = document.getElementById('Card');
    card.classList.remove('Flip');
    void card.offsetWidth;
    card.classList.add('Flip');
    setTimeout(() => setFlipped(!isFlipped), 150);
  }

  if(text === undefined) {
    return (
      <div id='Card' className='Card LastCard'>
        <h6>Gratulacje!</h6>
        <p>Ukończyłeś lekcję</p>
      </div>
    )
  } else if(flashcard) {
    return (
      <div id='Card' className='Card Flashcard' onClick={flip}>
        <h6>{isFlipped ? lang2 : lang}:</h6>
        <p>{isFlipped ? text2 : text}</p>
      </div>
    )
  } else {
    return (
      <div id='Card' className='Card'>
        <h6>{lang}:</h6>
        <p>{text}</p>
        <hr/>
        <h6>{lang2}:</h6>
        <p>{text2}</p>
      </div>
    )
  }
}

function ProgressBar({progress}) {
  return (
    <div id='ProgressBar'>
      <div style={{width: progress * 100 + '%'}}/>
    </div>
  )
}
