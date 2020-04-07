import request from '../../src/api/mock/index';
import albums from '../../src/api/mock/data/albumsInfo.json';
import lists from '../../src/api/mock/data/listsInfo.json';
// import songs from '../../src/api/mock/data/songs.json';

const Album = albums.items[0];
const list = lists[0];
// const songlist = songs[list.id];

describe('Requests of lists', () => {
  it('Get List info request test', async () => {
    expect.assertions(1);
    const data = await request.fetchList(list.id);
    expect(data).toEqual(list);
  });

  it('Get Album info request test', async () => {
    expect.assertions(1);
    const data = await request.fetchAlbum(Album.id);
    expect(data).toEqual(Album);
  });

  /*
  it('Get list of songs request test', async () => {
    expect.assertions(1);
    const data = await request.fetchSongs(list.id);
    expect(data).toEqual(songlist);
  });
  */
});
