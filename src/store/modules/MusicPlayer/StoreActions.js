import PlayerRequests from './Requests';
import api from '../../../common/config';

export default {
  async togglePlayact({ commit, state }) {
    // TODO[@Seif] check from where to play and how to get songs and write comments
    if (state.MusicPlayer.isFirstPlay) {
      const Response = await PlayerRequests.fetchCurrentPlayback();
      if (Response !== false) { state.MusicPlayer.currentPlayback = Response; }
      let SongURL = '';
      if (process.env.VUE_APP_API_CLIENT === 'server') {
        SongURL = `${api}api/v1/streaming/${state.MusicPlayer.currentPlayback.item.id}`;
      } else if (process.env.VUE_APP_API_CLIENT === 'mock') { SongURL = state.MusicPlayer.currentPlayback.item.href; }
      state.MusicPlayer.AudioPlayer.src = SongURL;
      // this one here above
      state.MusicPlayer.isFirstPlay = false;
    }
    if (state.MusicPlayer.isPlaying) {
      const requestAnswer = await PlayerRequests.pausePlayback();
      if (requestAnswer) {
        commit('togglePlay');
        state.MusicPlayer.AudioPlayer.pause();
      }
    } else {
      const requestAnswer = await PlayerRequests.startPlayback();
      if (requestAnswer) {
        commit('togglePlay');
        state.MusicPlayer.AudioPlayer.play();
      }
    }
  },
  async setVolume({ state }) {
    const Response = await PlayerRequests.setVolume(
      state.MusicPlayer.currentPlayback.device.volume_percent,
    );
    if (Response) {
      state.MusicPlayer.AudioPlayer.volume = state.MusicPlayer
        .currentPlayback.device.volume_percent / 100;
      if (state.MusicPlayer.AudioPlayer.volume === 0) {
        state.MusicPlayer.isMute = true;
      } else {
        state.MusicPlayer.isMute = false;
      }
    }
  },
  async toggleSound({ state }) {
    if (state.MusicPlayer.currentPlayback.device.volume_percent === 0) {
      const Response = await PlayerRequests.setVolume(
        state.MusicPlayer.lastVolrecord,
      );
      if (Response) {
        state.MusicPlayer.AudioPlayer.volume = state.MusicPlayer.lastVolrecord / 100;
        state.MusicPlayer.currentPlayback.device.volume_percent = state.MusicPlayer.lastVolrecord;
        state.MusicPlayer.isMute = false;
      }
    } else {
      const Response = await PlayerRequests.setVolume(0);
      if (Response) {
        state.MusicPlayer.lastVolrecord = state.MusicPlayer.AudioPlayer.volume * 100;
        state.MusicPlayer.AudioPlayer.volume = 0;
        state.MusicPlayer.currentPlayback.device.volume_percent = 0;
        state.MusicPlayer.isMute = true;
      }
    }
  },
};
