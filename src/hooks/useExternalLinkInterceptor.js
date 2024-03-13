// src/hooks/useExternalLinkInterceptor.js
import { useState, useEffect } from 'react';

const useExternalLinkInterceptor = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const handleConfirm = () => {
    window.open(currentUrl, '_blank');
    setShowModal(false);  // Hide the modal after confirming
  };

  useEffect(() => {
    const handleDocumentClick = event => {
      let target = event.target;
      while (target && target.tagName !== 'A') {
        target = target.parentNode;
      }

      if (target && target.hostname && target.hostname !== window.location.hostname) {
        event.preventDefault();
        setCurrentUrl(target.href);
        setShowModal(true);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return { showModal, handleConfirm, setShowModal };
};

export default useExternalLinkInterceptor;