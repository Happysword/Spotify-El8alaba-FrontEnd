/* eslint-disable consistent-return */
import cookies from '@/store/modules/auth/cookies';
import users from './data/users.json';
import currentSong from './data/MusicPlayer/currentSong.json';
import currentPlayback from './data/MusicPlayer/currentPlayback.json';
import genres from './data/genres.json';
import PrefGenres from './data/PrefGenres.json';
import currentUserAlbum from './data/Get-Current-User-Album.json';
import currentUserPlaylists from './data/Get-Current-User-Playlists.json';
import currentUserArtists from './data/Get-User-Followed-Artists.json';
import getAnArtist from './data/Get-An-Artist.json';
import getArtistRelatedArtists from './data/Get-Artist-Related-Artists.json';
import lists from './data/listsInfo.json';
import albums from './data/albumsInfo.json';
import Boolean from './data/Boolean.json';
import playlistSongs from './data/playlistSongs.json';
import genresPlaylists1 from './data/Genres-Playlists.json';
import genresPlaylists2 from './data/Genres-Playlists2.json';
import genresPlaylists3 from './data/Genres-Playlists3.json';
import search from './data/Search.json';
import getaUsersProfile from './data/Get-A-Users-Profile.json';
import getArtistTopTracks from './data/Get-Artist-Top-Traks.json';
import getArtistAlbums from './data/Get-Artist-Albums.json';
import getArtistAlbum from './data/Get-Artist-Album.json';

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
/**
 * @module
 * Mock Requests
 */
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
    let user = {};

    allUsers.some((u) => {
      if (u.user.email === body.email && u.password === body.password) {
        found = true;
        user = u.user;
        // Set the loggedIn cookie
        const expiryDate = new Date(Date.now() + 90 * (24 * 60 * 60 * 1000));
        document.cookie = `loggedIn=true; expires=${expiryDate.toUTCString()}; path=/;`;
      }
      // Breaking condition
      return u.user.email === body.email && u.password === body.password;
    });

    // Succeed if the user is found
    return {
      status: found ? 200 : 400,
      data: found
        ? { token: 'mock_token', data: { user } }
        : { message: 'Error. Something went wrong.' },
    };
  },

  /**
   * Removes the current user's data
   * @return {Object} The corresponding response
   */
  async logoutUser() {
    // Remove the current user
    // Remove all cookies
    cookies.clearData(['currentUser'], ['loggedIn']);
    return { status: 200 };
  },

  /**
   * Returns a mock token
   * @return {Object} The corresponding response
   */
  async fetchToken() {
    const data = await fetch({ token: 'mock_token' }, 50);
    return { status: 200, data };
  },

  /**
   * Check if Current User Follows Artists or Users
   * @param {String} ids IDs of artists or user which current user follows
   */
  async ifCurrentUserFollowsArtistsOrUsers(ids, token) {
    console.log(ids + token);
    return fetch(Boolean, 100);
  },
  /**
   * Check if Users Follows a playlist
   * @param {String} userID ID of current user
   * @param {String} playlistID ID of certain playlist
   * @param {String} token Token of current user
   */
  async ifUsersFollowsaPlaylist(userID, playlistID, token) {
    console.log(userID + playlistID + token);
    return fetch(Boolean, 100);
  },


  /**
   * Follow a playlist
   * @param {String} playlistID ID of certain playlist
   * @param {String} token Token of current user
   */
  async followaPlaylist(playlistID, token) {
    console.log(playlistID + token);
  },

  /**
   * unFollow a playlist
   * @param {String} playlistID ID of certain playlist
   * @param {String} token Token of current user
   */
  async UnfollowaPlaylist(playlistID, token) {
    console.log(playlistID + token);
  },

  /**
   * Check if Users Follows an Album
   * @param {String} albumID ID of current album
   * @param {String} token Token of current user
   */
  async ifUserFollowsAlbums(albumID, token) {
    console.log(albumID + token);
    return fetch(Boolean, 100);
  },

  /**
   * Save an album for current user
   * @param {String} albumID ID of album
   * @param {String} token Token of current user
   */
  async saveAlbumsForCurrentUser(albumsID, token) {
    console.log(albumsID, token);
  },

  /* istanbul ignore next */
  /**
   * Delete an album for current user
   * @param {String} albumID ID of album
   * @param {String} token Token of current user
   */
  async deleteAlbumsForCurrentUser(albumsID, token) {
    console.log(albumsID, token);
  },

  /**
   * Follow Artists or Users
   * @param {String} ids IDs of artists or Users to follow
   */
  async followArtistsOrUsers(ids, token) {
    console.log(ids + token);
  },

  /**
   * UnFollow Artists or Users
   * @param {String} ids IDs of artists or Users to Unfollow
   */
  async unfollowArtistsOrUsers(ids, token) {
    console.log(ids + token);
  },

  /**
 * Creates a new playlists
 * @param {OBJECT} createdPlaylist The created playlist object
 */
  async createNewPlayList(createdPlaylist, token) {
    console.log(token);
    console.log(createdPlaylist);
  },

  /**
   * Creates a new Album
   * @param {Object} createdAlbum The Created Album object
   * @param {string} token The token of the user
   */
  async createNewAlbum(createdAlbum, token) {
    console.log(createdAlbum);
    console.log(token);
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
    let user = {};

    allUsers.some((u) => {
      if (u.user.email === body.email) {
        found = true;
      }
      // Breaking condition
      return u.user.email === body.email;
    });

    if (!found) {
      // Set the loggedIn cookie
      const expiryDate = new Date(Date.now() + 90 * (24 * 60 * 60 * 1000));
      document.cookie = `loggedIn=true; expires=${expiryDate.toUTCString()}; path=/;`;

      // Add the user data to the mock database
      user = {
        type: 'user',
        product: 'free',
        image: null,
        currentlyPlaying: null,
        followers: null,
        _id: '5e6b95fda1903935ccb355a3',
        name: body.name,
        email: body.email,
        gender: body.gender,
        birthdate: new Date(`${body.birthdate} GMT+0`),
        country: 'EG',
        devices: [],
        __v: 0,
        uri: 'spotify:user:5e6b95fda1903935ccb355a3',
        id: '5e6b95fda1903935ccb355a3',
      };
    }

    // Succeed if the user isn't found
    return {
      status: !found ? 200 : 400,
      data: !found
        ? { token: 'mock_token', data: { user } }
        : { message: 'Error. Something went wrong.' },
    };
  },

  /**
   * Fetches all users in the mock data and ensures that a certain user is among them
   * @param  {Object} body The user's email
   * @return {Object}      The corresponding response
   */
  async forgotPassword(body) {
    // Get all users
    const allUsers = await fetch(users, 50);

    // Search all users for our user
    let found = false;
    allUsers.some((u) => {
      if (u.user.email === body.email) {
        found = true;
      }
      // Breaking condition
      return u.user.email === body.email;
    });

    // Succeed if the user is found
    return {
      status: found ? 200 : 400,
      data: found
        ? undefined
        : { message: 'Error. Something went wrong.' },
    };
  },

  /**
   * Fetches all users in the mock data and ensures that a certain user is among them
   * @param  {Object} body  The user's password and its confirmation
   * @param  {Object} token The mock token
   * @return {Object}       The corresponding response
   */
  async resetPassword(body, token) {
    // Get all users
    const allUsers = await fetch(users, 50);

    // Search all users for our user
    let found = false;
    let user = {};

    allUsers.some((u) => {
      if (u.password === body.password) {
        found = true;
        user = u.user;
        // Set the loggedIn cookie
        const expiryDate = new Date(Date.now() + 90 * (24 * 60 * 60 * 1000));
        document.cookie = `loggedIn=true; expires=${expiryDate.toUTCString()}; path=/;`;
      }
      // Breaking condition
      return u.password === body.password;
    });

    // Succeed if the user is found
    return {
      status: found ? 200 : 400,
      data: found
        ? { token, data: { user } }
        : { message: 'Error. Something went wrong.' },
    };
  },

  /**
   * Fetches all users in the mock data and ensures that a certain user is among them
   * @param  {Object} body  The user's current password, new password and its confirmation
   * @return {Object}       The corresponding response
   */
  async updatePassword(body) {
    // Get all users
    const allUsers = await fetch(users, 50);

    // Search all users for our user
    let found = false;
    let user = {};

    allUsers.some((u) => {
      if (u.password === body.password) {
        found = true;
        user = u.user;
        // Set the loggedIn cookie
        const expiryDate = new Date(Date.now() + 90 * (24 * 60 * 60 * 1000));
        document.cookie = `loggedIn=true; expires=${expiryDate.toUTCString()}; path=/;`;
      }
      // Breaking condition
      return u.password === body.password;
    });

    // Succeed if the user is found
    return {
      status: found ? 200 : 400,
      data: found
        ? { token: 'mock_token', data: { user } }
        : { message: 'Error. Something went wrong.' },
    };
  },

  /**
   * Returns mock user profile data
   * @return {Object} The mock data
   */
  async getCurrentUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    /* istanbul ignore next */
    if (!currentUser) {
      return {
        status: 404,
        data: { message: 'Error. Something went wrong.' },
      };
    }

    const user = await fetch(currentUser.data, 50);

    return {
      status: 200,
      data: user,
    };
  },

  /**
   * Updates mock user profile data and returns it
   * @param  {Object} data The mock data to update
   * @return {Object} The updated mock data
   */
  async editProfile(data) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    /* istanbul ignore next */
    if (!currentUser) {
      return {
        status: 404,
        data: { message: 'Error. Something went wrong.' },
      };
    }

    // Set each key
    Object.keys(data).forEach((key) => {
      if (currentUser.data[key]) {
        currentUser.data[key] = data[key];
      }
    });

    const user = await fetch(currentUser.data, 50);

    return {
      status: 200,
      data: user,
    };
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
  },
  /**
   * it sends a request to the server to set the current playing track
   * @param {string} ID the ID of the song played
   * @param {string} context The Type of the List played from
   * @param {string} contextID The ID of the Context
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async playTrack(ID, context, contextID) {
    if (ID && context && contextID) {
      return fetch(true, 1000).then((Promisedata) => Promisedata);
    }
  },
  /**
   * Save a Liked Track to Server
   * @param {string} ID the id of the track to be saved
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async saveTrack(ID) {
    if (ID) {
      return fetch(true, 1000).then((Promisedata) => Promisedata);
    }
  },

  /**
   * Delete a Liked Track
   * @param {string} ID the id of the track to be saved
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async deleteTrack(ID) {
    if (ID) {
      return fetch(true, 1000).then((Promisedata) => Promisedata);
    }
  },

  /**
   * Get an Ad from the Server
   * @return {String} the Image URL of the Ad
   */
  async getAd() {
    return fetch('../assets/imgs/El-8alaba.png', 1000).then((Promisedata) => Promisedata);
  },

  /**
   * Check if the User Likes a certain Track
   * @param {string} ID the id of the track to be checked
   * @return {Boolean} a Boolean of the State of the track false if failed
   */
  async checkLiked(ID) {
    if (ID) {
      return fetch(true, 1000).then((Promisedata) => Promisedata);
    }
  },

  /**
   * Fetches all genres in the mock data
   * @return {object} an object that contains all genres in the mock data
   */
  async fetchGenres() {
    const g = await fetch(genres, 1000);
    return g;
  },
  /**
   * Fetch a specific genre in the mock data
   * @param {string} id a string that contains the id of the genre
   * @return {object} an object containing necessary data about genre
   */
  async fetchGenre(id) {
    if (id === undefined) {
      return {};
    }
    let i;
    const list = genres;
    for (i = 0; i < list.length; i += 1) {
      // eslint-disable-next-line no-underscore-dangle
      if (id === list[i]._id) {
        return list[i];
      }
    }
    return {};
  },
  /* istanbul ignore next */
  /**
  * Fetches all prefered genres for a user
  * @return {object} an object that contains all preferred genres.
  * TODO[@Francois]: make sure it will be done because it doesn't have an endpoint
  */
  async fetchPrefGenres() {
    const g = await fetch(PrefGenres, 50);
    return g;
  },
  /**
   * Fetches all playlists related to a specific Category
   * @param {string} id string that contains the id of the category
   * @return {Array} an Array containing all playlists
   */
  async fetchCategoryPlaylists(id) {
    if (id === 'gaming') {
      return genresPlaylists1;
    }
    if (id === 'soul') {
      return genresPlaylists2;
    }
    if (id === 'Test') {
      return genresPlaylists3;
    }
    if (id === '') {
      return null;
    }
    return {};
  },
  /**
   * Fetches Current user Recently played tracks
   * @return {Array} An Array containing Recently played tracks
   */
  async fetchRecentlyPlayedLists(limit) {
    console.log(limit);
    return genresPlaylists1;
  },
  /**
   * Fetches all new releases related to a specific Category
   * @param {string} id string that contains the id of the category
   * @return {Array} an Array containing all the releases
   * TODO[@Francois] make sure it will get an id for category and return the playlists
   */
  async fetchCategoryReleases(id) {
    if (id === 'gaming') {
      return genresPlaylists1;
    }
    if (id === 'soul') {
      return genresPlaylists2;
    }
    if (id === 'Test') {
      return genresPlaylists3;
    }
    return {};
  },
  /**
 * Fetch related data to the user input for search
 * @param {string} x a string that contains the data the user search for
 * @return {object} an object that may have related data to user search
 */
  async fetchSearch(x) {
    if (x !== undefined) {
      let obj;
      if (x.match(/Amr Diab.*/)) {
      // eslint-disable-next-line prefer-destructuring
        obj = search[0];
        return obj;
      }
      if (x.match(/Godzilla.*/)) {
      // eslint-disable-next-line prefer-destructuring
        obj = search[1];
        return obj;
      }
      if (x.match(/Test.*/)) {
        return {};
      }
    }
    return null;
  },
  /**
   * Get all the albums saved by the user
   * @param {String} token Token of the current user
   */
  fetchCurrentUserAlbum(token) {
    console.log(token);
    return fetch(currentUserAlbum, 100);
  },
  /**
 * Fetch related data to the user input for search
 * @param {string} id a string that contains the data the user search for
 * @return {object} an object that may have related data of the playlist
 */
  async fetchPlaylist(id) {
    let PL = search[0].playlists;
    for (let j = 0; j < PL.length; j += 1) {
      if (PL[j].id === id) {
        return PL[j];
      }
    }

    PL = search[1].playlists;
    for (let j = 0; j < PL.length; j += 1) {
      if (PL[j].id === id) {
        return PL[j];
      }
    }
    return {};
  },
  /**
 * Fetch related data to the user input for search
 * @param {string} id a string that contains the data the user search for
 * @return {object} an object that may have related data of the playlist
 */
  async fetchTrack(id) {
    let PL = await fetch(search[0], 1000);
    PL = PL.tracks;
    for (let j = 0; j < PL.length; j += 1) {
      if (PL[j].id === id) {
        return PL[j];
      }
    }
    PL = await fetch(search[1], 500);
    PL = PL.tracks;
    for (let j = 0; j < PL.length; j += 1) {
      if (PL[j].id === id) {
        return PL[j];
      }
    }
    return {};
  },
  //   /**
  //  * Fetch related data to the user input for search
  //  * @param {string} id a string that contains the data the user search for
  //  * @return {object} an object that may have related data of the artist
  //  */
  //   async fetchArtist(id) {
  //     let PL;
  //     PL = search[0].artists;
  //     for (let j = 0; j < PL.length; j += 1) {
  //       if (PL[j].id === id) {
  //         return PL[j];
  //       }
  //     }
  //     PL = search[1].artists;
  //     for (let j = 0; j < PL.length; j += 1) {
  //       if (PL[j].id === id) {
  //         return PL[j];
  //       }
  //     }
  //     return {};
  //   },
  /**
   * Get All the playlists of the current user
   * @param {string} token Token of the current user
   */
  async fetchCurrentUserPlaylists(token) {
    console.log(token);
    return fetch(currentUserPlaylists, 100);
  },
  /**
   * Get All the playlists of the certain user
   * @param {string} userID Current User ID
   * @param {string} token Token of the current user
   */
  async fetchaListOfUserPlaylists(userID, token) {
    console.log(token);
    let dummy = userID || true;
    if (dummy) {
      dummy += dummy;
    }
    return fetch(currentUserPlaylists, 100);
  },
  /**
   * Return the data of a specific user
   * @param {string} userID A user id
   * @param {string} token Token of the current user
   */
  async fetchaUserProfile(userID, token) {
    console.log(token);
    let dummy = userID || true;
    if (dummy) {
      dummy += dummy;
    }
    return fetch(getaUsersProfile, 500);
  },
  /**
   * Get all the Artist followed by the user
   * @param {string} token Token of the current user
   */
  fetchCurrentUserArtists(token) {
    console.log(token);
    return fetch(currentUserArtists, 100);
  },
  async fetchAnArtist(id) {
    let dummy = id || true;
    if (dummy) {
      dummy += dummy;
    }
    return fetch(getAnArtist, 100);
  },

  /**
   * Return Albums of an artist
   * @param {String} id Album ID
   */
  async fetchArtistAlbums(id) {
    console.log(id);
    return fetch(getArtistAlbums, 200);
  },

  /**
   *
   * @param {string} id ID of the artist
   * @param {token} token Token of the current user
   */
  async getArtistAlbum(id, token) {
    console.log(id);
    console.log(token);
    return fetch(getArtistAlbum, 200);
  },

  async fetchArtistTopTracks(id) {
    console.log(id);
    return fetch(getArtistTopTracks, 100);
  },

  async fetchArtistRelatedArtists(id, token) {
    console.log(token);
    let dummy = id || true;
    if (dummy) {
      dummy += dummy;
    }
    return fetch(getArtistRelatedArtists, 100);
  },
  /**
   * Fetches all songs of a playlist in the mock data
   * @param  {Number}  id The id of playlist
   * @return {Object}  An object containing all songs in a given playlist of ID equals to id
   */
  async fetchSongs(id) {
    const allSongs = await fetch(playlistSongs, 200);
    for (let i = 0; i < allSongs.length; i += 1) {
      if (allSongs[i].id === id) {
        return allSongs[i].items;
      }
    }
    return {};
  },
  /**
   * Fetches all songs of an album in the mock data
   * @param  {Number}  id The id of album
   * @return {Object}  An object containing all songs in a given album of ID equals to id
   */
  async fetchAlbumSongs(id) {
    // const allSongs = await fetch(playlistSongs, 200);
    // for (let i = 0; i < allSongs.length; i += 1) {
    //   if (allSongs[i].id === id) {
    //     return allSongs[i].items;
    //   }
    // }
    // return {};
    const album = await fetch(albums, 200);
    const songs = [];
    if (album.items[0].id === id) {
      for (let i = 0; i < album.items[0].tracks.items.length; i += 1) {
        album.items[0].tracks.items[i].album = {
          artists: album.items[0].artists,
          images: album.items[0].images,
        };
        songs[i] = { track: album.items[0].tracks.items[i] };
      }
    }
    return songs;
  },
  /**
   * Fetches a list from the mock data
   * @param  {Number}  id The id of the desired list
   * @return {Object} An object containing all information about the list of ID equals to id
   */
  async fetchList(id) {
    const allLists = await fetch(lists, 200);
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
    const allAlbums = await fetch(albums, 200);
    for (let j = 0; j < allAlbums.items.length; j += 1) {
      if (allAlbums.items[j].id === id) {
        return allAlbums.items[j];
      }
    }
    return {};
  },

  /**
   * Fetches saved Songs from the mock data
   * @return {Object} An object containing all saved songs
   */
  async fetchSavedTracks() {
    const allSongs = await fetch(playlistSongs, 200);
    for (let i = 0; i < allSongs.length; i += 1) {
      if (allSongs[i].id === 'LikedTracks') {
        return allSongs[i].items;
      }
    }
    return {};
  },

  /**
   * Checks if An album is saved in user's library or not
   * @param  {Number}  id The id of the desired album
   * @return {Object} An object containing value refers if it's saved or not
   */
  async CheckAlbum(id) {
    if (id) {
      return { data: [false] };
    }
    return {};
  },

  /**
   * Save An album to user's library
   * @param  {Number}  id The id of the album
   * @return {Object} An object containing the status of the request
   */
  async SaveAlbum(id) {
    if (id) {
      return { status: 201 };
    }
    return { status: 0 };
  },

  /**
   * Remove An album from user's library
   * @param  {Number}  id The id of the album
   * @return {Object} An object containing the status of the request
   */
  async RemoveAlbum(id) {
    if (id) {
      return { status: 200 };
    }
    return { status: 0 };
  },

  /**
   * Check if a Playlist is Saved for the Current User or not
   * @param  {Number}  id The id of the Playlist
   * @return {Object}  The corresponding response
   */
  async CheckPlaylist(id) {
    if (id) {
      return { data: [false] };
    }
    return {};
  },

  /**
   * Follow a Playlist
   * @param  {Number}  id The id of the Playlist
   * @return {Object}  The corresponding response
   */
  async FollowPlaylist(id) {
    if (id) {
      return { status: 200 };
    }
    return { status: 0 };
  },

  /**
   * Unfollow a Playlist
   * @param  {Number}  id The id of the Playlist
   * @return {Object}  The corresponding response
   */
  async UnfollowPlaylist(id) {
    if (id) {
      return { status: 200 };
    }
    return { status: 0 };
  },
};
/* eslint-enable consistent-return */
