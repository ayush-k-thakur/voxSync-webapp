import React, { use, useEffect, useState } from "react";
import { auth, db } from "../../constants/firebase";
import { doc, getDoc } from "firebase/firestore";
// import { toast } from "react-toastify";
function AccountDetails() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        if(userSnap.exists()){
          setUserDetails(userSnap.data());
        }
      }
    });
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("user logged out successfully");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div>
      {" "}
      {userDetails ? (
        <>
          {" "}
          <h3>Welcome {userDetails.name} </h3>{" "}
          <div>
            {" "}
            <p>Email: {userDetails.email}</p>{" "}
            <p>Name: {userDetails.name}</p>{" "}
          </div>{" "}
          <button className="btn btn-primary" onClick={handleLogout}> Logout </button>{" "}
        </>
      ) : (
        <p>Loading...</p>
      )}{" "}
    </div>
  );
}
export default AccountDetails;
