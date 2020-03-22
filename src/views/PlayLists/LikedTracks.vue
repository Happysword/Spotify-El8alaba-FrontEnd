<template>
  <v-container fluid v-if="ready">
    <v-row justify="center">
      <v-col sm='12' md='6' lg="4" class="my-2 pr-0">
        <playlistCard :songsNum="songsNum" :listInfo="listInfo" :show="show">
        </playlistCard>
      </v-col>
      <v-col sm='12' md='6' lg="8" class="my-1 pl-0 text-truncate">
        <songsCard v-for="(song,index) in songs" :key="index"
          :counter="index" :song="song">
        </songsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import List from '@/api/mock';
import pList from '@/api/server';
import analyze from 'rgbaster';
import EventBus from '../../EventBus';
import playlistCard from '../../components/playlistCard.vue';
import songsCard from '../../components/SongsBar.vue';

export default {
  data() {
    return {
      songs: [],
      songsNum: 0,
      show: true,
      ready: false,
      listInfo: {},
    };
  },
  methods: {
    async fetchSongs() {
      this.ready = false;
      this.show = true;
      this.songs = [];
      const data = {
        email: 'user1@spotify.com',
        password: '12345678',
      };
      const response = await pList.loginUser(data);
      console.log(response);

      if (this.$route.name === 'LikedTracks') {
        this.listInfo = await List.fetchList('LikedTracks');
        this.show = false;
      } else if (this.$route.name === 'playlist') {
        this.listInfo = await List.fetchList(this.$route.params.id);
      } else if (this.$route.name === 'album') {
        this.listInfo = await List.fetchAlbum(this.$route.params.id);
      } else {
        return;
      }
      const result = await analyze(this.listInfo.images[0].url);
      EventBus.$emit('changeColor', result[2].color);
      this.ready = true;
      this.songs = await pList.fetchSongs('5e71dd4d7e4ff73544999691', response.data.token);
      // this.songs = await List.fetchPlaylistSongs(this.listInfo.id);
      console.log(this.songs);
      if (!Array.isArray(this.songs)) {
        return;
      }
      this.songsNum = this.songs.length;
    },
  },
  components: {
    playlistCard,
    songsCard,
  },
  async created() {
    this.fetchSongs();
  },

  watch: {
    $route: 'fetchSongs',
  },
};
</script>
