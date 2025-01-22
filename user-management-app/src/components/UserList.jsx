import React from 'react';

const UserList=({ users, onEdit, onDelete })=>{
  const handleEdit=(user)=>{
    onEdit(user);
  };

  const handleDelete = (userId)=>{
    onDelete((prevUsers)=>prevUsers.filter(user=>user.id!==userId));
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=>(
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <button  className='edit'  onClick={()=>handleEdit(user)}>Edit</button>
                <button className='delete'  onClick={()=>handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
