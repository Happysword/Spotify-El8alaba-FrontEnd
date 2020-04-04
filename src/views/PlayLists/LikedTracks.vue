<template>
  <v-container fluid v-if="ready">
    <v-row justify="center">
      <v-col sm='12' md='6' lg="4" class="my-2 pr-0">
        <playlistCard :songsNum="songsNum" :listInfo="listInfo" :show="show">
        </playlistCard>
      </v-col>
      <v-col sm='12' md='6' lg="8" class="my-1 pl-0 text-truncate">
        <songsCard v-for="(song,index) in songs" :key="index"
          :counter="index" :song="song" :list="songs" :listid="listInfo.id">
        </songsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line import/no-duplicates
// import List from '@/api/mock';
// eslint-disable-next-line import/no-duplicates
import server from 'api-client';
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
    /**
     * Load view data depending on the route id
     */
    async LoadPage() {
      this.ready = false;
      this.show = true;
      this.songs = [];

      if (this.$route.name === 'LikedTracks') {
        this.listInfo = {
          id: 'LikedTracks',
          images: [
            {
              height: 640,
              url: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
              width: 640,
            },
          ],
          name: 'Liked Songs',
        };
        this.show = false;
        const tracks = await server.fetchSavedTracks();
        // if (tracks !== {}) {
        //   for (let i = 0; i < tracks.length; i += 1) {
        //     tracks[i].track.artists = [{ name: 'Artist' }];
        //     tracks[i].track.album = { name: 'Album' };
        //   }
        // }
        this.songs = tracks;
      } else if (this.$route.name === 'playlist') {
        this.listInfo = await server.fetchList(this.$route.params.id);
        this.songs = await server.fetchSongs(this.listInfo.id);
      } else if (this.$route.name === 'album') {
        const album = await server.fetchAlbum(this.$route.params.id);
        this.listInfo = album;
        // this.listInfo.images = [{ url: 'https://i.scdn.co/image/ccbb1e3bea2461e69783895e880965b171e29f4c' }];
        // for (let i = 0; i < album.tracks.length; i += 1) {
        //   album.tracks[i].artists = [{ name: 'Artist' }];
        //   album.tracks[i].album = { name: 'Album' };
        //   this.songs[i] = { track: album.tracks[i] };
        // }
        this.songs = await server.fetchAlbumSongs(this.listInfo.id);
      } else {
        return;
      }

      const result = await analyze(this.listInfo.images[0].url, { ignore: ['rgb(255,255,255)', 'rgb(0,0,0)'] });
      EventBus.$emit('changeColor', result[0].color);
      this.ready = true;
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
    this.LoadPage();
  },

  watch: {
    $route: 'LoadPage',
  },
};
</script>
