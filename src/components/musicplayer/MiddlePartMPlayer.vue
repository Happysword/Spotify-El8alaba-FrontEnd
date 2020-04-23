<template>
  <v-layout column>
    <v-row class="mx-0">
      <v-layout row align-center justify-center>
        <v-icon
          :color="shuffleState === true ? 'green' : 'grey'"
          class="mx-4 player-buttons"
          dense
          small
          id="shuffle-btn"
          @click="toggleShuffle"
          :disabled="$store.state.MusicPlayer.adTime"
        >
          mdi-shuffle-variant
        </v-icon>

        <v-icon
          color="grey"
          class="mx-4 player-buttons"
          dense
          medium
          id="skip-previous-btn"
          :disabled="$store.state.MusicPlayer.adTime"
          @click="skipPrevious"
        >
          mdi-skip-previous
        </v-icon>

        <v-icon
          color="grey"
          class="mx-4 player-buttons"
          dense
          x-large
          id="pause-btn"
          v-if="$store.state.MusicPlayer.isPlaying"
          :disabled="$store.state.MusicPlayer.adTime"
          @click="togglePlayact"
        >
          mdi-pause-circle-outline
        </v-icon>

        <v-icon
          color="grey"
          class="mx-4 player-buttons"
          dense
          id="play-btn"
          x-large
          v-else
          :disabled="$store.state.MusicPlayer.adTime"
          @click="togglePlayact"
        >
          mdi-play-circle-outline
        </v-icon>

        <v-icon
          color="grey"
          class="mx-4 player-buttons"
          dense
          medium
          id="skip-next-btn"
          :disabled="$store.state.MusicPlayer.adTime"
          @click="skipNext"
        >
          mdi-skip-next
        </v-icon>

        <v-icon
          :color="repeatState === 'track' ? 'green' : 'grey'"
          class="mx-4 player-buttons"
          dense
          small
          id="repeat-btn"
          :disabled="$store.state.MusicPlayer.adTime"
          @click="toggleRepeat"
        >
          mdi-repeat
        </v-icon>
      </v-layout>
    </v-row>

    <v-row align-content="center" justify="center" class="mx-0" no-gutters>
      <v-layout justify-center align-center row>
        <v-col class="ml-5 mr-0 pa-0 justify-space-between" cols="1">
          <div
            class="mx-3 pa-0"
            id="number-div-left"
            v-if="!(this.$store.state.MusicPlayer.currentSong === false)"
          >
            {{ $store.state.MusicPlayer.currentSongTime }}
          </div>
        </v-col>

        <v-col class="mt-3 mb-3 mr-0 pa-0">
          <v-progress-linear
            background-color="grey darken-3"
            :color="barHover ? 'green' : 'grey'"
            @mouseenter="barHover = true"
            @mouseleave="barHover = false"
            height="5"
            rounded
            id="seek-bar"
            @change="seekPosition"
            v-model="$store.state.MusicPlayer.currentBufferPerc"
          >
          </v-progress-linear>
        </v-col>

        <v-col class="pa-0" cols="1">
          <div
            id="number-div-right"
            class="mx-3 mb-0"
            v-if="!(this.$store.state.MusicPlayer.currentSong === false)"
          >
            {{ totalSongTime }}
          </div>
        </v-col>
      </v-layout>
    </v-row>
  </v-layout>
</template>

<script>
import api from 'api-client';
import { mapActions } from 'vuex';
import PlayerRequests from '../../store/modules/MusicPlayer/Requests';
/* eslint-disable no-underscore-dangle */

/**
 * @vue-data {Boolean} shuffleState - State of the Shuffle
 * @vue-data {String} repeatState - State of the Shuffle
 * @vue-data {Boolean} barHover - Hover State of the Progress Bar
 * @vue-data {Number} valueFalseBuffer - Value saved For the Bar before the request is accepted
 * @vue-data {Array} songList - Saves the unShuffled List
 * @vue-data {Number} songindex - Saves the Current song Index in the Unshuffled List
 * @vue-data {Number} skipnum - Number of songs skips the user made
 * @vue-data {String} userType - Type of the User
 * @vue-data {HTMLAudioElement} adAudio - The Audip Element that has the Ad played
 * @vue-computed {String} totalSongTime
 * @vue-computed {String} currentSongTime
*/
export default {
  data: () => ({
    shuffleState: false,
    repeatState: 'off',
    barHover: false,
    valueFalseBuffer: 0,
    songList: [],
    songindex: 0,
    skipnum: 0,
    userType: '',
    adAudio: new Audio('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3'),
  }),
  methods: {
    ...mapActions(['togglePlayact', 'playNewSong']),
    /**
    * Plays an Ad for Free Users Every 3 Skips
    */
    async adPlay() {
      if (this.userType === 'free') this.skipnum += 1;
      if (this.skipnum === 3) {
        if (this.$store.state.MusicPlayer.isPlaying) {
          await this.togglePlayact();
        }
        this.$store.state.MusicPlayer.adTime = true;
        await this.adAudio.play();
        this.skipnum = 0;
      }
    },
    /**
     * Skips to the Next Song in the queue
     */
    async skipNext() {
      await this.adPlay();
      if (!this.$store.state.MusicPlayer.adTime) {
        const listlen = this.$store.state.MusicPlayer.currentList.length;
        let listindex = this.$store.state.MusicPlayer.currentSongIndexinList;
        listindex += 1;
        if (listlen === listindex) listindex = 0;
        if (listlen === 1) listindex = 0;
        this.$store.state.MusicPlayer.currentSongIndexinList = listindex;
        console.log(this.$store.state.MusicPlayer.currentSongIndexinList);
        this.$store.state.MusicPlayer.currentSong = this.$store.state.MusicPlayer.currentList[
          listindex
        ];
        // the song is played for the first time and play it
        this.$store.dispatch('playNewSong');
      }
    },
    /**
     * Skips to the previous Song in the queue
     */
    async skipPrevious() {
      await this.adPlay();
      if (!this.$store.state.MusicPlayer.adTime) {
        const listlen = this.$store.state.MusicPlayer.currentList.length;
        let listindex = this.$store.state.MusicPlayer.currentSongIndexinList;
        listindex -= 1;
        if (listindex === -1) listindex = listlen - 1;
        if (listlen === 1) listindex = 0;
        this.$store.state.MusicPlayer.currentSongIndexinList = listindex;
        this.$store.state.MusicPlayer.currentSong = this.$store.state.MusicPlayer.currentList[
          listindex
        ];
        // the song is played for the first time and play it
        this.$store.dispatch('playNewSong');
      }
    },
    /**
     * Toggles Repeat to One Song or Off
     */
    async toggleRepeat() {
      let Response;
      if (this.repeatState === 'off') {
        Response = await PlayerRequests.toggleRepeat('track');
      } else if (this.repeatState === 'track') {
        Response = await PlayerRequests.toggleRepeat('off');
      }
      if (Response && this.repeatState === 'off') {
        this.repeatState = 'track';
        this.$store.state.MusicPlayer.AudioPlayer.loop = true;
      } else if (Response && this.repeatState === 'track') {
        this.repeatState = 'off';
        this.$store.state.MusicPlayer.AudioPlayer.loop = false;
      }
    },
    /**
     * Toggles the Shuffle State of the Queue to On or Off
     */
    async toggleShuffle() {
      const Response = await PlayerRequests.toggleShuffle(!this.shuffleState);
      if (Response) {
        this.shuffleState = !this.shuffleState;
      }
      if (this.shuffleState) {
        // shuffle the array song list using sort method
        this.songList = JSON.parse(JSON.stringify(this.$store.state.MusicPlayer.currentList));
        const temparray = this.$store.state.MusicPlayer.currentList;
        temparray.sort(() => Math.random() - 0.5);
        // save the index in the data
        const songObj = temparray.filter((song) => song.track.id === this
          .$store.state.MusicPlayer.currentSong.track.id);
        this.songindex = temparray.indexOf(songObj[0]);
        this.$store.state.MusicPlayer.currentSongIndexinList = this.songindex;
        // swaping the values of the lists to be saved in the data
        this.$store.state.MusicPlayer.currentList = temparray;
      } else {
        // swaping the values of the lists to get the old list values
        this.$store.state.MusicPlayer.currentList = JSON.parse(JSON.stringify(this.songList));
        // save the index in the data
        const songObj = this.songList.filter((song) => song.track.id === this
          .$store.state.MusicPlayer.currentSong.track.id);
        this.songindex = this.songList.indexOf(songObj[0]);
        this.$store.state.MusicPlayer.currentSongIndexinList = this.songindex;
      }
    },
    /**
     * Seeks the Bar of the Player to the Position clicked by the User
     */
    async seekPosition() {
      const seekedTime = (this.$store.state.MusicPlayer.currentBufferPerc / 100)
      * this.$store.state.MusicPlayer.AudioPlayer.duration;
      const Response = await PlayerRequests.seekPosition(
        Math.floor(seekedTime * 1000),
      );
      /* istanbul ignore next */
      if (Response) {
        this.$store.state.MusicPlayer.AudioPlayer.currentTime = seekedTime;
        this.valueFalseBuffer = this.$store.state.MusicPlayer.currentBufferPerc;
      } else {
        this.$store.state.MusicPlayer.currentBufferPerc = this.valueFalseBuffer;
      }
    },
  },

  computed: {
    totalSongTime() {
      if (!this.$store.state.MusicPlayer.adTime) {
        const SongTimeinS = Math.floor(
          this.$store.state.MusicPlayer.currentSong.track.duration_ms / 1000,
        );
        const TimeString = `${Math.floor(
          SongTimeinS / 60,
        ).toString()}:${Math.floor(SongTimeinS % 60).toString()}`;
        return TimeString;
      }
      const SongTimeinS = Math.floor(this.adAudio.duration);
      const TimeString = `${Math.floor(
        SongTimeinS / 60,
      ).toString()}:${Math.floor(
        (SongTimeinS % 60) / 10,
      ).toString()}${Math.floor(SongTimeinS % 10).toString()}`;
      return TimeString;
    },

    currentSongTime: {
      get() {
        const SongTimeinS = Math.floor(
          this.$store.state.MusicPlayer.AudioPlayer.currentTime,
        );
        const TimeString = `${Math.floor(
          SongTimeinS / 60,
        ).toString()}:${Math.floor(SongTimeinS % 60).toString()}`;
        return TimeString;
      },
    },
  },
  /* istanbul ignore next */
  async created() {
    // AudioPlayer onend the player skips Next and if last song Stops
    this.$store.state.MusicPlayer.AudioPlayer.onended = () => {
      if (
        this.$store.state.MusicPlayer.currentSongIndexinList === this
          .$store.state.MusicPlayer.currentList.length - 1
      ) {
        this.$store.state.MusicPlayer.isFirstPlay = true;
        this.$store.state.MusicPlayer.isPlaying = false;
      } else {
        this.skipNext();
      }
    };
    // AdAudio Player on ended sets the Flag back to false and skips to next Song
    this.adAudio.onended = () => {
      this.$store.state.MusicPlayer.adTime = false;
      this.skipNext();
    };
    // AdAudio ontimeupdate it changes the seekbar and the currentTime
    this.adAudio.ontimeupdate = () => {
      this.$store.state.MusicPlayer.currentBufferPerc = (this.adAudio.currentTime
      / this.adAudio.duration) * 100;

      const SongTimeinS = Math.floor(this.adAudio.currentTime);
      const TimeString = `${Math.floor(
        SongTimeinS / 60,
      ).toString()}:${Math.floor(
        (SongTimeinS % 60) / 10,
      ).toString()}${Math.floor(SongTimeinS % 10).toString()}`;

      this.$store.state.MusicPlayer.currentSongTime = TimeString;
    };
    // Sends the Request to get the Current Playback of the User
    if (process.env.VUE_APP_API_CLIENT === 'server') {
      this.$store.state.MusicPlayer.currentSong = false;
      this.$store.state.MusicPlayer.currentList = [this.$store.state.MusicPlayer.currentSong];
      this.$store.state.MusicPlayer.currentSong = await PlayerRequests.fetchCurrentPlayback().then(
        (data) => {
          if (data.currentlyPlaying.track === null) {
            return false;
          }
          this.$store.state.MusicPlayer.currentList = [data.currentlyPlaying];
          try {
            this.$store.state.MusicPlayer.Type = data.currentlyPlaying.context.type;
            const array = data.currentlyPlaying.context.uri.split(':');
            // eslint-disable-next-line prefer-destructuring
            this.$store.state.MusicPlayer.ID = array[2];
          } catch (error) { console.log('missing context'); }
          return data.currentlyPlaying;
        },
      );
    }
    // Send the request of the UserInfo to get the User type for Ads
    this.userType = await api.getCurrentUserProfile().then((Resp) => Resp.data.product);
  },
  beforeDestroy() {
    if (this.$store.state.MusicPlayer.isPlaying === true) {
      this.$store.dispatch('togglePlayact');
    }
  },
};
</script>

<style scoped>
#number-div-left {
  color: rgb(146, 145, 145);
  font-size: 12px;
  text-align: end;
  font-family: Helvetica Neue, Helvetica, Arial, Hiragino Kaku Gothic Pro,
    Meiryo, MS Gothic, sans-serif;
}
.player-buttons:hover {
  color: white !important;
}
#number-div-right {
  color: rgb(146, 145, 145);
  font-size: 12px;
  text-align: start;
  font-family: Helvetica Neue, Helvetica, Arial, Hiragino Kaku Gothic Pro,
    Meiryo, MS Gothic, sans-serif;
}
</style>
