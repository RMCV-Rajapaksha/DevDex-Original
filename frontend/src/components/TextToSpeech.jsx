import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
      u.voice = selectedVoice;
    }

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text, selectedVoice]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    setVoices(voices);
  }, []);

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
      <select
        value={selectedVoice ? selectedVoice.name : ""}
        onChange={(e) => {
          const voice = voices.find((v) => v.name === e.target.value);
          setSelectedVoice(voice);
        }}
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <button onClick={handlePlay} className="px-4 py-2 mx-1 font-semibold text-white cursor-pointer bg-gradient-to-r from-yellow-400 to-pink-600 rounded-xl">
        <FontAwesomeIcon icon={isPaused ? faPlay : faPlay} className="mr-2" />
        {isPaused ? "Resume" : "Play"}
      </button>
      <button onClick={handlePause} className="px-4 py-2 mx-1 font-semibold text-white cursor-pointer bg-gradient-to-r from-yellow-400 to-pink-600 rounded-xl">
        <FontAwesomeIcon icon={faPause} className="mr-2" />
        Pause
      </button>
      <button onClick={handleStop} className="px-4 py-2 mx-1 font-semibold text-white cursor-pointer bg-gradient-to-r from-yellow-400 to-pink-600 rounded-xl">
        <FontAwesomeIcon icon={faStop} className="mr-2" />
        Stop
      </button>
    </div>
  );
};

export default TextToSpeech;