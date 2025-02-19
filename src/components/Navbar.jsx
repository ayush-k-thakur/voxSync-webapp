import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-transparent.png";
// import { Button } from "../ui/button";
import { useSonner } from "sonner";
import userImg from "../assets/userImg.png";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setLoading(true);
    setUser(JSON.parse(localStorage.getItem("user")));
    setLoading(false);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-200 h-[50px] shadow-lg flex justify-between items-center px-5">
      <Link to={"/"}>
        <div className="font-semibold text-[#f56551] flex justify-between items-center gap-[10px]">
          <img src={logo} alt="" className="h-[25px]" />
          <div>
            <span className="hidden sm:inline text-[#FF851B]">Vox</span>
            <span className="text-[#3D9970]">Sync</span>
          </div>
        </div>
      </Link>
      <div>
        {user ? (
          <div className="flex gap-5">
            {/* <Link to="/create-trip">
              <div
                className="border-2 flex flex-row"
                style={{
                  border: "1px solid black",
                  padding: "0px",
                  borderRadius: "10px",
                  height: "30px",
                  alignItems: "center",
                }}
              >
                <button
                  className="bg-inherit rounded-md text-black hover:bg-slate-200"
                  style={{ height: "20px" }}
                >
                  Create Trip
                </button>
              </div>
            </Link>
            <Link to="/my-trips">
              <div
                className="border-2 flex flex-row"
                style={{
                  border: "1px solid black",
                  padding: "0px",
                  borderRadius: "10px",
                  height: "30px",
                  alignItems: "center",
                }}
              >
                <button
                  className="bg-inherit rounded-md text-black hover:bg-slate-200"
                  style={{ height: "20px" }}
                >
                  My Trips
                </button>
              </div>
            </Link> */}

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
