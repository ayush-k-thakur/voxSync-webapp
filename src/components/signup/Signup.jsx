import "./Signup.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import infinityLoader from "../../assets/infinityLoader.gif";
import { auth, db } from "../../constants/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Signup = () => {
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
    setLoading(true);

    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all details!");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;
      // await setDoc(doc(db, "Users", user.uid), { email: user.email, name });

      // Cookies.set("token", user.accessToken, { expires: 7 });
      // localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }));

      // Redirect to another page
      // window.location.href = "/create-trip";

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      console.log("user registered successfully");
      if (user) {
        await setDoc(doc(db, "Users", user.uid), { email: user.email, name });
        Cookies.set("token", user.accessToken, { expires: 7 });
        localStorage.setItem(
          "user",
          JSON.stringify({ email: user.email, uid: user.uid })
        );
        // window.location.href = "/create-trip";
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Sign up for an account</p>

        <div className="input-container">
          <input
            placeholder="Enter Full Name"
            type="text"
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Enter Email"
            type="email"
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Enter Password"
            type="password"
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Confirm Password"
            type="password"
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
          />
        </div>

        {!loading ? (
          <button className="submit" type="submit">
            Sign Up
          </button>
        ) : (
          <img src={infinityLoader} className="loader" alt="Loading..." />
        )}

        <p className="signup-link">
          Already a Member? <a href="/signin">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
