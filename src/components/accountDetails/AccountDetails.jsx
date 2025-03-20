import React, { useEffect, useState } from "react";
import { auth, db } from "../../constants/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Cookies from "js-cookie";

function AccountDetails({setUser}) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const unsubscribeSnapshot = onSnapshot(userRef, (userSnap) => {
          if (userSnap.exists()) {
            setUserDetails(userSnap.data());
          }
        });
        return () => unsubscribeSnapshot();
      } else {
        setUserDetails(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      localStorage.removeItem("user"); // Remove user from local storage
      Cookies.remove("token"); // Remove authentication token
      console.log("User logged out successfully");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {userDetails ? (
        <>
          <h3>Welcome {userDetails.name}</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>Name: {userDetails.name}</p>
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AccountDetails;
