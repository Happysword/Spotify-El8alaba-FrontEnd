import users from './data/users.json';

/**
 * Fetches mock data after a given timeout.
 * @param  {JSON}   mockData The Object containing the data
 * @param  {Number} time     The amount in seconds to timeout
 * @return {Promise}         A promise containing the mockData
 */
const fetch = (mockData, time = 0) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockData);
  }, time);
});

export default {
  /**
   * Fetches all users in the mock data
   * @return {Promise} A promise containing all users
   */
  fetchUsers() {
    return fetch(users, 1000);
  },

  /**
   * Fetches all users in the mock data and matches them against a single user
   * @param  {Object} body The user's credentials
   * @return {Object}      The corresponding response
   */
  async loginUser(body) {
    // Get all users
    const allUsers = await fetch(users, 1000);

    // Search all users for our user
    let found = false;
    allUsers.some((user) => {
      if (user.email === body.email && user.password === body.password) {
        found = true;
      }
      // Breaking condition
      return user.email === body.email && user.password === body.password;
    });

    // Succeed if the user is found
    return {
      status: found ? 'success' : '400 Bad Request',
      token: '',
      data: {},
    };
  },

  /**
   * Fetches all users in the mock data and ensures that a certain user isn't among them
   * @param  {Object} body The user's signup data
   * @return {Object}      The corresponding response
   */
  async signupUser(body) {
    // Get all users
    const allUsers = await fetch(users, 1000);

    // Search all users for our user
    let found = false;
    allUsers.some((user) => {
      if (user.email === body.email) {
        found = true;
      }
      // Breaking condition
      return user.email === body.email;
    });

    // Succeed if the user isn't found
    return {
      status: !found ? 'success' : '400 Bad Request',
      token: '',
      data: {},
    };
  },
};
