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
        >
          mdi-shuffle-variant
        </v-icon>

        <v-icon
          color="grey"
          class="mx-4 player-buttons"
          dense
          medium
          id="skip-previous-btn"
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
          @click="toggleRepeat"
        >
          mdi-repeat
        </v-icon>
      </v-layout>
    </v-row>

    <v-row align-content="center" justify="center" class="mx-0" no-gutters>
      <v-layout justify-center align-center row>
        <v-col class="ml-5 mr-0 pa-0 justify-space-between" cols="1">
          <div class="mx-3 pa-0" id="number-div-left">
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
          <div id="number-div-right" class="mx-3 mb-0">
            {{ totalSongTime }}
          </div>
        </v-col>
      </v-layout>
    </v-row>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import PlayerRequests from '../../store/modules/MusicPlayer/Requests';

export default {
  data: () => ({
    shuffleState: false,
    repeatState: 'off',
    barHover: false,
    valueFalseBuffer: 0,
    songList: [],
    songindex: 0,
  }),
  methods: {
    ...mapActions(['togglePlayact', 'playNewSong']),
    /**
     * Skips to the Next Song in the queue
     */
    async skipNext() {
      // await PlayerRequests.skipNext();
      const listlen = this.$store.state.MusicPlayer.currentList.length;
      let listindex = this.$store.state.MusicPlayer.currentSongIndexinList;
      listindex += 1;
      if (listlen === listindex) listindex = 0;
      if (listlen === 1) listindex = 0;
      this.$store.state.MusicPlayer.currentSongIndexinList = listindex;
      this.$store.state.MusicPlayer.currentSong = this.$store.state.MusicPlayer.currentList[
        listindex
      ];
      // the song is played for the first time and play it
      this.$store.dispatch('playNewSong');
    },
    /**
     * Skips to the previous Song in the queue
     */
    async skipPrevious() {
      // await PlayerRequests.skipPrevious();
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
        this.songList = this.$store.state.MusicPlayer.currentList;
        this.songList.sort(() => Math.random() - 0.5);
        // save the index in the data
        this.songindex = this.songList.indexOf(this.$store.state.MusicPlayer.currentSong);
        this.$store.state.MusicPlayer.currentSongIndexinList = this.songindex;
        // swaping the values of the lists to be saved in the data
        const temp = this.$store.state.MusicPlayer.currentList;
        this.$store.state.MusicPlayer.currentList = this.songList;
        this.songList = temp;
      } else {
        // swaping the values of the lists to get the old list values
        const temp = this.$store.state.MusicPlayer.currentList;
        this.$store.state.MusicPlayer.currentList = this.songList;
        this.songList = temp;
        // save the index in the data
        this.songindex = this.songList.indexOf(this.$store.state.MusicPlayer.currentSong);
        this.$store.state.MusicPlayer.currentSongIndexinList = this.songindex;
      }
    },
    // TODO[@Seif] check why seek bar doesnt work after sometime
    /**
     * Seeks the Bar of the Player to the Position clicked by the User
     */
    async seekPosition() {
      const seekedTime = (this.$store.state.MusicPlayer.currentBufferPerc / 100)
      * this.$store.state.MusicPlayer.AudioPlayer.duration;
      const Response = await PlayerRequests.seekPosition(Math.floor(seekedTime * 1000));
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
      const SongTimeinS = Math.floor(
        this.$store.state.MusicPlayer.currentSong.track.duration_ms / 1000,
      );
      const TimeString = `${Math.floor(
        SongTimeinS / 60,
      ).toString()}:${Math.floor(SongTimeinS % 60).toString()}`;
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
  async created() {
    // TODO[@Seif] later: fetch current playback and check if the song is not null
    // play track with faded for now and get current playback
    // maybe add that the Music player is empty at first like spotify
    this.$store.state.MusicPlayer.AudioPlayer.onended = () => {
      if (this.$store.state.MusicPlayer.currentSongIndexinList === this
        .$store.state.MusicPlayer.currentList.length - 1) {
        this.$store.state.MusicPlayer.isFirstPlay = true;
        this.$store.state.MusicPlayer.isPlaying = false;
      } else {
        this.skipNext();
      }
    };
    // to be removed later plays faded
    await PlayerRequests.playTrack('5e89e3032e9acf202cc3f28a');
    if (process.VUE_APP_API_CLIENT === 'server') {
      this.$store.state.MusicPlayer.currentSong = await PlayerRequests.fetchCurrentPlayback()
        .then((data) => data.currentlyPlaying);
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
