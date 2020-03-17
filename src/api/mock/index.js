import users from './data/users.json';
import currentUserAlbum from './data/Get-Current-User-Album.json';
import currentUserPlaylists from './data/Get-Current-User-Playlists.json';
import currentUserArtists from './data/Get-User-Followed-Artists.json';
import getAnArtist from './data/Get-An-Artist.json';
import getArtistRelatedArtists from './data/Get-Artist-Related-Artists.json';


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
  fetchCurrentUserAlbum() {
    return fetch(currentUserAlbum, 100);
  },
  fetchCurrentUserPlaylists() {
    return fetch(currentUserPlaylists, 100);
  },
  fetchCurrentUserArtists() {
    return fetch(currentUserArtists, 100);
  },
  fetchAnArtist() {
    return fetch(getAnArtist, 100);
  },
  fetchArtistRelatedArtists() {
    return fetch(getArtistRelatedArtists, 100);
  },
};
