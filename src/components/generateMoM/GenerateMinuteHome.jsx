import React from "react";
import { Link } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import { FaRecordVinyl } from "react-icons/fa6";

export default function GenerateMinuteHome() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 pt-32">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Automated Minutes of Meeting Generation
      </h1>
      <p className="text-gray-600 mb-8 text-lg">
        Get your Minutes of Meeting generated by AI.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Link to="/meeting-minutes-file">
          <div className="bg-white cursor-pointer px-5 py-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-md mb-4 bg-blue-500">
              <FaFileAlt className="text-white text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Upload Meeting File
            </h2>
            <p className="text-gray-600 mt-2">
              Generate meeting minutes from a file instantly.
            </p>
          </div>
        </Link>
        <Link to="/meeting-minutes-record">
          <div className="bg-white cursor-pointer px-5 py-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-md mb-4 bg-purple-500">
              <FaRecordVinyl className="text-white text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Record & Transcribe
            </h2>
            <p className="text-gray-600 mt-2">
              Record and transcribe your meeting in real time.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
