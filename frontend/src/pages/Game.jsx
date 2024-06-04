import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react"

import React from 'react';

function Game() {
  const paragraph = `random-words generates random words for use as sample text. We use it to generate random blog posts when testing Apostrophe.

  Cryptographic-quality randomness is NOT the goal, as speed matters for generating sample text and security does not. As such, Math.random() is used in most cases.
  
  The seed option can be used with the generate function for situations that require deterministic output. When given the same seed with the same input, generate() will yield deterministic results, in regards to both actual word selection and the number of words returned (when using min and max). The underlying implementation of this option utilizes the seedrandom package as a replacement for Math.random().`;
  
  const maxTime =60 ;
  const [time, setTime] = useState(maxTime);
  const [mistake, setMistake] = useState(0);
  const [WPN, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);

  return (
    <>
      <Navbar />
      <div className="mt-20 test">
        {paragraph.split('').map((char, index) => (
          <span key={index} className="char">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      <div className="result">
        <p>Time Left :<strong> {timeLeft}</strong></p>
        <p>Mistake:<strong></strong></p>
        <p>WPM :</p>
        <p>CpM:</p>
        <button>Try Again</button>
      </div>
      <Footer />
    </>
  );
}

export default Game;
