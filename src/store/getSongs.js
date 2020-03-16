import Song from '@/api/mock';

export default {

  getSongs(id) {
    return new Promise((resolve) => {
      Song.fetchSongs()
        .then((songs) => {
          const song = songs[id];
          resolve(song);
        });
    });
  },
};
