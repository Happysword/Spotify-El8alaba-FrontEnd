import client from 'api-client';

export default {
  /**
   * Fetches Current Song in the mock data
   * @return {Object} An object containing info about current Track
   */
  async fetchCurrentSong() {
    const data = await client
      .fetchCurrentSong()
      .then((Promisedata) => Promisedata);
    return data;
  },

  /**
   * Get the User's Current playback info
   * @return {Object} An Object Containing info about the User's Current playback
   */
  async fetchCurrentPlayback() {
    const data = await client
      .fetchCurrentPlayback()
      .then((Promisedata) => Promisedata);
    return data;
  },

  /**
   * Pause a User's Playback
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async pausePlayback() {
    const response = await client
      .pausePlayback()
      .then((Promisedata) => Promisedata);
    return response;
  },

  /**
   * Start/Resume a User's Playback
   * @return {Boolean} a Boolean True if successful and false if failed
   */

  async startPlayback() {
    const response = await client
      .startPlayback()
      .then((Promisedata) => Promisedata);
    return response;
  },

  /**
   * Skip User’s Playback To Next Track
   * @return {Boolean} a Boolean True if successful and false if failed
   */

  async skipNext() {
    const response = await client.skipNext().then((Promisedata) => Promisedata);
    return response;
  },

  /**
   * Skip User’s Playback To Previous Track
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async skipPrevious() {
    const response = await client
      .skipPrevious()
      .then((Promisedata) => Promisedata);
    return response;
  },

  /**
   * Toggle Shuffle For User’s Playback
   * @param {Boolean} state a Boolean containing the state wanted of shuffle
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async toggleShuffle(state) {
    if (typeof state === 'boolean') {
      const response = await client
        .toggleShuffle(state)
        .then((Promisedata) => Promisedata);
      return response;
    }
    return false;
  },

  /**
   * Set Repeat Mode On User’s Playback
   * @param {object} state track, context or off. track: will repeat the current track.
   * context: will repeat the current context. off: will turn repeat off.
   * @return {Boolean} a Boolean True if successful and false if failed
   */

  async toggleRepeat(state) {
    if (state === 'track' || state === 'off' || state === 'context') {
      const response = await client
        .toggleRepeat(state)
        .then((Promisedata) => Promisedata);
      return response;
    }
    return false;
  },

  /**
   * Seek To Position In Currently Playing Track
   * @param {Number} position_ms Number of milliseconds to seek to
   * @return {Boolean} a Boolean True if successful and false if failed
   */
  async seekPosition(positionMs) {
    if (typeof positionMs === 'number' && positionMs >= 0) {
      const response = await client
        .seekPosition(positionMs)
        .then((Promisedata) => Promisedata);
      return response;
    }
    return false;
  },

  /**
   * Set Volume For User's Playback
   * @param {Number} volumePercent the Volume percentage wanted from the player
   * @return {Boolean} a Boolean True if successful and false if failed
   */

  async setVolume(volumePercent) {
    if (
      typeof volumePercent === 'number' && volumePercent >= 0 && volumePercent <= 100
    ) {
      const response = await client
        .setVolume(volumePercent)
        .then((Promisedata) => Promisedata);
      return response;
    }
    return false;
  },
};
