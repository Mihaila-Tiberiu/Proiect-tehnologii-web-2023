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
    background: 'none',
    color: 'blue',
    textDecoration: 'underline',
  };

  return (
    <div style={userInfoStyle}>
      <p style={userInfoTextStyle}>Logged in as: {username} ----- ID: {id}</p>
      <button style={logoutButtonStyle} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
