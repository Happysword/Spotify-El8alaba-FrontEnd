import axios from 'axios';

export default {
  fetchUsers() {
  // TODO[@XL3]: Replace this with our server
    return axios
      .get('')
      .then((response) => response.data);
  },
};
