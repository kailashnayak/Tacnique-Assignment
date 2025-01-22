import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [users, setUsers]=useState([]);
  const [selectedUser, setSelectedUser]=useState(null);
  const [error, setError]=useState(null);
  const [currentPage, setCurrentPage]=useState(1); 
  const [usersPerPage]=useState(5);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => {
        setError('Failed to fetch users');
        console.error(err);
      });
  }, []);

  // Add
  const addUser=(user)=>{
    axios.post('https://jsonplaceholder.typicode.com/users',user)
      .then(response=>{
        setUsers([...users, response.data]);
      })
      .catch(err=>{
        setError('Failed to add user');
        console.error(err);
      });
  };

  // Edit
  const editUser=(id, updatedUser)=>{
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updatedUser)
      .then(response=>{
        setUsers(users.map(user=>user.id===id ? response.data:user));
        setSelectedUser(null);
      })
      .catch(err=>{
        setError('Failed to update user');
        console.error(err);
      });
  };
 
  const indexOfLastUser=currentPage * usersPerPage;
  const indexOfFirstUser=indexOfLastUser - usersPerPage;
  const currentUsers=users.slice(indexOfFirstUser, indexOfLastUser);


  const paginate=(pageNumber)=>setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>User Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="main-container">
       
        <div className="form-container">
          <UserForm
            onSubmit={selectedUser ? (updatedUser)=>editUser(selectedUser.id,updatedUser) : addUser}
            selectedUser={selectedUser}
            buttonColor={selectedUser ? 'blue':'green'}
          />
        </div>

        <div className="list-container">
          <UserList
            users={currentUsers} 
            onEdit={setSelectedUser}
            onDelete={setUsers}
          />
          
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage-1)}
              disabled={currentPage===1}
            >
              Previous
            </button>
            <button
              onClick={()=>paginate(currentPage+1)}
              disabled={currentPage * usersPerPage>=users.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
