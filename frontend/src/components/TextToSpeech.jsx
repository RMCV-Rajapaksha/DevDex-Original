import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div>
      <button onClick={handlePlay} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-3xl mx-1">
        <FontAwesomeIcon icon={isPaused ? faPlay : faPlay} className="mr-2" />
        {isPaused ? "Resume" : "Play"}
      </button>
      <button onClick={handlePause} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-3xl mx-1">
        <FontAwesomeIcon icon={faPause} className="mr-2" />
        Pause
      </button>
      <button onClick={handleStop} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-3xl mx-1">
        <FontAwesomeIcon icon={faStop} className="mr-2" />
        Stop
      </button>
    </div>
  );
};

export default TextToSpeech;
