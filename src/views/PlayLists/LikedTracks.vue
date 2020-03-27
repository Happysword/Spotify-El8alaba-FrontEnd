<template>
  <v-container fluid v-if="ready">
    <v-row justify="center">
      <v-col sm='12' md='6' lg="4" class="my-2 pr-0">
        <playlistCard :songsNum="songsNum" :listInfo="listInfo" :show="show">
        </playlistCard>
      </v-col>
      <v-col sm='12' md='6' lg="8" class="my-1 pl-0 text-truncate">
        <songsCard v-for="(song,index) in songs" :key="index"
          :counter="index" :song="song" :list="songs">
        </songsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import List from '@/api/mock';
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
    async fetchSongs() {
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
        console.log(tracks);
        if (tracks !== {}) {
          for (let i = 0; i < tracks.length; i += 1) {
            tracks[i].track.artists = [{ name: 'Artist' }];
            tracks[i].track.album = { name: 'Album' };
          }
        }
        this.songs = tracks;
      } else if (this.$route.name === 'playlist') {
        this.listInfo = await List.fetchList(this.$route.params.id);
        this.songs = await List.fetchPlaylistSongs(this.listInfo.id);
      } else if (this.$route.name === 'album') {
        // this.listInfo = await List.fetchAlbum(this.$route.params.id);
        const album = await server.fetchAlbum('5e71de1c7e4ff73544999694');
        // console.log(album);
        this.listInfo = album;
        this.listInfo.images = [{ url: 'https://i.scdn.co/image/ccbb1e3bea2461e69783895e880965b171e29f4c' }];
        for (let i = 0; i < album.tracks.length; i += 1) {
          album.tracks[i].artists = [{ name: 'Artist' }];
          album.tracks[i].album = { name: 'Album' };
          this.songs[i] = { track: album.tracks[i] };
        }
        // this.songs = await List.fetchPlaylistSongs(this.listInfo.id);
      } else {
        return;
      }
      const result = await analyze(this.listInfo.images[0].url, { ignore: ['rgb(255,255,255)', 'rgb(0,0,0)'] });
      EventBus.$emit('changeColor', result[0].color);
      // console.log(result[0].color);
      this.ready = true;
      // const data = await Server.fetchSongs('5e71dd4d7e4ff73544999691', this.response.data.token);
      // this.songs = data;
      // console.log(this.songs[0].track.name);
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
    // const data = {
    //   email: 'ahisham360@gmail.com',
    //   password: 'shoma123',
    //   // email: 'user1@spotify.com',
    //   // password: '12345678',
    // };
    // const response = await server.loginUser(data);
    // console.log(response);
    // if (response.status === 200) {
    //   const currentUser = {
    //     token: response.data.token,
    //     data: response.data.data,
    //   };
    //   localStorage.setItem('currentUser', JSON.stringify(currentUser));
    // }
    this.fetchSongs();
  },

  watch: {
    $route: 'fetchSongs',
  },
};
</script>
