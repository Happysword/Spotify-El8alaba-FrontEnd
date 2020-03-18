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
};
