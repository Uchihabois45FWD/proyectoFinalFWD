import React, { useEffect, useState } from 'react';
import '../../styles/WelcomeNotification.css';

const WelcomeNotification = ({ userName, onClose }) => {
  // Estado para controlar la visibilidad de la notificación
  const [isVisible, setIsVisible] = useState(true);
  // Estado para activar la animación de desaparición
  const [isDisappearing, setIsDisappearing] = useState(false);

  useEffect(() => {
    // Ocultar automáticamente después de 5 segundos con animación de deslizamiento
    const timer = setTimeout(() => {
      setIsDisappearing(true);
      // Esperar a que la animación se complete antes de ocultar
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 500); // Animation duration
    }, 5000); // Display duration

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    // Activar la animación de desaparición cuando se hace clic en el botón de cerrar
    setIsDisappearing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 500); // Animation duration
  };

  if (!isVisible) return null;

  return (
    <div className="welcome-notification-overlay">
      <div className="welcome-notification">
        <div className="notification-content">
          <div className="notification-icon">🎉</div>
          <div className="notification-text">
            <h3>¡Bienvenido!</h3>
            <p>Hola <span className="user-name">{userName}</span>, has iniciado sesión correctamente.</p>
          </div>
          <button className="notification-close" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="notification-progress"></div>
      </div>
    </div>
  );
};

export default WelcomeNotification;
