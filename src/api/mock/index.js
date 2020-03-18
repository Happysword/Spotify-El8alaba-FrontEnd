import users from './data/users.json';
import currentSong from './data/MusicPlayer/currentSong.json';
import currentPlayback from './data/MusicPlayer/currentPlayback.json';
import genres from './data/genres.json';

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
   * Fetches Current Song in the mock data
   * @return {Object} An object containing info about current Track
   */
  fetchCurrentSong() {
    return fetch(currentSong[0], 1000).then((Promisedata) => Promisedata);
  },

  /**
   * Get the User's Current playback info
   * @return {Object} An Object Containing info about the User's Current playback
   */
  async fetchCurrentPlayback() {
    return fetch(currentPlayback[0], 1000).then((Promisedata) => Promisedata);
  },

  /**
   * Pause a User's Playback
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async pausePlayback() {
    return fetch(true, 1000).then((Promisedata) => Promisedata);
  },

  /**
   * Start/Resume a User's Playback
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async startPlayback() {
    return fetch(true, 1000).then((Promisedata) => Promisedata);
  },

  /**
   * Skip User’s Playback To Next Track
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async skipNext() {
    return fetch(true, 1000).then((Promisedata) => Promisedata);
  },

  /**
   * Skip User’s Playback To Previous Track
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async skipPrevious() {
    return fetch(true, 1000).then((Promisedata) => Promisedata);
  },

  /**
   * Toggle Shuffle For User’s Playback
   * @param {Boolean} state a Boolean containing the state wanted of shuffle
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async toggleShuffle(state) {
    const dummytrue = state || true; // for mocking purposes of matching the server api
    return fetch(dummytrue, 1000).then((Promisedata) => Promisedata);
  },

  /**
   * Set Repeat Mode On User’s Playback
   * @param {object} state track, context or off. track: will repeat the current track.
   * context: will repeat the current context. off: will turn repeat off.
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async toggleRepeat(state) {
    if (state === 'track' || state === 'off' || state === 'context') {
      return fetch(true, 1000).then((Promisedata) => Promisedata);
    }
    return false;
  },

  /**
   * Seek To Position In Currently Playing Track
   * @param {Number} position_ms Number of milliseconds to seek to
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async seekPosition(positionMs) {
    if (positionMs > 0) {
      return fetch(true, 1000).then((Promisedata) => Promisedata);
    }
    return false;
  },

  /**
   * Set Volume For User's Playback
   * @param {Number} volumePercent the Volume percentage wanted from the player
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async setVolume(volumePercent) {
    if (volumePercent > 0) {
      return fetch(true, 1000).then((Promisedata) => Promisedata);
    }
    return false;
  },
  fetchGenres() {
    return fetch(genres, 1000);
  },
};
