import PlayerRequests from './Requests';
import api from '../../../common/config';

export default {
  /**
   * it toggles the play and pause using the mutation in the store after checking
   * that the song was already playing else it fetches the song from server and starts playing it
   * @param {*} VuexStore the current store used for the app
   */
  async togglePlayact({ commit, state }) {
    // TODO[@Seif] check from where to play and how to get songs

    // check if this is the first time to play this song i.e. not paused before
    if (state.MusicPlayer.isFirstPlay) {
      // fetch the current song from server
      const Response = await PlayerRequests.fetchCurrentPlayback();
      // check if the response was correct
      if (Response !== false) {
        state.MusicPlayer.currentPlayback = Response;
      }
      // get song URL from mock or server
      let SongURL = '';
      if (process.env.VUE_APP_API_CLIENT === 'server') {
        SongURL = `${api}/api/v1/streaming/${state.MusicPlayer.currentPlayback.item.id}`;
      } else if (process.env.VUE_APP_API_CLIENT === 'mock') {
        SongURL = state.MusicPlayer.currentPlayback.item.href;
      }
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
  /**
   * it sets the player volume using the value set in store and sends the request to the server
   * @param {*} VeuxStore the current store used for the app
   */
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
  /**
   * it sets the player volume to muted or not, if not muted it sets it to the last recorded value
   * from the store and sends the requests to the server
   * @param {*} VeuxStore the current store used for the app
   */
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
  async playpauseplaylist({ state, dispatch }, playstatus, song) {
    if (song === state.MusicPlayer.currentSong) {
      dispatch('togglePlayact');
    } else {
      state.MusicPlayer.isFirstPlay = true;
      state.MusicPlayer.isPlaying = false;
      state.MusicPlayer.AudioPlayer.pause();
      dispatch('togglePlayact');
    }
  },
};
