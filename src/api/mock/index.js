import users from './data/users.json';

const fetch = (mockData, time = 0) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockData);
  }, time);
});

export default {
  fetchUsers() {
    return fetch(users, 1000);
  },
};
