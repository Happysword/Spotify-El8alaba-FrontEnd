import client from 'api-client';

export default {
  async fetchCurrentSong() {
    const data = await client.fetchCurrentSong();
    return data;
  },

  async fetchCurrentPlayback() {
    const data = await client.fetchCurrentPlayback();
    return data;
  },

  async pausePlayback() {
    const response = await client.pausePlayback();
    return response;
  },

  async startPlayback() {
    const response = await client.startPlayback();
    return response;
  },

  async skipNext() {
    const response = await client.skipNext();
    return response;
  },

  async skipPrevious() {
    const response = await client.skipPrevious();
    return response;
  },

  async toggleShuffle(state) {
    const response = await client.toggleShuffle(state);
    return response;
  },

  async toggleRepeat(state) {
    const response = await client.toggleRepeat(state);
    return response;
  },

  async seekPosition(positionMs) {
    const response = await client.seekPosition(positionMs);
    return response;
  },

  async setVolume(volumePercent) {
    const response = await client.setVolume(volumePercent);
    return response;
  },
};
