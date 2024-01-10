// UserInfo.js
import React from 'react';

const UserInfo = ({ username, id, onLogout }) => {
  const userInfoStyle = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
  };

  return (
    <div style={userInfoStyle}>
      <p>Logged in as: {username}</p>
      <p>ID: {id}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserInfo;
