import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, message, Modal } from 'antd';
import UserList from './components/userList';
import UserForm from './components/userForm';
import { Header } from 'antd/es/layout/layout';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    const updatedUser = {
      ...user,
      address: user.address.street + " " + user.address.suite + " " + user.address.city + " " + user.address.zipcode,
      company: user.company.name
    };
    setSelectedUser(updatedUser);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App">
      <Header style={{ background: '#535b80', borderRadius: '10px' }}>
        <h2 style={{ color: '#FFF', margin: '0px' }}>User Management Dashboard</h2>
      </Header>

      <UserList
        key={refreshKey}
        onEdit={handleEdit}
        onAdd={handleAdd}
      />
      <Button onClick={() => {
        message.error("er")
        alert("jj")
      }} >Hit</Button>
      <Modal
        title={selectedUser ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <UserForm
          user={selectedUser}
          onClose={handleModalClose}
          onRefresh={handleRefresh}
        />
      </Modal>
    </div>
  );
}

export default App;