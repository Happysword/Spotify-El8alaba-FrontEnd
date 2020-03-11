// import client from 'api-client';
// TODO[@XL3]: Add the import resolver
import client from '@/api/mock/';

export default {
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
