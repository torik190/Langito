import React, {useEffect, useContext} from "react";
import Toggle from "react-toggle";
import {DarkMode} from "../App";
import sun from '../images/sun.svg';
import moon from '../images/moon.svg';
import "./DarkModeToggle.css";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useContext(DarkMode);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('Dark');
    } else {
      document.body.classList.remove('Dark');
    }
  }, [isDark]); 

  return (
    <Toggle
      checked={isDark}
      onChange={({target}) => setIsDark(target.checked)}
      icons={{checked: <img src={moon} alt='dark' className='toggleIcon'/>, unchecked: <img src={sun} alt='light' className='toggleIcon'/>}}
    />
  );
};