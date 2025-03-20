import { useState } from "react";

function GenerateMinuteFile() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState({ transcript: "", summary: "" });
  const [loading, setLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an audio file.");

    setLoading(true);
    setResult({ transcript: "", summary: "" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      setShowOutput(true); // Show Output Box after Fetch
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
      <div className="h-[90vh] w-full max-w-3xl bg-transparent mt-5 p-6 relative">
        {/* Fixed Upload Box */}
        <div className="h-[25vh] bg-white shadow-md rounded-lg p-6 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Audio Transcription & Meeting Summary
          </h1>

          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={handleUpload}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md transition-all duration-300 hover:bg-green-700 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                "Upload & Generate"
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Output Box */}
        {showOutput && (
          <div className="h-[60vh] bg-gray-100 shadow-md rounded-lg p-6 mt-6 overflow-y-auto">
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

export default GenerateMinuteFile;
