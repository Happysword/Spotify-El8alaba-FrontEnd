import axios from 'axios';

// HmanA6399: Please use this whenever you want to communicate with the server
import api from '../../common/config';

export default {
  fetchUsers() {
    // TODO[@XL3]: Replace this with our server
    return axios.get(api).then((response) => response.data);
  },
  async fetchSongs(id) {
    const songs = await axios.get(`${api}v1/playlists/${id}/tracks?fields=&limit=&offset=`)
      .then((response) => response);
    return songs;
  },

  async fetchList(id) {
    const lists = await axios.get(`${api}v1/playlists/${id}?fields=name`)
      .then((response) => response);
    return lists;
  },

  async fetchListCover(id) {
    const img = await axios.get(`${api}v1/playlists/${id}/images`)
      .then((response) => response);
    return img;
  },


};
