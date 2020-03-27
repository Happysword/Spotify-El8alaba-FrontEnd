import axios from 'axios';

// HmanA6399: Please use this whenever you want to communicate with the server
import api from '../../common/config';

export default {
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
};
