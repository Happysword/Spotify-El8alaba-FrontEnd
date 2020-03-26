import axios from 'axios';

// HmanA6399: Please use this whenever you want to communicate with the server
import api from '../../common/config';

export default {
  // @todo[XL3] See if this method will be removed
  // fetchUsers() {
  //   return axios.get(api).then((response) => response.data);
  // },

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
    const resopnse = await axios.get(`${api}/api/v1/me/following/contains?ids=${ids}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.body);
    return resopnse;
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
