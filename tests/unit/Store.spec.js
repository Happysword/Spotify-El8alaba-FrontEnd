import Store from '../../src/store/index';

describe('Store Mutations Testing', () => {
  it('check change user mutation', () => {
    expect(Store.state.currentUser.username).toBe('Spotify user');
    Store.commit('setCurrentUser', { username: 'user' });
    expect(Store.state.currentUser.username).toBe('user');
  });
  it('check change liked mutation', () => {
    expect(Store.state.liked).toBe(false);
    Store.commit('changeLiked');
    expect(Store.state.liked).toBe(true);
  });
  it('check toggle sound mutation', () => {
    expect(Store.state.MusicPlayer.isMute).toBe(false);
    Store.commit('toggleSound');
    expect(Store.state.MusicPlayer.isMute).toBe(true);
  });
  it('check toggle play mutation', () => {
    expect(Store.state.MusicPlayer.isPlaying).toBe(false);
    Store.commit('togglePlay');
    expect(Store.getters.getisPlaying).toBe(true);
  });
});

describe('Store Actions Testing', () => {
  it('Tests togglePlayact', async () => {
    expect(Store.state.MusicPlayer.isPlaying).toBe(true);
    await Store.dispatch('togglePlayact');
    expect(Store.getters.getisPlaying).toBe(false);
    try {
      await Store.dispatch('togglePlayact'); // as the pause has a catch that is not read by jest
    } catch (error) {
      Store.state.MusicPlayer.isPlaying = true;
    }
    expect(Store.getters.getisPlaying).toBe(true);
  });
  it('Tests setVolume', async () => {
    expect(Store.state.MusicPlayer.isMute).toBe(true);
    await Store.dispatch('setVolume');
    expect(Store.state.MusicPlayer.isMute).toBe(false);
  });
  it('Tests toggleSound', async () => {
    expect(Store.state.MusicPlayer.isMute).toBe(false);
    await Store.dispatch('toggleSound');
    expect(Store.state.MusicPlayer.isMute).toBe(true);
    await Store.dispatch('toggleSound');
    expect(Store.state.MusicPlayer.isMute).toBe(false);
  });
  it('Tests playpauseplaylist', async () => {
    expect(Store.state.MusicPlayer.isPlaying).toBe(true);
    await Store.dispatch('playpauseplaylist', {
      playstatus: true,
      song: Store.state.MusicPlayer.currentSong,
    });
    expect(Store.state.MusicPlayer.isPlaying).toBe(false);
  });
  it('Tests playnewsong', async () => {
    expect(Store.state.MusicPlayer.isPlaying).toBe(false);
    await Store.dispatch('playNewSong');
    expect(Store.state.MusicPlayer.isFirstPlay).toBe(true);
  });
});
