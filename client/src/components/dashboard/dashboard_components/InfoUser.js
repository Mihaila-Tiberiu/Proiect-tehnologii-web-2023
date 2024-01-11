// UserInfo.js
import React from 'react';

const UserInfo = ({ username, id, onLogout }) => {
  const userInfoStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    padding: '10px',
    background: '#f8f8f8',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  
  };

  const userInfoTextStyle = {
    margin: '0',
  };

  const logoutButtonStyle = {
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px', 
    background: 'blue',
    color: 'white',
    padding: '8px 15px',
    textDecoration: 'none',
    fontSize: '14px',
  };


  return (
    <div style={userInfoStyle}>
      <p style={userInfoTextStyle}>Sunteți autentificat ca: {username}  {'-->'} ID: {id}</p>
      <button style={logoutButtonStyle} onClick={onLogout}>
        Deconectare
      </button>
    </div>
  );
};

export default UserInfo;
