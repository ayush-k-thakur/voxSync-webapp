import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Translator from "./components/translator/Translator";
import AskAI from "./components/askAI/AskAI";
import GenerateMoM from "./components/GenerateMoM";
import VideoConference from "./components/VideoConference";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import AccountDetails from "./components/accountDetails/AccountDetails";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Toaster position={"top-center"} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/ask-ai" element={<AskAI />} />
        <Route path="/meeting-minutes" element={<GenerateMoM />} />
        <Route path="/video-conference" element={<VideoConference />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/account" element={<AccountDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
