import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth } from './firebase'; // Assuming you've exported the Firebase auth instance from your firebase.js file
import Navbar from './components/navbar';
import About from './components/about';
import Home from './components/home';
import Contact from './pages/contact';
import Recruiting from './pages/recruiting';
import SignUpAndLogin from './components/SignUpAndLogin';
import Profile from './components/profile';
import Footer from './components/footer';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("auth changed 1", user);
       // setUser(user);
      } else {
        console.log("auth changed 2", user);
        //setUser(null);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar user={user} /> {/* Pass user state to Navbar */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/recruiting" element={<Recruiting />} />
          <Route path="/login" element={<SignUpAndLogin />} />
          <Route path="/profile" element={<Profile user={user} />} /> {/* Pass user state to Profile */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
