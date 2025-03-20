import { useState, useRef, useEffect } from "react";

function RecordSpeech() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [result, setResult] = useState({ transcript: "", summary: "" });
  const [loading, setLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [bars, setBars] = useState(new Array(20).fill(5)); // Equal height initially

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const animationRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // 🎤 Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        audioChunks.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      animateBars();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Microphone access denied. Please allow microphone permissions.");
    }
  };

  // ⏹ Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    cancelAnimationFrame(animationRef.current);
  };

  // 🎨 Animate Bars for Voice Visualization
  const animateBars = () => {
    if (!analyserRef.current) return;

    const update = () => {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      dataArrayRef.current.forEach((value, i) => {
        const bar = document.getElementById(`bar-${i}`);
        if (bar) {
          // Convert audio data to a height range (20px to 50px)
          bar.style.height = `${Math.max(20, (value / 255) * 50)}px`;
        }
      });

      animationRef.current = requestAnimationFrame(update);
    };

    update();
  };

  // 📤 Upload Audio & Generate Summary
  const handleUpload = async () => {
    if (!audioBlob) return alert("Please record audio first.");
    setLoading(true);
    setResult({ transcript: "", summary: "" });

    const formData = new FormData();
    formData.append("file", audioBlob, "recorded_audio.webm");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      setShowOutput(true);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#52ACFF",
        backgroundImage: "linear-gradient(20deg, #52ACFF 25%, #FFE32C 100%)",
      }}
    >
      {/* Outer Box */}
      <div className="h-[90vh] w-full max-w-3xl p-6 relative">
        {/* Fixed Recording Box */}
        <div className="bg-white shadow-md rounded-lg p-6 sticky top-0 z-10 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Speech to Meeting Output
          </h1>

          {/* 🎤 Voice Bars Animation */}
          {isRecording && (
            <div className="flex gap-1 mb-4 items-end">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-green-500 rounded transition-all duration-200 ease-in-out"
                  style={{ height: "20px" }} // Uniform height initially
                  id={`bar-${i}`}
                ></div>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-red-500 text-white font-semibold px-6 py-2 rounded-md transition-all duration-300 hover:bg-red-600"
              >
                🎤 Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-md transition-all duration-300 hover:bg-gray-600"
              >
                ⏹ Stop Recording
              </button>
            )}

            <button
              onClick={handleUpload}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white font-semibold"
              }`}
              disabled={loading || !audioBlob}
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </span>
              ) : (
                "Generate MoM"
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Output Box */}
        {showOutput && (
          <div className="h-[65vh] bg-gray-100 shadow-md rounded-lg p-6 mt-6 overflow-y-auto">
            {result.transcript && (
              <div className="p-4 bg-white rounded-md">
                <h2 className="text-lg font-semibold text-gray-700">
                  Transcript:
                </h2>
                <p className="text-gray-600 mt-1">{result.transcript}</p>
              </div>
            )}

            {result.summary && (
              <div className="p-4 bg-white rounded-md mt-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Meeting Summary:
                </h2>
                <p className="text-gray-600 mt-1">{result.summary}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordSpeech;
