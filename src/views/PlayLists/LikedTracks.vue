<template>
  <div>
  <v-container fluid v-if="ready">
    <v-row justify="center">
      <v-col sm='12' md='6' lg="4" class="my-2 pr-0">
        <playlistCard :songsNum="songsNum" :listInfo="listInfo" :show="show">
        </playlistCard>
      </v-col>
      <v-col sm='12' md='6' lg="8" class="my-1 pl-0 text-truncate" v-if="songsNum">
        <songsCard v-for="(song,index) in songs"
          :key="index"
          :counter="index"
          :song="song"
          :list="songs"
          :listid="listInfo.id"
          :listType="listInfo.type"
          :listOwner="ownerID"
        >
        </songsCard>
      </v-col>
      <v-col sm='12' md='6' lg="8" v-if="!songsNum">
        <emptyList :ownerID="ownerID" :listId="listInfo.id" :type="listInfo.type"></emptyList>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-if="!ready">
    <v-row>
      <v-col sm='12' md='6' lg="4" class="my-2 pr-0">
        <v-skeleton-loader
          ref="skeleton"
          type="card"
          class="mx-auto px-6"
          dark
        ></v-skeleton-loader>
      </v-col>
      <v-col sm='12' md='6' lg="8" class="my-1 pl-0">
        <v-skeleton-loader
          v-for="i in 6"
          :key="i"
          ref="skeleton"
          type="list-item-avatar-two-line"
          class="mx-auto px-6 py-1"
          dark
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-duplicates
import server from 'api-client';
import analyze from 'rgbaster';
import EventBus from '../../EventBus';
import playlistCard from '../../components/playlistCard.vue';
import songsCard from '../../components/SongsBar.vue';
import emptyList from '../../components/EmptyList.vue';

/**
 * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
 */
export default {
  data() {
    return {
      songs: [],
      songsNum: 0,
      show: true,
      ready: false,
      listInfo: {},
      test: false,
      ownerID: '',
    };
  },
  methods: {
    /**
     * Load view data depending on the route id
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     */
    async LoadPage() {
      this.ownerID = '';
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
          type: 'Liked',
        };
        this.show = false;
        const tracks = await server.fetchSavedTracks();
        this.songs = tracks;
      } else if (this.$route.name === 'playlist') {
        this.listInfo = await server.fetchList(this.$route.params.id);
        this.ownerID = this.listInfo.owner.id;
        this.songs = await server.fetchSongs(this.listInfo.id);
      } else if (this.$route.name === 'album') {
        const album = await server.fetchAlbum(this.$route.params.id);
        this.listInfo = album;
        this.songs = await server.fetchAlbumSongs(this.listInfo.id);
      } else {
        return;
      }
      if (this.listInfo.images.length === 0) {
        this.listInfo.images = [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/240px-Spotify_logo_without_text.svg.png' }];
      }
      this.ready = true;
      if (!Array.isArray(this.songs)) {
        return;
      }
      this.songsNum = this.songs.length;
      if (this.songsNum === 0) {
        this.listInfo.images = [{ url: 'https://getdrawings.com/free-icon-bw/black-music-icons-23.png' }];
        EventBus.$emit('changeColor', 'rgb(50,50,50)');
        return;
      }
      /* istanbul ignore next */
      if (!this.test) {
        analyze(this.listInfo.images[0].url, { ignore: ['rgb(255,255,255)', 'rgb(0,0,0)'] }, { scale: 0.6 })
          .then((result) => {
            EventBus.$emit('changeColor', result[0].color);
          }).catch((err) => {
            EventBus.$emit('changeColor', 'rgb(150,150,150)');
            console.log(err.message);
          });
      }
    },
  },
  components: {
    playlistCard,
    songsCard,
    emptyList,
  },
  async created() {
    this.LoadPage();
  },
  /* istanbul ignore next */
  mounted() {
    EventBus.$on('reload', (id) => {
      if (id === this.$route.params.id) {
        this.LoadPage();
      }
    });
  },
  watch: {
    $route: 'LoadPage',
  },
};
</script>
