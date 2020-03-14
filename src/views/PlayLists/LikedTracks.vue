<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col sm='12' md='6' lg="3" class="my-2 pr-0">
        <playlistCard></playlistCard>
      </v-col>
      <v-col sm='12' md='6' lg="9" class="my-1 pl-0">
        <songsCard v-for="i in 10" :key="i" :songName="`Song ${i}`" SongTime="03:54" ></songsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import playlistCard from '../../components/playlistCard.vue';
import songsCard from '../../components/SongsBar.vue';

export default {
  name: 'Home',
  components: {
    playlistCard,
    songsCard,
  },
};
</script>
