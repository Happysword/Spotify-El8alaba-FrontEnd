<template>
  <v-footer app dark class="mock-player" height="90">
    <v-container fluid class="mx-0 pa-0">
      <v-row>
        <v-col align-self="center" class="pa-0" cols="3">
          <LMusicP></LMusicP>
        </v-col>
        <v-col align-self="center" class="pa-0" cols="6">
          <MMusicP></MMusicP>
        </v-col>
        <v-col align-self="center" class="pa-0" cols="3">
          <RMusicP></RMusicP>
        </v-col>
      </v-row> </v-container
  ></v-footer>
</template>

<script>
import LMusicP from './musicplayer/LeftPartMPlayer.vue';
import RMusicP from './musicplayer/RightPartMPlayer.vue';
import MMusicP from './musicplayer/MiddlePartMPlayer.vue';
import Requests from '../store/modules/MusicPlayer/Requests';

export default {
  components: {
    LMusicP,
    RMusicP,
    MMusicP,
  },

  async created() {
    this.$store.state.MusicPlayer.currentSong = await Requests.fetchCurrentSong();
    // eslint-disable-next-line no-console
    console.log(this.$store.state.MusicPlayer.currentSong);
  },
};
</script>

<style scoped>
.mock-player {
  color: white;
  width: 100%;
}
#mock-div {
  text-align: center;
}
</style>
