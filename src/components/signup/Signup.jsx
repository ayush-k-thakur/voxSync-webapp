//  import { createUserWithEmailAndPassword } from "firebase/auth";
//  import React, { useState } from "react";
//  import { Link } from "react-router-dom";
//  import styled from "styled-components";
//  import { toast } from "sonner";
//  import Cookies from "js-cookie";
//  import infinityLoader from "../../images/infinityLoader.gif";

//  const Form = () => {
//

//    return (
//      <StyledWrapper>

//      </StyledWrapper>
//    );
//  };

//  const StyledWrapper = styled.div`
//    .form-box {
//      display: flex;
//      justify-content: center;
//      margin-top: 100px;
//    }
//    .form {
//      background-color: #fff;
//      display: block;
//      padding: 1rem;
//      max-width: 350px;
//      border-radius: 0.5rem;
//      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
//        0 4px 6px -2px rgba(0, 0, 0, 0.05);
//    }

//    .form-title {
//      font-size: 1.25rem;
//      line-height: 1.75rem;
//      font-weight: 600;
//      text-align: center;
//      color: #000;
//      margin-bottom: 20px;
//    }

//    .input-container {
//      position: relative;
//    }

//    .input-container input,
//    .form button {
//      outline: none;
//      border: 1px solid #f56551;
//      margin: 8px 0;
//    }

//    .input-container input {
//      background-color: #fff;
//      padding: 1rem;
//      padding-right: 3rem;
//      font-size: 0.875rem;
//      line-height: 1.25rem;
//      width: 300px;
//      border-radius: 0.5rem;
//      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//    }

//    .input-container span {
//      display: grid;
//      position: absolute;
//      top: 0;
//      bottom: 0;
//      right: 0;
//      padding-left: 1rem;
//      padding-right: 1rem;
//      place-content: center;
//    }

//    .input-container span svg {
//      color: #9ca3af;
//      width: 1rem;
//      height: 1rem;
//    }

//    .submit {
//      display: block;
//      padding-top: 0.75rem;
//      padding-bottom: 0.75rem;
//      padding-left: 1.25rem;
//      padding-right: 1.25rem;
//      background-color: #f56551;
//      color: #ffffff;
//      font-size: 0.875rem;
//      line-height: 1.25rem;
//      font-weight: 500;
//      width: 100%;
//      border-radius: 0.5rem;
//      text-transform: uppercase;
//    }

//    .signup-link {
//      color: #6b7280;
//      font-size: 0.875rem;
//      line-height: 1.25rem;
//      text-align: center;
//    }

//    .signup-link a {
//      text-decoration: underline;
//    }
//  `;

//  export default Form;
import "./Signup.css";
import React, { useState } from "react";
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
          Already a Member? <a href="/auth/signin">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
