import PlayerRequests from './Requests';
import api from '../../../common/config';

export default {
  async togglePlayact({ commit, state }) {
    // TODO[@Seif] check from where to play and how to get songs

    // check if this is the first time to play this song i.e. not paused before
    if (state.MusicPlayer.isFirstPlay) {
      // fetch the current song from server
      const Response = await PlayerRequests.fetchCurrentPlayback();
      // check if the response was correct
      if (Response !== false) { state.MusicPlayer.currentPlayback = Response; }
      // get song URL from mock or server
      let SongURL = '';
      if (process.env.VUE_APP_API_CLIENT === 'server') {
        SongURL = `${api}/api/v1/streaming/${state.MusicPlayer.currentPlayback.item.id}`;
        console.log(SongURL);
      } else if (process.env.VUE_APP_API_CLIENT === 'mock') { SongURL = state.MusicPlayer.currentPlayback.item.href; }
      state.MusicPlayer.AudioPlayer.src = SongURL;
      // this one here above
      state.MusicPlayer.isFirstPlay = false;
    }
    // if was already playing then we pause else if paused we play the audio and send requests
    if (state.MusicPlayer.isPlaying) {
      const requestAnswer = await PlayerRequests.pausePlayback();
      if (requestAnswer) {
        commit('togglePlay');
        state.MusicPlayer.AudioPlayer.pause();
      }
    } else {
      const requestAnswer = await PlayerRequests.startPlayback();
      state.MusicPlayer.AudioPlayer.play();
      if (requestAnswer) {
        commit('togglePlay');
        state.MusicPlayer.AudioPlayer.play();
      }
    }
  },

  async setVolume({ state }) {
    // Send the server a request
    const Response = await PlayerRequests.setVolume(
      state.MusicPlayer.currentPlayback.device.volume_percent,
    );
    // if the response was correct we change the volume and set isMute respectively
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
    // Check if the Volume is Muted and Send request if it is with last recorded value
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
      // if not muted then we set the volume to zero and send the requests
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
