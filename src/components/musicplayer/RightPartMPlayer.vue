<template>
  <v-layout align-content-center row justify-center>
    <v-spacer></v-spacer>
    <v-flex shrink>
      <v-btn @click="queueChange" text x-small id="queue-btn">
        <v-icon
          :color="$route.name === 'queue' ? 'green' : 'grey'"
          dense
          medium
          >mdi-playlist-play</v-icon
        >
      </v-btn>
    </v-flex>

    <v-flex shrink>
      <v-btn text x-small @click="toggleSound">
        <v-icon
          color="grey"
          dense
          medium
          id="not-mute-btn"
          v-if="!$store.state.MusicPlayer.isMute"
          >mdi-volume-medium</v-icon
        >
        <v-icon color="grey" dense medium v-else id="mute-btn"
          >mdi-volume-mute</v-icon
        >
      </v-btn>
    </v-flex>

    <v-flex>
      <v-progress-linear
        id="volume-bar"
        background-color="grey darken-3"
        :color="barHover ? 'green' : 'grey'"
        @mouseenter="barHover = true"
        @mouseleave="barHover = false"
        height="5"
        rounded
        @change="setVolume"
        v-model="$store.state.MusicPlayer.volumePercent"
      >
      </v-progress-linear>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    isInQueue: false,
    barHover: false,
  }),
  methods: {
    ...mapActions(['setVolume', 'toggleSound']),
    /**
     * Changes the Route to Queue or to the Previos route if in Queue
     */
    queueChange() {
      if (this.$router.currentRoute.name === 'queue') {
        this.$router.go(-1);
        this.isInQueue = false;
      } else {
        this.$router.push({ name: 'queue' });
        this.isInQueue = true;
      }
    },
  },
};
</script>

<style scoped>
#volume-bar {
  width: 100px;
  top: 50%;
}
</style>
