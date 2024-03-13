// src/components/ConfirmationModal.js
import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className='top'><h3 className='green'>Leaving CCBank</h3></div>
        <div className='modal-main-content'>
            <p>Please note that by clicking "Proceed" below, you will leave CCBank's website. CCBank down not own or operate this website and thus cannot ensure its content. We recommend you review the business's information collection policy or terms and conditions to fully understand what information is collected by this website. If you wish to continue to the website please click "Proceed" below.</p>
            <button onClick={onConfirm}>Proceed</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;