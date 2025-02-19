import { useEffect, useState, useRef } from "react";
import "./Translator.css";
import lang from "../../languages";
import { AiFillSound } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { GiSpeaker } from "react-icons/gi";
import { FaRegStopCircle } from "react-icons/fa";
import { SiGoogletranslate } from "react-icons/si";

function Translator() {
  // const [fromText, setFromText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [toText, setToText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en-GB");
  const [toLanguage, setToLanguage] = useState("hi-IN");
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setLanguages(lang);
  }, []);

  const initializeRecognition = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Speech Recognition is not supported in this browser. Use Chrome.");
      return null;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = fromLanguage; // Dynamically set language

    let finalTranscript = transcript;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + " ";
        } else {
          interimTranscript = result[0].transcript;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start(); // Restart only if listening is still enabled
      }
    };

    recognitionRef.current = recognition; // Store recognition instance
    return recognition;
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initializeRecognition();
    }
    if (recognitionRef.current) {
      recognitionRef.current.lang = fromLanguage; // Set language before starting
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Properly stop recognition
      recognitionRef.current.onend = null; // Prevent auto-restart
    }
  };

  const copyContent = (text) => {
    navigator.clipboard.writeText(text);
  };

  const utterText = (text, language) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
  };

  const handleExchange = () => {
    setTranscript(toText);
    setToText(transcript);
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };

  const handleTranslate = () => {
    setLoading(true);
    let url = `https://api.mymemory.translated.net/get?q=${transcript}&langpair=${fromLanguage}|${toLanguage}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
        setLoading(false);
      });
  };

  return (
    <div id="translator">
      <div className="title mt-[-20px]">Speech-to-Speech Language Translator</div>
      <div className="container">
        <div className="wrapper" id="translator-wrapper">
          <div className="text-input">
            <textarea
              className="from-text bg-white text-[16px] text-black"
              placeholder="Start Listening to record speech..."
              value={transcript}
              onChange={(e) => setFromText(e.target.value)}
            ></textarea>
            <textarea
              className="to-text bg-white font-[16px] text-black"
              value={toText}
              placeholder="Translated text..."
              readOnly
            ></textarea>
          </div>

          <ul className="controls">
            <li className="row from">
              <div className="icons">
                <AiFillSound
                  className="icon"
                  onClick={() => utterText(transcript, fromLanguage)}
                />
                <FaCopy
                  className="icon"
                  onClick={() => copyContent(transcript)}
                />
              </div>
              <select
                value={fromLanguage}
                onChange={(e) => setFromLanguage(e.target.value)}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </li>

            <FaExchangeAlt onClick={handleExchange} />

            <li className="row to">
              <select
                value={toLanguage}
                onChange={(e) => setToLanguage(e.target.value)}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="icons">
                <FaCopy className="icon" onClick={() => copyContent(toText)} />
                <AiFillSound
                  className="icon"
                  onClick={() => utterText(toText, toLanguage)}
                />
              </div>
            </li>
          </ul>
        </div>
        <div className="buttons">
          <div>
            {!isListening ? (
              <div onClick={startListening} className="listening button">
                <GiSpeaker />
                Start Listening
              </div>
            ) : (
              <div onClick={stopListening} className="stop button">
                <FaRegStopCircle />
                Stop Listening
              </div>
            )}
          </div>

          <div
            className="translate button"
            onClick={handleTranslate}
            disabled={loading}
          >
            <SiGoogletranslate />
            {loading ? "Translating..." : "Translate Speech"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translator;
