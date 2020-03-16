<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col sm='12' md='6' lg="4" class="my-2 pr-0">
        <playlistCard :songsNum="songsNum"></playlistCard>
      </v-col>
      <v-col sm='12' md='6' lg="8" class="my-1 pl-0">
        <songsCard v-for="(song,index) in songs" :key="song.id"
          :counter="index" :song="song"></songsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Song from '@/api/mock';
import playlistCard from '../../components/playlistCard.vue';
import songsCard from '../../components/SongsBar.vue';

export default {
  data() {
    return {
      songs: [],
      songsNum: 0,
    };
  },
  components: {
    playlistCard,
    songsCard,
  },
  async created() {
    this.songs = await Song.fetchSongs('123');
    this.songsNum = this.songs.length;
  },
};
</script>
