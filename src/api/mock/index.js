import users from './data/users.json';
import songs from './data/songs.json';
import lists from './data/listsInfo.json';
import albums from './data/albumsInfo.json';
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
   * Fetches all songs in the mock data
   * @param  {Number}  id The id of a list
   * @return {Object}  An object containing all songs in a given list of ID equals to id
   */
  async fetchSongs(id) {
    const allSongs = await fetch(songs, 500);
    return allSongs[id];
  },
  /**
   * Fetches a list from the mock data
   * @param  {Number}  id The id of the desired list
   * @return {Object} An object containing all information about the list of ID equals to id
   */
  async fetchList(id) {
    const allLists = await fetch(lists, 1000);
    for (let i = 0; i < allLists.length; i += 1) {
      if (allLists[i].id === id) {
        return allLists[i];
      }
    }
    return {};
  },
  /**
   * Fetches an album from the mock data
   * @param  {Number}  id The id of the desired album
   * @return {Object} An object containing all information about the album of ID equals to id
   */
  async fetchAlbum(id) {
    const allAlbums = await fetch(albums, 1000);
    for (let i = 0; i < allAlbums.length; i += 1) {
      for (let j = 0; j < allAlbums[i].items.length; j += 1) {
        if (allAlbums[i].items[j].album.id === id) {
          return allAlbums[i].items[j].album;
        }
      }
    }
    return {};
  },
};
