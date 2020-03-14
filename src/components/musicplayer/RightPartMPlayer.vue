<template>
  <div>
    <v-btn to="/home/queue">
      <v-icon dense medium>mdi-playlist-play</v-icon>
    </v-btn>
    <v-btn>
      <v-icon
        dense
        medium
        @click="toggleSound"
        v-if="!$store.state.MusicPlayer.isMute"
        >mdi-volume-medium</v-icon
      >
      <v-icon dense medium @click="toggleSound" v-else>mdi-volume-mute</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    toggleSound() {
      this.$store.commit('toggleSound');
    },
  },
};
</script>

<style scoped></style>
