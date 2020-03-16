import axios from 'axios';

// HmanA6399: Please use this whenever you want to communicate with the server
import api from '../../common/config';

export default {
  fetchUsers() {
    // TODO[@XL3]: Replace this with our server
    return axios.get(api).then((response) => response.data);
  },
  fetchSongs() {
    // TODO[Naiera]: Replace this with our server
    return axios.get(api).then((response) => response.data);
  },
};
