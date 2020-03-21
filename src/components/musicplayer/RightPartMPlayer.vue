<template>
  <v-layout align-content-center row justify-center>
    <v-spacer></v-spacer>
    <v-flex shrink>
      <v-btn @click="queueChange" text x-small>
        <v-icon color="grey" dense medium>mdi-playlist-play</v-icon>
      </v-btn>
    </v-flex>

    <v-flex shrink>
      <v-btn text x-small @click="toggleSound">
        <v-icon
          color="grey"
          dense
          medium
          v-if="!$store.state.MusicPlayer.isMute"
          >mdi-volume-medium</v-icon
        >
        <v-icon color="grey" dense medium v-else>mdi-volume-mute</v-icon>
      </v-btn>
    </v-flex>

    <v-flex>
      <v-progress-linear
        id="volume-bar"
        background-color="grey"
        color="green"
        rounded
        @change="setVolume"
        v-model="$store.state.MusicPlayer.currentPlayback.device.volume_percent"
      >
      </v-progress-linear>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    isInQueue: false,
  }),
  methods: {
    ...mapMutations(['toggleSound']),
    queueChange() {
      if (this.$router.currentRoute.name === 'queue') {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: 'queue' });
      }
    },
    setVolume() {
      this.$store.state.MusicPlayer.AudioPlayer.volume = this.$store.state.MusicPlayer
        .currentPlayback.device.volume_percent
        / 100;
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
