// TODO[@XL3]: Add the Import Resolver
// import client from 'api-client';
import client from '@/api/mock';

export default {
  /**
   * Fetches all users then returns an object containing the user's data.
   * If the user isn't found, the returned object is { false, null }.
   * @param  {String} username The Username to match against
   * @param  {String} password The Password to match against
   * @return {Object}          The User's data
   */
  authenticateUser(username, password) {
    // Fetch the user
    let found = false;
    let data = null;

    return new Promise((resolve) => {
      client.fetchUsers()
        .then((users) => {
          // some instead of forEach for breaking on a true
          users.some((user) => {
            // TODO[@XL3]: Add password checking
            if (user.username === username && user.password === password) {
              found = true;
              data = user;
            }
            // Breaking condition
            return user.username === username && user.password === password;
          });

          // Return found data
          resolve({ found, data });
        });
    });
  },
};
