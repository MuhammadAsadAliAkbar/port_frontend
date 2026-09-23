import { useState, useEffect } from 'react'
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Achievements from "../components/Achievements";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Education from "../components/Education";
import Footers from "../components/Footers";
import Knowledge from "../components/Knowledge";
import Chatbot from "../components/Chatbot";
import ClientAchievements from '../components/ClientAchievements'
import MessageChat from "../components/MessageChat";
import LoginPopup from '../components/Login'
import SignupPopup from '../components/SignupPopup'
import GoogleMapPremium from '../components/GoogleMapPremium'
import Navbar from '../components/Navbar'

function PortfolioHome() {
     const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");

      const token =
        localStorage.getItem("authToken") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      if (savedUser && token) {
        return JSON.parse(savedUser);
      }

      return null;
    } catch (error) {
      console.error("User load error:", error);
      return null;
    }
  });

  // Login / Logout ke baad role ko immediately update karega
  useEffect(() => {
    const handleAuthSuccess = (event) => {
      if (event.detail) {
        setUser(event.detail);
      } else {
        try {
          const savedUser = localStorage.getItem("user");

          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        } catch (error) {
          console.error("Auth user parse error:", error);
        }
      }
    };

    const handleAuthLogout = () => {
      setUser(null);
    };

    window.addEventListener("auth-success", handleAuthSuccess);
    window.addEventListener("auth-logout", handleAuthLogout);

    return () => {
      window.removeEventListener("auth-success", handleAuthSuccess);
      window.removeEventListener("auth-logout", handleAuthLogout);
    };
  }, []);

  const isAdmin = user?.role?.toLowerCase() === "admin";
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Knowledge />
                <Projects />
                <Experience />
                <Achievements />
                <Testimonials />
                <ClientAchievements />
                <Education />
                <GoogleMapPremium />
                <Contact />
            </main>
            <Footers />
            <Chatbot />
             {!isAdmin && <MessageChat />}
            <LoginPopup />
            <SignupPopup />
            {/* <Footer /> */}
        </>

    )
}


export default PortfolioHome