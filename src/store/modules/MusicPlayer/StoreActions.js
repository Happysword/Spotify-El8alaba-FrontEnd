import PlayerRequests from './Requests';
import api from '../../../common/config';

export default {
  /**
   * it toggles the play and pause using the mutation in the store after checking
   * that the song was already playing else it fetches the song from server and starts playing it
   * @param {*} VuexStore the current store used for the app
   */
  async togglePlayact({ commit, state }) {
    // check if this is the first time to play this song i.e. not paused before
    if (state.MusicPlayer.isFirstPlay) {
      // on error of loading reset the song controlling parameters
      state.MusicPlayer.AudioPlayer.onerror = () => {
        state.MusicPlayer.isFirstPlay = true;
        state.MusicPlayer.isPlaying = false;
      };
      // send the request to server that we want to play this song
      const Response = await PlayerRequests.playTrack(
        // eslint-disable-next-line no-underscore-dangle
        state.MusicPlayer.currentSong.track._id,
      );
      // check if the response was correct
      if (Response === false) return;
      // get song URL from mock or server
      let SongURL = '';
      if (process.env.VUE_APP_API_CLIENT === 'server') {
        // eslint-disable-next-line no-underscore-dangle
        SongURL = `${api}/api/v1/streaming/${state.MusicPlayer.currentSong.track._id}`;
      } else if (process.env.VUE_APP_API_CLIENT === 'mock') {
        SongURL = 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_5MG.mp3';
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
      if (requestAnswer) {
        commit('togglePlay');
        state.MusicPlayer.AudioPlayer.play().catch(() => {
          state.MusicPlayer.isFirstPlay = true;
          state.MusicPlayer.isPlaying = false;
        });
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
      state.MusicPlayer.volumePercent,
    );
    // if the response was correct we change the volume and set isMute respectively
    if (Response) {
      state.MusicPlayer.AudioPlayer.volume = state.MusicPlayer.volumePercent / 100;
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
    if (state.MusicPlayer.volumePercent === 0) {
      const Response = await PlayerRequests.setVolume(
        state.MusicPlayer.lastVolrecord,
      );
      if (Response) {
        state.MusicPlayer.AudioPlayer.volume = state.MusicPlayer.lastVolrecord / 100;
        state.MusicPlayer.volumePercent = state.MusicPlayer.lastVolrecord;
        state.MusicPlayer.isMute = false;
      }
    } else {
      // if not muted then we set the volume to zero and send the requests
      const Response = await PlayerRequests.setVolume(0);
      if (Response) {
        state.MusicPlayer.lastVolrecord = state.MusicPlayer.AudioPlayer.volume * 100;
        state.MusicPlayer.AudioPlayer.volume = 0;
        state.MusicPlayer.volumePercent = 0;
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
  async playNewSong({ state, dispatch }) {
    state.MusicPlayer.isFirstPlay = true;
    state.MusicPlayer.isPlaying = false;
    state.MusicPlayer.AudioPlayer.pause();
    dispatch('togglePlayact');
  },
};
