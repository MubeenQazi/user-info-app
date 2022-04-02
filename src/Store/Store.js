import axios from 'axios';
export const createUserStore = () => {
  return {
    users: [], //initial state
    getUsers() {
      const users = axios.get(`/users`);
      return users;
    },

    getUser(userId) {
      const user = axios.get(`/users/${userId}`);

      return user;
    },
    updateUser(userId, userObj) {
      const updatedUsersArr = axios.put(`/users/${userId}`, userObj);
      return updatedUsersArr;
    },
    addUser(userObj) {
      const user = axios.post(`/users`, userObj);
      const updatedUsersArr = this.users.push(user);
      return updatedUsersArr;
    },
  };
};
