// src/components/PasswordProtected.js
import React, { useState } from 'react';

const PasswordProtected = ({ children }) => {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);

  const correctPassword = 'I@mCCB@nk!~'; // Replace with your desired password

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword === correctPassword) {
      setAccessGranted(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className='container mg-top-50 mg-bottom-50'>
        <h2>Enter the password to view this page</h2>
      {accessGranted ? (
        children
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PasswordProtected;
