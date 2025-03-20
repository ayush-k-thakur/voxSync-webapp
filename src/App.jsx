import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Translator from "./components/translator/Translator";
import AskAI from "./components/askAI/AskAI";
import VideoConference from "./components/VideoConference";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import AccountDetails from "./components/accountDetails/AccountDetails";
import GenerateMinuteHome from "./components/generateMoM/generateMinuteHome";
import GenerateMinuteFile from "./components/generateMoM/GenerateMinuteFile";
import GenerateMinuteRecord from "./components/generateMoM/GenerateMinuteRecord";

function App() {
  const [user, setUser] = useState(null);

  function handleUser() {
    setUser(JSON.parse(localStorage.getItem("user")));
  }
  useEffect(() => {
    handleUser();
  }, []);

  return (
    <Router>
      <Toaster position={"top-center"} />
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/ask-ai" element={<AskAI />} />
        <Route path="/meeting-minutes" element={<GenerateMinuteHome />} />
        <Route path="/meeting-minutes-file" element={<GenerateMinuteFile />} />
        <Route
          path="/meeting-minutes-record"
          element={<GenerateMinuteRecord />}
        />
        <Route path="/video-conference" element={<VideoConference />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/account"
          element={<AccountDetails setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
