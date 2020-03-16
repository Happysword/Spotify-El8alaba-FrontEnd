import axios from 'axios';

// HmanA6399: Please use this whenever you want to communicate with the server
import api from '../../common/config';

export default {
  fetchUsers() {
    // TODO[@XL3]: Replace this with our server
    return axios.get(api).then((response) => response.data);
  },

  /**
   * Sends a POST request to the server to login the user
   * @param  {Object} body The user's credentials
   * @return {Object}      The corresponding response
   */
  async loginUser(body) {
    const response = await axios.post(`${api}/api/v1/authentication/login`, body)
      .then((res) => res)
      .catch((err) => console.log(err));

    return response;
  },

  /**
   * Sends a POST request to the server to signup the user
   * @param  {Object} body The user's signup data
   * @return {Object}      The corresponding response
   */
  async signupUser(body) {
    const response = await axios.post(`${api}/api/v1/authentication/signup`, body)
      .then((res) => res)
      .catch((err) => console.log(err));

    return response;
  },
};
