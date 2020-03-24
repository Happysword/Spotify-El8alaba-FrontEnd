import axios from 'axios';

// HmanA6399: Please use this whenever you want to communicate with the server
import api from '../../common/config';

export default {
  fetchUsers() {
    // TODO[@XL3]: Replace this with our server
    return axios.get(api).then((response) => response.data);
  },

  // TODO[@Seif]: Check for status and Add Tokens for ALL and check if device Id is needed
  /**
   * Get the User's Currently Playing Track
   * @return {Object} An Object Containing info about the User's Current Playing Track
   */
  async fetchCurrentSong() {
    return axios
      .get(`${api}/api/v1/me/player/currently-playing `)
      .then((response) => response.data);
  },

  /**
   * Get the User's Current playback info
   * @return {Object} An Object Containing info about the User's Current playback
   */
  async fetchCurrentPlayback() {
    return axios
      .get(`${api}/api/v1/me/player`)
      .then((response) => response.data);
  },


  /**
   * Pause a User's Playback
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async pausePlayback() {
    return axios
      .put(`${api}/api/v1/me/player/pause`)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Start/Resume a User's Playback
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async startPlayback() {
    return axios
      .put(`${api}/api/v1/me/player/play`)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Skip User’s Playback To Next Track
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async skipNext() {
    return axios
      .post(`${api}/api/v1/me/player/next`)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Skip User’s Playback To Previous Track
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async skipPrevious() {
    return axios
      .post(`${api}/api/v1/me/player/previous`)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Toggle Shuffle For User’s Playback
   * @param {Boolean} state a Boolean containing the state wanted of shuffle
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async toggleShuffle(state) {
    return axios
      .put(`${api}/api/v1/me/player/shuffle?state=${state}`)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Set Repeat Mode On User’s Playback
   * @param {object} state track, context or off. track: will repeat the current track.
   * context: will repeat the current context. off: will turn repeat off.
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async toggleRepeat(state) {
    return axios
      .put(`${api}/api/v1/me/player/repeat?state=${state}`)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Seek To Position In Currently Playing Track
   * @param {Number} position_ms Number of milliseconds to seek to
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async seekPosition(positionMs) {
    return axios
      .put(`${api}/api/v1/me/player/repeat?seek=${positionMs}`)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Set Volume For User's Playback
   * @param {Number} volumePercent the Volume percentage wanted from the player
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async setVolume(volumePercent) {
    return axios
      .put(`${api}/api/v1/me/player/repeat?seek=${volumePercent}`)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },
  fetchCurrentUserAlbum() {
    // TODO[@ahmedx3]: Replace this with our server
    return axios.get(api).then((response) => response.data);
  },
  fetchCurrentUserPlaylists() {
    // TODO[@ahmedx3]: Replace this with our server
    return axios.get(api).then((response) => response.data);
  },
  fetchCurrentUserArtists() {
    // TODO[@ahmedx3]: Replace this with our server
    return axios.get(api).then((response) => response.data);
  },
  fetchAnArtist() {
    // TODO[@ahmedx3]: Replace this with our server
    return axios.get(api).then((response) => response.data);
  },
  fetchArtistRelatedArtists() {
    // TODO[@ahmedx3]: Replace this with our server
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
  /**
   * Gets all categories (genres)
   * @return {object} an object containing all the genres
   */
  async fetchGenres() {
    return axios
      .get(`${api}/v1/browse/categories`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
  /**
   * Fetch a specific genre in the mock data
   * @param {string} id a string that contains the id of the genre
   * @return {object} an object containing necessary data about genre
   */
  async fetchGenre(id) {
    return axios
      .get(`${api}/v1/browse/categories/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
  /**
   * Fetches all playlists related to a specific Category
   * @param {string} id string that contains the id of the category
   * @return {Array} an Array containing all playlists
   */
  async fetchCategoryPlaylists(id) {
    return axios
      .get(`${api}/v1/categories/${id}/playlists?country=EG&limit=20&offset=0`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
  /**
 * Fetch related data to the user input for search
 * @param {string} x a string that contains the data the user search for
 * @return {object} an aboject that may have related data to user search
 */
  async fetchSearch(x) {
    let z = 'track,artist,album,playlist';
    if (x.includes('track')) {
      z = 'track';
    }
    if (x.includes('artist')) {
      if (z === 'track,artist,album,playlist') {
        z = 'artist';
      } else {
        z += ',artist';
      }
    }
    if (x.includes('album')) {
      if (z === 'track,artist,album,playlist') {
        z = 'album';
      } else {
        z += ',album';
      }
    }
    if (x.includes('playlist')) {
      if (z === 'track,artist,album,playlist') {
        z = 'playlist';
      } else {
        z += ',playlist';
      }
    }
    return axios
      .get(`${api}/v1/search?q=${x}&type=${z}&limit=6&offset=0`)
      .catch((error) => console.log(error));
  },
};
