import PlayerRequests from './Requests';
import api from '../../../common/config';
/**
 * @module
 * Store Actions For asynchronus Global Methods
 */
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
      /* istanbul ignore next */
      state.MusicPlayer.AudioPlayer.onerror = () => {
        state.MusicPlayer.isFirstPlay = true;
        state.MusicPlayer.isPlaying = false;
      };
      let Response = await PlayerRequests.playTrack(state.MusicPlayer.currentSong.track.id
      // eslint-disable-next-line no-underscore-dangle
        || state.MusicPlayer.currentSong.track._id);
      if (process.env.VUE_APP_API_CLIENT !== 'server') Response = true;
      // check if the response was correct
      if (Response === false) return;
      // TODO[@Seif] remove later when naiera changes fetch currentplayback
      state.MusicPlayer.currentSong = await PlayerRequests.fetchCurrentPlayback().then(
        (data) => {
          if (data.currentlyPlaying.track === null) {
            return false;
          }
          return data.currentlyPlaying;
        },
      );

      // get song URL from mock or server
      let SongURL = '';
      /* istanbul ignore next */
      if (process.env.VUE_APP_API_CLIENT === 'server') {
        // eslint-disable-next-line no-underscore-dangle
        SongURL = `${api}/api/v1/streaming/${state.MusicPlayer.currentSong.track.id || state.MusicPlayer.currentSong.track._id}`;
      } else {
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
        /* istanbul ignore next */
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
  /**
   *It changes the current Playback for a song played from a playlist
   * @param {*} VeuxStore the current store used for the app
   * @param {*} param an On=bject containing the current state of playback and the song to be played
   */
  async playpauseplaylist({ state, dispatch }, param) {
    if (param.playstatus === true && param.song === state.MusicPlayer.currentSong) {
      state.MusicPlayer.isFirstPlay = true;
      state.MusicPlayer.isPlaying = false;
      state.MusicPlayer.AudioPlayer.pause();
      state.MusicPlayer.unShuffledList = state.MusicPlayer.currentList;
      dispatch('togglePlayact');
    } else {
      state.MusicPlayer.isPlaying = true;
      dispatch('togglePlayact');
    }
  },
  /**
   * It Playes the Song in the Store from the Start as a New Song
   * @param {*} VeuxStore the current store used for the app
   */
  async playNewSong({ state, dispatch }) {
    state.MusicPlayer.isFirstPlay = true;
    state.MusicPlayer.isPlaying = false;
    state.MusicPlayer.AudioPlayer.pause();
    dispatch('togglePlayact');
  },
};
