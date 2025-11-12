import React from "react";
import "../styles/loginPage.css";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="login-page">
      <Navbar />
      <h1>Bienvenido al Centro Cívico La Capri</h1>
      <LoginForm />
    </div>
  );
}
