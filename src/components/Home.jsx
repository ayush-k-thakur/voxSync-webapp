import React from "react";
import { Link } from "react-router-dom";
import { FaLanguage, FaRobot, FaVideo, FaFileAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to VoxSync</h1>
      <p className="text-gray-600 mb-8 text-lg">Seamless AI-powered communication and collaboration.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
      <Link to="/translator">
        <div className="bg-white cursor-pointer px-5 py-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-md mb-4 bg-blue-500">
            <FaLanguage className="text-white text-xl" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Translate</h2>
          <p className="text-gray-600 mt-2">Translate speech between multiple languages instantly</p>
        </div>
        </Link>
        <Link to="/ask-ai">
        <div className="bg-white cursor-pointer px-5 py-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-md mb-4 bg-purple-500">
            <FaRobot className="text-white text-xl" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Ask AI</h2>
          <p className="text-gray-600 mt-2">Get instant answers to your questions using AI</p>
        </div>
        </Link>
        <Link to="/meeting-minutes">
        <div className="bg-white cursor-pointer px-5 py-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-md mb-4 bg-green-500">
            <FaFileAlt className="text-white text-xl" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Meeting Minutes</h2>
          <p className="text-gray-600 mt-2">Generate professional meeting minutes automatically</p>
        </div>
        </Link>
        <Link to="/video-conference">
        <div className="bg-white cursor-pointer px-5 py-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-md mb-4 bg-red-500">
            <FaVideo className="text-white text-xl" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Video Conference</h2>
          <p className="text-gray-600 mt-2">Start or join video conferences with your team</p>
        </div>
        </Link>
      </div>
    </div>
  );
}
