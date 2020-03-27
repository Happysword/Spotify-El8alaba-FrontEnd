import requests from '../../src/api/mock/index';
import following from '../../src/api/mock/data/Boolean.json';
import currentUserPlaylists from '../../src/api/mock/data/Get-Current-User-Playlists.json';

describe('ArtistCard.vue', () => {
  it('Test if user following artist request', async () => {
    const isFollowing = following;
    const data = await requests.ifCurrentUserFollowsArtistsOrUsers('userID', 'token');

    expect(data).toEqual(isFollowing);
  });

  it('Test if user following an Album request', async () => {
    const isFollowing = following;
    const data = await requests.ifUserFollowsAlbums('albumID', 'token');

    expect(data).toEqual(isFollowing);
  });

  it('Test if user following artist request', async () => {
    const userPlaylists = currentUserPlaylists;
    const data = await requests.fetchCurrentUserPlaylists('userID', 'token');

    expect(data).toEqual(userPlaylists);
  });
});
