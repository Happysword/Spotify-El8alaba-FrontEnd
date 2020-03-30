import axios from 'axios';

// HmanA6399: Please use this whenever you want to communicate with the server
import api from '../../common/config';

export default {
  // @todo[XL3] See if this method will be removed
  // fetchUsers() {
  //   return axios.get(api).then((response) => response.data);
  // },

  /**
   * Get the User's Currently Playing Track
   * @return {Object} An Object Containing info about the User's Current Playing Track
   */
  async fetchCurrentSong() {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .get(`${api}/api/v1/me/player/currently-playing`, {}, config)
      .then((response) => response.data).catch(() => false);
  },

  /**
   * Get the User's Current playback info
   * @return {Object} An Object Containing info about the User's Current playback
   */
  async fetchCurrentPlayback() {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .get(`${api}/api/v1/me/player`, {}, config)
      .then((response) => response.data).catch(() => false);
  },


  /**
   * Pause a User's Playback
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async pausePlayback() {
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/player/pause`, {}, config)
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
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/player/play`, {}, config)
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
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .post(`${api}/api/v1/me/player/next`, {}, config)
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
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .post(`${api}/api/v1/me/player/previous`, {}, config)
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
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/player/shuffle?state=${state}`, {}, config)
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
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/player/repeat?state=${state}`, {}, config)
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
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/player/seek?position_ms=${positionMs}`, {}, config)
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
    const config = {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/player/volume?volume_percent=${volumePercent}`, {}, config)
      .then((response) => {
        if (response.status === 204) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Save a Liked Track to Server
   * @param {string} ID the id of the track to be saved
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async saveTrack(ID) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .put(`${api}/api/v1/me/tracks?ids=${ID}`, '', config)
      .then((response) => {
        if (response.status === 201) return true;
        return false;
      })
      .catch(() => false);
  },

  /**
   * Delete a Liked Track from Server
   * @param {string} ID the id of the track to be saved
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async deleteTrack(ID) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token} `,
      },
    };
    return axios
      .delete(`${api}/api/v1/me/tracks?ids=${ID}`, config)
      .then((response) => {
        if (response.status === 200) return true;
        return false;
      })
      .catch(() => false);
  },
  /**
   * Get all the albums saved by the user
   * @param {String} token Token of the current user
   */
  async fetchCurrentUserAlbum(token) {
    const userAlbum = await axios
      .get(`${api}/api/v1/me/albums?limit&offset`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
    return userAlbum;
  },
  /**
   * Get All the playlists of the current user
   * @param {string} userID Current User ID
   * @param {string} token Token of the current user
   */
  async fetchCurrentUserPlaylists(userID, token) {
    const userPlaylists = await axios
      .get(`${api}/api/v1/users/${userID}/playlists?limit=&offset=`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
    return userPlaylists;
  },
  /**
   * Get all the Artist followed by the user
   * @param {string} token Token of the current user
   */
  async fetchCurrentUserArtists(token) {
    const userArtists = await axios
      .get(`${api}/api/v1/me/following?`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => console.log(response.data));
    return userArtists;
  },
  /**
   * Get all the info about specific artist
   * @param {string} id The artist ID
   */
  async fetchAnArtist(id) {
    const artists = await axios
      .get(`${api}/api/v1/artists/${id}`)
      .then((response) => response.data);
    return artists;
  },
  /**
   * Get the artist related artist by passing the artist's ID
   * @param {string} id The artist ID that has other related artists
   * @param {string} token Token of the current user
   */
  async fetchArtistRelatedArtists(id, token) {
    const related = await axios
      .get(`${api}/api/v1/artists/${id}/related-artists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
    return related;
  },

  /**
   * Sends a POST request to the server to login the user
   * @param  {Object} data The user's credentials
   * @return {Object}      The corresponding response
   */
  async loginUser(data) {
    const request = {
      method: 'POST',
      url: `${api}/api/v1/authentication/login`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
 * Creates a new playlists
 * @param {OBJECT} createdPlaylist The created playlist object
 */
  async createNewPlayList(createdPlaylist, token) {
    const response = await axios.post(`${api}/api/v1/users/playlists`, createdPlaylist, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.body)
      .catch((err) => console.log(err));

    return response;
  },

  /**
   * Follow Artists or Users
   * @param {String} ids IDs of artists or Users to follow
   * @param {String} token Token of current user
   */
  async followArtistsOrUsers(ids, token) {
    const response = await axios.put(`${api}/api/v1/me/following?type=artist`, ids, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.body);
    return response;
  },

  /**
   * UnFollow Artists or Users
   * @param {String} ids IDs of artists or Users to Unfollow
   * @param {String} token Token of current user
   */
  async unfollowArtistsOrUsers(ids, token) {
    const response = await axios.delete(`${api}/api/v1/me/following?type=artist`, ids, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.body);
    return response;
  },

  /**
   * Check if Current User Follows Artists or Users
   * @param {String} ids IDs of artists or user which current user follows
   * @param {String} token Token of current user
   */
  async ifCurrentUserFollowsArtistsOrUsers(ids, token) {
    const response = await axios.get(`${api}/api/v1/me/following/contains?ids=${ids}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.body);
    return response;
  },

  /**
   * Check if Users Follows a playlist
   * @param {String} userID ID of current user
   * @param {String} playlistID ID of certain playlist
   * @param {String} token Token of current user
   */
  async ifUsersFollowsaPlaylist(userID, playlistID, token) {
    const response = await axios.get(`${api}/api/v1/playlists/${playlistID}/followers/contains?ids=${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.body);
    return response;
  },

  /**
   * Follow a playlist
   * @param {String} playlistID ID of certain playlist
   * @param {String} token Token of current user
   */
  async followaPlaylist(playlistID, token) {
    const response = await axios.put(`${api}/api/v1/playlists/${playlistID}/followers`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.body);
    return response;
  },

  /**
   * unFollow a playlist
   * @param {String} playlistID ID of certain playlist
   * @param {String} token Token of current user
   */
  async UnfollowaPlaylist(playlistID, token) {
    const response = await axios.delete(`${api}/api/v1/playlists/${playlistID}/followers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.body);
    return response;
  },

  /**
   * Check if Users Follows an Album
   * @param {String} albumID ID of album
   * @param {String} token Token of current user
   */
  async ifUserFollowsAlbums(albumID, token) {
    const response = await axios.get(`${api}/api/v1/me/albums/contains?ids=${albumID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.body);
    return response;
  },

  /**
   * Save an album for current user
   * @param {String} albumID ID of album
   * @param {String} token Token of current user
   */
  async saveAlbumsForCurrentUser(albumsID, token) {
    const response = await axios.put(`${api}/api/v1/me/albums?ids=${albumsID}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.body);
    return response;
  },

  /**
   * Delete an album for current user
   * @param {String} albumID ID of album
   * @param {String} token Token of current user
   */
  async deleteAlbumsForCurrentUser(albumsID, token) {
    const response = await axios.delete(`${api}/api/v1/me/albums?ids=${albumsID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.body);
    return response;
  },

  /**
   * Sends a POST request to the server to signup the user
   * @param  {Object} data The user's signup data
   * @return {Object}      The corresponding response
   */
  async signupUser(data) {
    const request = {
      method: 'POST',
      url: `${api}/api/v1/authentication/signup`,
      data,
      headers: {
        'Content-Type': 'application/json',
        /**
         * @author XL3
         * This is my public IP address
         * @todo[XL3] Change this for production
         */
        'X-Forwarded-For': '156.215.87.252',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a POST request to the server for a Reset Password token
   * @param  {Object} data The user's email
   * @return {Object}      The corresponding response
   */
  async forgotPassword(data) {
    const request = {
      method: 'POST',
      url: `${api}/api/v1/authentication/forgotPassword`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Sends a GET request to the server for the current user's profile information
   * @return {Object} The corresponding response
   */
  async getCurrentUserProfile() {
    // Obtain the token from localStorage
    const { token } = JSON.parse(localStorage.getItem('currentUser'));
    const request = {
      method: 'GET',
      url: `${api}/api/v1/users/me`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  /**
   * Fetches all songs of a playlist
   * @param  {Number}  id The id of playlist
   * @param  {string}  token The token of user
   * @return {Object}  An object containing all songs in a given playlist of ID equals to id
   */
  async fetchSongs(id) {
    const songs = await axios.get(`${api}/api/v1/playlists/${id}/tracks`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return songs.data.items;
  },
  /**
   * fetch a specific song
   * @param {string} id the id of the track
   * @return {object} object containing track info
   */
  async fetchTrack(id) {
    const res = await axios.get(`${api}/api/v1/tracks/${id}`);
    return res;
  },

  /**
   * Fetches user's saved tracks
   * @param  {string}  token The token of user
   * @return {Object}  An object containing all saved songs of the user
   */
  async fetchSavedTracks() {
    const songs = await axios.get(`${api}/api/v1/me/tracks`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
        return {
          data: {
            items: [
              {
                track: {
                  artists: [
                    { name: '' },
                  ],
                  album: {},
                  name: '',
                  duration_ms: 0,
                },
              },
            ],
          },
        };
      })
      .catch((error) => console.log(error));
    return songs.data.items;
  },

  /**
   * Fetches List info
   * @param  {Number}  id The id of the desired list
   * @return {Object} An object containing all information about the list of ID equals to id
   */
  async fetchList(id) {
    const lists = await axios.get(`${api}/api/v1/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return lists.data;
  },

  /**
   * Fetches Album info
   * @param  {Number}  id The id of the desired Album
   * @return {Object} An object containing all information about the album of ID equals to id
   */
  async fetchAlbum(id) {
    const Album = await axios.get(`${api}/api/v1/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return Album.data;
  },

  /**
   * Fetches Album songs
   * @param  {Number}  id The id of the desired Album
   * @return {Object} An object containing all songs of the album of ID equals to id
   */
  async fetchAlbumSongs(id) {
    // eslint-disable-next-line no-undef
    const album = await fetchAlbum(id);
    // TODO:: Remove this loop
    const songs = [];
    for (let i = 0; i < album.tracks.length; i += 1) {
      album.tracks[i].artists = [{ name: 'Artist' }];
      album.tracks[i].album = { name: 'Album' };
      songs[i] = { track: album.tracks[i] };
    }
    return songs;
  },

  /**
   * Save Track for the Current User
   * @param  {Number}  id The id of the Track
   * @return {Object}  The corresponding response
   */
  async SaveTrack(id) {
    const res = await axios.put(`${api}/api/v1/me/tracks?ids=${id}`, '', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return res;
  },

  /**
   * Remove Track for the Current User
   * @param  {Number}  id The id of the Track
   * @return {Object}  The corresponding response
   */
  async RemoveTrack(id) {
    const res = await axios.delete(`${api}/api/v1/me/tracks?ids=${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return res;
  },
  /**
   * Get a playlist
   * @param {string} id the id of the playlist
   * @return {object} object containing the playlist infos.
   */
  async fetchPlaylist(id) {
    const res = await axios.get(`${api}/api/v1/playlists/${id}`);
    return res;
  },

  /**
   * Save Album for the Current User
   * @param  {Number}  id The id of the Album
   * @return {Object}  The corresponding response
   */
  async SaveAlbum(id) {
    const res = await axios.put(`${api}/api/v1/me/albums?ids=${id}`, '', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return res;
  },

  /**
   * Remove Album for the Current User
   * @param  {Number}  id The id of the Album
   * @return {Object}  The corresponding response
   */
  async RemoveAlbum(id) {
    const res = await axios.delete(`${api}/api/v1/me/albums?ids=${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    });
    return res;
  },

  /**
   * Check if Album is Saved for the Current User or not
   * @param  {Number}  id The id of the Album
   * @return {Object}  The corresponding response
   */
  async CheckAlbum(id) {
    const response = await axios.get(`${api}/api/v1/me/albums/contains?ids=${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
        return [false];
      })
      .catch(() => [false]);
    return response;
  },
  /**
   * Gets all categories (genres)
   * @return {object} an object containing all the genres
   */
  async fetchGenres() {
    return axios
      .get(`${api}/api/v1/browse/categories`)
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
      .get(`${api}/api/v1/browse/categories/${id}`)
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
      .get(`${api}/api/v1/categories/${id}/playlists?country=EG&limit=20&offset=0`)
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
      .get(`${api}/api/v1/search?q=${x}&type=${z}&limit=6&offset=0`)
      .catch((error) => console.log(error));
  },
};
