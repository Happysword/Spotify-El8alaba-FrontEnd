<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col sm='12' md='6' lg="4" class="my-2 pr-0">
        <playlistCard></playlistCard>
      </v-col>
      <v-col sm='12' md='6' lg="8" class="my-1 pl-0">
        <songsCard v-for="song in songs" :key="song.id" :song="song"></songsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import getSongs from '@/store/getSongs';
import playlistCard from '../../components/playlistCard.vue';
import songsCard from '../../components/SongsBar.vue';

export default {
  data() {
    return {
      songs: [],
    };
  },
  components: {
    playlistCard,
    songsCard,
  },
  async created() {
    this.songs = await getSongs.getSongs('123');
  },
};
</script>
