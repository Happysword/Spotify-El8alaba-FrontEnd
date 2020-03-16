import users from './data/users.json';
import currentSong from './data/MusicPlayer/currentSong.json';
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
   * @return {Promise} A promise containing info about current Track
   */
  fetchCurrentSong() {
    return fetch(currentSong[0], 1000);
  },
};
