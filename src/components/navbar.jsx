import React, { useEffect, useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import { auth } from "../firebase"; // Import Firebase auth

function Navbar() {
  const [userName, setUserName] = useState(""); // State to store the user's name

  useEffect(() => {
    // Use Firebase auth's onAuthStateChanged method to listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If a user is logged in, fetch user display name from Firebase authentication
        user
          .getIdTokenResult()
          .then((idTokenResult) => {
            // Check if the displayName claim is available
            const displayName = idTokenResult.claims.displayName;
            // Set the userName state based on the displayName claim, or fallback to "User" if not available
            setUserName(displayName || "User");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // If no user is logged in, set the user's name to an empty string
        setUserName("");
      }
    });

    // Clean up function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      // Redirect the user to the home page after logout
      window.location.href = "/home";
    });
  };

  return (
    <nav className="navbar">
      <NavLink to="/home" className="logo">
        <i className="fa-solid fa-skull skull-icon"></i> Teamshot
      </NavLink>

      <ul className="nav-links">
        <li>
          <i className="fa-solid fa-person-military-rifle"></i>
          <NavLink to="/recruiting" className="nav-link">
            Recruiting
          </NavLink>
        </li>
        <li>
          <i className="fa-solid fa-book-open"></i>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </li>
        <li>
          <i className="fa-regular fa-envelope"></i>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </li>
      </ul>
      
      <div className="nav-right">
        {userName ? ( // If user is logged in, display user name and logout dropdown
          <div className="user-dropdown">
            <NavLink to="/profile" className="username">
              <span className="username">{userName}</span>
            </NavLink>
            <div className="dropdown-content">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          // If user is not logged in, display login/signup link
          <NavLink to="/login" className="nav-link login">
            <i className="fa-solid fa-user"></i>
            Login/Sign Up
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;










