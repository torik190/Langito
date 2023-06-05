import React, {useState, useEffect, createContext} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './components/Home.js';
import Languages from './components/Languages.js';
import Class from './components/Class.js';
import Lesson from "./components/Lesson.js";
import FAQ from "./components/FAQ.js";
import Error404 from './components/Error404.js';

export const DarkMode = createContext();

export default function App() {
  const [isDark, setIsDark] = useState(false);

  const [languages, setLanguages] = useState();
  useEffect(() => {
    const fetchLanguages = async () => {
      await fetch('http://localhost:3001/languages')
      .then(r => {
        if(!r.ok)
          return r.status;
        return r.json();
      })
      .then(r => setLanguages(r))
      .catch(err => {setLanguages(0); console.log(err);})
    };
    fetchLanguages();
  }, []);

  return (
    <DarkMode.Provider value={[isDark, setIsDark]}>
      <Router>
        <div className='App'>
          <Header data={languages}/>
          <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/languages' element={<Languages data={languages}/>}/>
          <Route exact path='/class' element={<Class/>}/>
          <Route exact path='/lesson' element={<Lesson/>}/>
          <Route exact path='/faq' element={<FAQ/>}/>
          <Route exact path='/*' element={<Error404/>}/>
          </Routes>
          <Footer/>
        </div>
      </Router>
    </DarkMode.Provider>
  );
}
