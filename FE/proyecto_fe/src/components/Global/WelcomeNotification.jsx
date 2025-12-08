import React, { useEffect, useState } from 'react';
import '../../styles/WelcomeNotification.css';

const WelcomeNotification = ({ userName, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
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
