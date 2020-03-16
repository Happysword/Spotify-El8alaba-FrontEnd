import client from 'api-client';

export default {
  async fetchCurrentSong() {
    const data = await client.fetchCurrentSong().then((Promisedata) => Promisedata);
    return data;
  },
};
