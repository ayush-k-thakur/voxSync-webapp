import { useEffect, useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./AskAI.css";
import lang from "../../languages";
import { AiFillSound } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";
import { GiSpeaker } from "react-icons/gi";
import { FaRegStopCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaEraser } from "react-icons/fa6";

function Translator() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en-GB");
  const [toLanguage, setToLanguage] = useState("hi-IN");
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(false);
  // const [transcript, setTranscript] = useState("i love you gaurav");
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [question, setQuestion] = useState("");
  const recognitionRef = useRef(null); // Store recognition instance

  const genAI = new GoogleGenerativeAI(
    "AIzaSyC6ncFH1QtAmEZ3RO3UzeapMaorV0LJeUw" //gaurav
  );
  const LangGenAI = new GoogleGenerativeAI(
    "AIzaSyCRoidT3tOUnW7EEFC8VRrCJwo9TfljSjA" //ayush
  );
  const langModel = LangGenAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
  });
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

  const handleReset = () => {
    console.log(transcript, toText);
    setTranscript("");
    setToText("");

    console.log("Resetting...");
    console.log(transcript, toText);
  };

  const translateText = async (text, sourceLang, targetLang, process) => {
    if (process === "user" && sourceLang === "en-GB") return text;
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|${targetLang}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.responseData.translatedText;
    // try {
    //   const result = await model.generateContent(
    //     `Translate the following text from ${sourceLang} to ${targetLang}: ${text}. Send just the translated text.`
    //   );
    //   const response = await result.response.text();
    //   return response;
    // } catch (error) {
    //   console.error("Error fetching AI response:", error);
    //   return "Sorry, I couldn't generate a response.";
    // }
  };

  const translateAiResponse = async (text, sourceLang, targetLang, process) => {
    if (targetLang === "en-GB" && sourceLang === "en-GB") return text;
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|${targetLang}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.responseData.translatedText;
    // try {
    //   const result = await langModel.generateContent(
    //     `Translate the following text from ${sourceLang} to ${targetLang}: ${text}. Send just the translated text.`
    //   );
    //   const response = result.response.text();
    //   return response;
    // } catch (error) {
    //   console.error("Error fetching AI response:", error);
    //   return "Translating the answer in your lan";
    // }
  };

  const askGeminiAI = async (text) => {
    try {
      const result = await model.generateContent(
        `I am a child and I want to now ${transcript}, can you explain it to me in short? If yes, then please send me the answer in simple words in less than 100 words.`
      );
      const response = result.response.text();
      return response;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Translating the answer in your language...";
    }
  };

  const handleGetAnswer = async () => {
    // console.log("......Translation started......");
    // console.log("User Input:", transcript);

    try {
      setLoading(true);

      // Translate user speech to English
      const englishText = await translateText(
        transcript,
        fromLanguage,
        "en-GB",
        "user"
      );
      // console.log("English Text:", englishText);

      // Generate AI response in English
      const response = await askGeminiAI(englishText);
      // console.log("AI Response:", response);

      const aiResponse = response.replace(/\*/g, "");
      // console.log("Cleaned Response:", aiResponse);

      // Translate AI response to target language
      const translatedResponse = await translateText(
        aiResponse,
        "en-GB",
        toLanguage,
        "system"
      );
      // console.log("Translated Response:", translatedResponse);

      // Set translated response to state
      setToText(translatedResponse);
    } catch (error) {
      // console.error("Error during translation process:", error);
      setToText("Error processing request.");
    } finally {
      setLoading(false);
      // console.log("......Translation ended......");
    }
  };

  return (
    <div id="translator">
      <div className="title">Speech-to-Speech AI Assistant</div>
      <div className="container">
        <div className="wrapper" id="translator-wrapper">
          <div className="text-input">
            <textarea
              className="from-text bg-white font-[16px] text-black"
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

            <div className="clear" onClick={handleReset}>
              <FaEraser />
              Clear
            </div>

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
            onClick={handleGetAnswer}
            disabled={loading}
          >
            <BsFillQuestionCircleFill />
            {loading ? "Generating..." : "Get Answer"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translator;
