<template>
  <v-container fluid v-if="ready">
    <v-row justify="center">
      <v-col sm='12' md='6' lg="4" class="my-2 pr-0">
        <playlistCard :songsNum="songsNum" :images="listInfo.images"
          :name="listInfo.name" :owners="listInfo.artists" :show="show"></playlistCard>
      </v-col>
      <v-col sm='12' md='6' lg="8" class="my-1 pl-0 text-truncate">
        <songsCard v-for="(song,index) in songs" :key="song.id"
          :counter="index" :song="song"></songsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import List from '@/api/mock';
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
      listInfo: {
        images: {
          url: '',
          width: 0,
          height: 0,
        },
        artists: [{
          name: '',
        }],
      },
    };
  },
  methods: {
    async fetchSongs() {
      this.ready = false;
      this.show = true;
      this.songs = [];
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
      const result = await analyze(this.listInfo.images.url);
      EventBus.$emit('changeColor', result[2].color);
      this.ready = true;
      this.songs = await List.fetchSongs(this.listInfo.id);
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
