import "./Signin.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import infinityLoader from "../../assets/infinityLoader.gif";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../constants/firebase";
import Cookies from "js-cookie";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error before a new attempt
    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user; // Get user object from response

      console.log("User logged in successfully");
      Cookies.set("token", user.accessToken, { expires: 7 });
      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, uid: user.uid })
      );
      window.location.href = "/account";
    } catch (error) {
      setError(error.message); // Store error for display
    } finally {
      setLoading(false);
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
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-container">
          <input
            placeholder="Enter password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        {!loading ? (
          <button className="submit" type="submit">
            Sign In
          </button>
        ) : (
          <img
            src={infinityLoader}
            className="scale-75 m-auto"
            alt="Loading..."
          />
        )}

        <p className="signup-link">
          Not a Member?&nbsp;&nbsp;
          <Link to={"/signup"}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
