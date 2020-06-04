<template>
  <v-card
    id="playlistCard"
    class="mx-auto px-5 white--text"
    color="#00000000"
    flat
    max-width="344"
    v-on:="changePlayEvent">
    <v-img
      id="image"
      @mouseover="overlay=true"
      @mouseout="overlay= play"
      :src="listInfo.images[0].url" class="mt-1"
    >
      <v-overlay v-show="overlay && (songsNum > 0)" absolute>
        <v-icon
          id="playIcon"
          size="70"
          color="white"
          v-if="!play"
          @click="changeStatus"
        >
          mdi-play-circle-outline
        </v-icon>
        <v-icon
          id="pauseIcon"
          size="70"
          color="white"
          v-if="play"
          @click="changeStatus"
        >
          mdi-pause-circle-outline
        </v-icon>
      </v-overlay>
    </v-img>
    <v-card-title id="listName" class="justify-center headline font-weight-bold pb-0 text-no-wrap">
      {{listInfo.name}}
    </v-card-title>
    <v-card-title id="owner" class="justify-center body-2 text grey--text pt-0" v-if="show">
      <span @click="RouteToOwnerPage()">{{owner.name}}</span>
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn
        id="playBtn"
        :disabled="songsNum === 0"
        rounded
        inline-block
        dark
        :color=btnColor
        class="mt-2 px-10"
        large
        @click="changeStatus"
      >
        {{playSong}}
      </v-btn>
    </v-card-actions>
    <v-card-actions class="justify-center">
      <v-icon
        id="save"
        v-show="!store.state.liked"
        v-if="show && songsNum && !isOwner"
        size="30"
        class="px-3"
        @click="changeLiked"
        color="#E0E0E0"
      >
        mdi-heart-outline
      </v-icon>
      <v-icon
        id="remove"
        v-show="store.state.liked"
        v-if="show && songsNum && !isOwner"
        size="30"
        color='#1DB954'
        class="px-3"
        @click="changeLiked"
      >
        mdi-heart
      </v-icon>
      <v-snackbar
        id="snackbar"
        v-model="snackbar"
        :timeout="timeout"
        color='#1DB954'
      >
        <h3 class="white--text title font-weight-light mx-auto">
          {{ text }}
        </h3>
      </v-snackbar>
      <span v-show="show">
        <v-menu absolute>
          <template v-slot:activator="{ on }">
            <v-icon
              id="more"
              size="30"
              class="px-3"
              v-on="on"
              @click="tooltip = false"
              @mouseover="tooltip = true"
              @mouseleave="tooltip = false"
              color="#E0E0E0"
            >
              mdi-dots-horizontal
            </v-icon>
          </template>
          <dropDown :id="listInfo.id" :type="listInfo.type"
            :public="listInfo.public" :ownerID="owner.id">
          </dropDown>
        </v-menu>
      </span>
      <v-tooltip id="tooltip" right v-model="tooltip">
        <template v-slot:activator="{ on1 }">
          <v-icon v-on="on1"></v-icon>
        </template>
        <span>More</span>
      </v-tooltip>
    </v-card-actions>
    <p class="text-center grey--text" id="songNum" v-if="songsNum !== 0">
      <span class="text-center grey--text" id="albumDate" v-if="listInfo.type === 'album'">
        {{listInfo.release_date.split('-')[0]}} .
      </span>
      {{songsNum}} Songs
    </p>
  </v-card>
</template>

<script>
import server from 'api-client';
import store from '../store';
import dropDown from './mockDropdown.vue';
import EventBus from '../EventBus';

/**
 * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
 * @vue-computed {Boolean} changePlayEvent Check if this
 * list is the current list or not then set the status of it
 */
export default {
  name: 'ListCard',
  data: () => ({

    overlay: false,
    playSong: 'Play',
    store,
    snackbar: false,
    text: '',
    timeout: 2000,
    tooltip: false,
    play: false,
    btnColor: '#1DB954',
    owner: {},
    isOwner: false,

  }),

  props: {
    songsNum: Number,
    show: {
      type: Boolean,
      default: true,
    },
    images: String,
    name: String,
    owners: Array,
    listInfo: {
      type: Object,
      default() {
        return {
          images: [{ url: '' }],
          name: '',
          release_date: '',
          id: '1',
          type: 'album',
        };
      },
    },
  },

  methods: {
    /* istanbul ignore next */
    /**
     * Route To Owner Page
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     */
    RouteToOwnerPage() {
      if (this.owner.type === 'artist') {
        this.$router.push(`/home/artist/${this.owner.id}`);
      } else {
        this.$router.push(`/home/user/${this.owner.id}`);
      }
    },

    /**
     * Change status of the current song
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     */
    changeStatus() {
      EventBus.$emit('pause', !this.play);
    },

    /**
     * Add or remove Current List to/from user's library
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     */
    async changeLiked() {
      let response = {};
      store.commit('changeLiked');
      if (store.state.liked === true) {
        if (this.listInfo.type === 'album') {
          response = await server.SaveAlbum(this.listInfo.id);
        } else if (this.listInfo.type === 'playlist') {
          response = await server.FollowPlaylist(this.listInfo.id);
        }
        if (response.status === 200 || response.status === 201) {
          this.snackbar = true;
          this.text = 'Saved to Your Library';
        }
      } else if (store.state.liked === false) {
        if (this.listInfo.type === 'album') {
          response = await server.RemoveAlbum(this.listInfo.id);
        } else if (this.listInfo.type === 'playlist') {
          response = await server.UnfollowPlaylist(this.listInfo.id);
        }
        if (response.status === 200) {
          this.snackbar = true;
          this.text = 'Removed from Your Library';
        }
      }
      if (this.listInfo.type === 'playlist') {
        server.fetchCurrentUserPlaylists(JSON.parse(localStorage.getItem('currentUser')).token)
          .then((res) => {
            store.state.userPlaylists = res;
          });
      }
    },
  },
  /**
   * Load Data
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   */
  async created() {
    if (this.listInfo.type === 'playlist') {
      this.owner = this.listInfo.owner;
    } else if (this.listInfo.type === 'album') {
      this.owner = this.listInfo.artists[0].userInfo
        ? this.listInfo.artists[0].userInfo : { id: null };
    }
    // eslint-disable-next-line no-underscore-dangle
    if (this.owner.id === JSON.parse(localStorage.getItem('currentUser')).data._id) this.isOwner = true;
    let response = {};
    if (this.listInfo.type === 'album') {
      response = await server.CheckAlbum(this.listInfo.id);
    } else if (this.listInfo.type === 'playlist') {
      response = await server.CheckPlaylist(this.listInfo.id);
    } else {
      return;
    }
    if (response.data.length !== 0 && response.data[0] === true && response.status === 200) {
      store.state.liked = true;
    } else {
      store.state.liked = false;
    }
  },

  /* istanbul ignore next */
  /**
   * Update play icon
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   */
  updated() {
    if (this.play === true) {
      this.playSong = 'Pause';
    } else {
      this.playSong = 'Play';
    }
  },

  components: {
    dropDown,
  },

  computed: {
    changePlayEvent() {
      EventBus.$on('changePlay', (play, id) => {
        if (this.listInfo.id === this.$store.state.MusicPlayer.ID || this.listInfo.id === id) {
          this.overlay = play;
          this.play = play;
        }
      });
      return true;
    },
  },
};
</script>
<style scoped>
#owner:hover,#album:hover {
  color: rgba(255, 255, 255, 0.911);
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
