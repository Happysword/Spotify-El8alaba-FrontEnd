import requests from '../../src/api/mock/index';
import following from '../../src/api/mock/data/Boolean.json';
import currentUserPlaylists from '../../src/api/mock/data/Get-Current-User-Playlists.json';
import currentUserAlbum from '../../src/api/mock/data/Get-Current-User-Album.json';
import userProfile from '../../src/api/mock/data/Get-A-Users-Profile.json';
import currentArtist from '../../src/api/mock/data/Get-User-Followed-Artists.json';
import AnArtist from '../../src/api/mock/data/Get-An-Artist.json';
import AnArtistR from '../../src/api/mock/data/Get-Artist-Related-Artists.json';

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

  it('Test Current User Album', async () => {
    const userAlbum = currentUserAlbum;
    const data = await requests.fetchCurrentUserAlbum('token');

    expect(data).toEqual(userAlbum);
  });

  it('Test Fetch playlist', async () => {
    const playlist = currentUserPlaylists;
    const data = await requests.fetchaListOfUserPlaylists('userID', 'token');

    expect(data).toEqual(playlist);
  });

  it('Test user profile', async () => {
    const prof = userProfile;
    const data = await requests.fetchaUserProfile('userID', 'token');

    expect(data).toEqual(prof);
  });

  it('Test current user artist', async () => {
    const cArtist = currentArtist;
    const data = await requests.fetchCurrentUserArtists('token');

    expect(data).toEqual(cArtist);
  });

  it('Test fetch an artist', async () => {
    const Artist = AnArtist;
    const data = await requests.fetchAnArtist('id');

    expect(data).toEqual(Artist);
  });

  it('Test fetch an artist related artist', async () => {
    const ArtistR = AnArtistR;
    const data = await requests.fetchArtistRelatedArtists('id', 'token');

    expect(data).toEqual(ArtistR);
  });
});
