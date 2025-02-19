import "./Signin.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import infinityLoader from "../../assets/infinityLoader.gif";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../constants/firebase";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("user logged in successfully");
      window.location.href = "/account";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Sign in to your account</p>

        <div className="input-container">
          <input
            placeholder="Enter email"
            type="email"
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <span>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http:www.w3.org/2000/svg"
            >
              <path
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        <div className="input-container">
          <input
            placeholder="Enter password"
            type="password"
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          <span>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http:www.w3.org/2000/svg"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        {!loading ? (
          <button className="submit" type="submit" onClick={handleSubmit}>
            Sign In
          </button>
        ) : (
          <img src={infinityLoader} className="scale-75 m-auto" alt="" />
        )}
        <p className="signup-link">
          Already a Member?&nbsp;&nbsp;
          <Link to={"/signup"}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
