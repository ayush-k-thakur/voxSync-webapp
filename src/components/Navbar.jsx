import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-transparent.png";
// import { Button } from "../ui/button";
import { useSonner } from "sonner";
import userImg from "../assets/userImg.png";

const Navbar = ({user}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-200 h-[50px] shadow-lg flex justify-between items-center px-5">
      <div className="flex gap-20 lg:gap-28 ">
        <Link to={"/"}>
          <div className="font-semibold text-[#f56551] flex justify-between items-center gap-[10px] mt-2">
            <img src={logo} alt="" className="h-[25px]" />
            <div>
              <span className="hidden sm:inline text-[#FF851B]">Vox</span>
              <span className="text-[#3D9970]">Sync</span>
            </div>
          </div>
        </Link>
        <div className="hidden md:flex mt-1">
          <Link
            to={"/translator"}
            className="relative px-4 py-2 text-gray-600 transition-all duration-300 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[0.1rem] after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
          >
            Translator
          </Link>
          <Link
            to={"/ask-ai"}
            className="relative px-4 py-2 text-gray-600 transition-all duration-300 hover:text-purple-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[0.1rem] after:bg-purple-500 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
          >
            ASK AI
          </Link>
          <Link
            to={"/meeting-minutes"}
            className="relative px-4 py-2 text-gray-600 transition-all duration-300 hover:text-green-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[0.1rem] after:bg-green-500 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
          >
            Generate MoM
          </Link>
          <Link
            to={"/video-conference"}
            className="relative px-4 py-2 text-gray-600 transition-all duration-300 hover:text-red-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[0.1rem] after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
          >
            Video Conferencing
          </Link>
        </div>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5">
            {!loading ? (
              <Link to={"/account"}>
                <img src={userImg} className="h-[30px]" />
              </Link>
            ) : (
              <div
                className="bg-slate-600"
                style={{ borderRadius: "50%" }}
              ></div>
            )}
          </div>
        ) : (
          <Link to={"/signin"}>
            <button
              style={{
                backgroundColor: "black",
                padding: "2px 7px",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
