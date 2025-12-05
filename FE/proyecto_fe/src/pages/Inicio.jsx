import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";
import LoginForm from "../components/Login y Register/LoginForm";
import "../styles/loginPage.css";

const Inicio = () => {
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

export default Inicio;




