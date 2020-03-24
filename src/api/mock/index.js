import users from './data/users.json';
import currentSong from './data/MusicPlayer/currentSong.json';
import currentPlayback from './data/MusicPlayer/currentPlayback.json';
import genres from './data/genres.json';
import currentUserAlbum from './data/Get-Current-User-Album.json';
import currentUserPlaylists from './data/Get-Current-User-Playlists.json';
import currentUserArtists from './data/Get-User-Followed-Artists.json';
import getAnArtist from './data/Get-An-Artist.json';
import getArtistRelatedArtists from './data/Get-Artist-Related-Artists.json';
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
    return fetch(users, 50);
  },

  /**
   * Fetches all users in the mock data and matches them against a single user
   * @param  {Object} body The user's credentials
   * @return {Object}      The corresponding response
   */
  async loginUser(body) {
    // Get all users
    const allUsers = await fetch(users, 50);

    // Search all users for our user
    let found = false;
    allUsers.some((user) => {
      if (user.email === body.email && user.password === body.password) {
        found = true;
      }
      // Breaking condition
      return user.email === body.email && user.password === body.password;
    });

    // Succeed if the user is found
    return {
      status: found ? 200 : 400,
      token: '',
      data: {},
    };
  },

  /**
   * Fetches all users in the mock data and ensures that a certain user isn't among them
   * @param  {Object} body The user's signup data
   * @return {Object}      The corresponding response
   */
  async signupUser(body) {
    // Get all users
    const allUsers = await fetch(users, 50);

    // Search all users for our user
    let found = false;
    allUsers.some((user) => {
      if (user.email === body.email) {
        found = true;
      }
      // Breaking condition
      return user.email === body.email;
    });

    // Succeed if the user isn't found
    return {
      status: !found ? 200 : 400,
      token: '',
      data: {},
    };
  },

  /**
   * Fetches all users in the mock data and ensures that a certain user is among them
   * @param  {Object} body The user's signup data
   * @return {Object}      The corresponding response
   */
  async forgotPassword(body) {
    // Get all users
    const allUsers = await fetch(users, 50);

    // Search all users for our user
    let found = false;
    allUsers.some((user) => {
      if (user.email === body.email) {
        found = true;
      }
      // Breaking condition
      return user.email === body.email;
    });

    // Succeed if the user is found
    return { status: found ? 200 : 400 };
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
    if (positionMs >= 0) {
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
    if (volumePercent >= 0) {
      return fetch(true, 1000).then((Promisedata) => Promisedata);
    }
    return false;
  },
  fetchGenres() {
    return fetch(genres, 1000);
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
