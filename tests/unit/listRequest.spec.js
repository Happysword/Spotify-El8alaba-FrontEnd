import request from '../../src/api/mock/index';
import albums from '../../src/api/mock/data/albumsInfo.json';
import lists from '../../src/api/mock/data/listsInfo.json';
import songs from '../../src/api/mock/data/playlistSongs.json';

const Album = albums.items[0];
const list = lists[1];
const songlist = songs[2];

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

  it('Get list of songs of list request test', async () => {
    expect.assertions(1);
    const data = await request.fetchSongs(list.id);
    expect(data).toEqual(songlist.items);
  });

  it('Get list of songs of album request test', async () => {
    expect.assertions(1);
    const data = await request.fetchAlbumSongs(Album.id);
    expect(data[0].track).toEqual(Album.tracks.items[0]);
  });

  it('Get list of saved tracks request test', async () => {
    expect.assertions(1);
    const data = await request.fetchSavedTracks();
    expect(data).toEqual(songs[0].items);
  });

  it('Check album & playlist save & remove', async () => {
    expect.assertions(6);
    expect(await request.FollowPlaylist(1)).toEqual({ status: 200 });
    expect(await request.UnfollowPlaylist(1)).toEqual({ status: 200 });
    expect(await request.SaveAlbum(1)).toEqual({ status: 201 });
    expect(await request.RemoveAlbum(1)).toEqual({ status: 200 });
    expect(await request.CheckPlaylist(1)).toEqual({ data: [false] });
    expect(await request.CheckAlbum(1)).toEqual({ data: [false] });
  });
});
