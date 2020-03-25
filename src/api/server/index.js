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
