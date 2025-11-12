import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import "../styles/loginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <Navbar />
      <main className="login-container">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
