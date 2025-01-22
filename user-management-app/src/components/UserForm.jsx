import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, selectedUser , buttonColor }) => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    company: { name: '' },
  });

  useEffect(() => {
    if (selectedUser) {
      setUserData({
        name: selectedUser.name,
        username: selectedUser.username,
        email: selectedUser.email,
        company: { name: selectedUser.company.name },
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setUserData((prevData) => ({
        ...prevData,
        [parentKey]: {
          ...prevData[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);

    setUserData({
      name: '',
      username: '',
      email: '',
      company: { name: '' },
    });
  };

  return (
    <div>
      <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <label>Department</label>
        <input
          type="text"
          name="company.name"
          value={userData.company.name}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <button className="user" type="submit" 
         style={{ backgroundColor: buttonColor, color: 'white' }}
        >{selectedUser ? 'Update User' : 'Add User'}</button>
       
      </form>
    </div>
  );
};

export default UserForm;
