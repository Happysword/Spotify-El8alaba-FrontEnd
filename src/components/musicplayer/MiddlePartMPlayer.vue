<template>
  <v-layout column>
    <v-row class="mx-0">
      <v-layout row align-center justify-center>
        <v-icon
          :color="shuffleState === true ? 'green' : 'grey'"
          class="mx-4 player-buttons"
          dense
          small
          @click="toggleShuffle"
        >
          mdi-shuffle-variant
        </v-icon>

        <v-icon
          color="grey"
          class="mx-4 player-buttons"
          dense
          medium
          @click="skipPrevious"
        >
          mdi-skip-previous
        </v-icon>

        <v-icon
          color="grey"
          class="mx-4 player-buttons"
          dense
          x-large
          v-if="$store.state.MusicPlayer.isPlaying"
          @click="togglePlayact"
        >
          mdi-pause-circle-outline
        </v-icon>

        <v-icon
          color="grey"
          class="mx-4 player-buttons"
          dense
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
          @click="skipNext"
        >
          mdi-skip-next
        </v-icon>

        <v-icon
          :color="repeatState === 'track' ? 'green' : 'grey'"
          class="mx-4 player-buttons"
          dense
          small
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
            {{ currentSongTime }}
          </div>
        </v-col>

        <!-- TODO[@Seif] Fix the V-model with the correct property when streaming works  -->
        <v-col class="mt-3 mb-3 mr-0 pa-0">
          <v-progress-linear
            background-color="grey"
            color="green"
            rounded
            v-model="$store.state.MusicPlayer.currentPlayback.progress_ms"
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
  }),
  methods: {
    ...mapActions(['togglePlayact']),
    async skipNext() {
      await PlayerRequests.skipNext();
    },
    async skipPrevious() {
      await PlayerRequests.skipPrevious();
    },
    async toggleRepeat() {
      const Response = await PlayerRequests.toggleRepeat(this.repeatState);
      if (Response && this.repeatState === 'off') {
        this.repeatState = 'track';
        this.$store.state.MusicPlayer.AudioPlayer.loop = true;
      } else if (Response && this.repeatState === 'track') {
        this.repeatState = 'off';
        this.$store.state.MusicPlayer.AudioPlayer.loop = false;
      }
    },
    async toggleShuffle() {
      const Response = await PlayerRequests.toggleShuffle(this.shuffleState);
      if (Response) {
        this.shuffleState = !this.shuffleState;
      }
    },
  },

  computed: {
    totalSongTime() {
      const SongTimeinS = Math.floor(
        this.$store.state.MusicPlayer.currentSong.item.duration_ms / 1000,
      );
      const TimeString = `${Math.floor(
        SongTimeinS / 60,
      ).toString()}:${Math.floor(SongTimeinS % 60).toString()}`;
      return TimeString;
    },

    currentSongTime() {
      const SongTimeinS = Math.floor(
        this.$store.state.MusicPlayer.currentPlayback.progress_ms / 1000,
      );
      const TimeString = `${Math.floor(
        SongTimeinS / 60,
      ).toString()}:${Math.floor(SongTimeinS % 60).toString()}`;
      return TimeString;
    },
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
