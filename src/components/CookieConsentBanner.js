import React, { useState, useEffect } from 'react';

function CookieConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const consent = localStorage.getItem('cookieConsent');
      // The banner is visible if there's no recorded consent or rejection.
      setIsVisible(consent === null);
    }, []);
  
    const handleAccept = () => {
      localStorage.setItem('cookieConsent', 'accepted');
      setIsVisible(false);
    };
  
    const handleReject = () => {
      localStorage.setItem('cookieConsent', 'rejected');
      setIsVisible(false);
      // Here you can trigger any logic to disable non-essential cookies.
    };
  
    if (!isVisible) {
      return null;
    }

  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', padding: '20px', textAlign: 'center', zIndex: '20000' }}>
      <p style={{ marginTop: '0' }}>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. Learn more about our <a href="/cookie-policy">Cookie Policy</a></p>
      <button onClick={handleAccept} className='btn-green-alt'>Accept</button>
      <button onClick={handleReject} className='btn-green-alt' style={{ marginLeft: '10px' }}>Reject</button>
    </div>
  );
}

export default CookieConsentBanner;
