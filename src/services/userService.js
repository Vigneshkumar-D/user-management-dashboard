import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

const UserService = {
  
  getAllUsers: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  addUser: async (user) => {
    try {
      const response = await axios.post(BASE_URL, user);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  updateUser: async (userId, user) => {
    try {
      const response = await axios.put(`${BASE_URL}/${userId}`, user);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      await axios.delete(`${BASE_URL}/${userId}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

export default UserService;
