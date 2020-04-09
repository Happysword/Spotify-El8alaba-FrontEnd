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
      <v-overlay v-show="overlay" absolute>
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
    <v-card-title id="listName" class="justify-center headline font-weight-bold pb-0">
      {{listInfo.name}}
    </v-card-title>
    <v-card-title id="owner" class="justify-center body-2 text grey--text pt-0" v-if="show">
      <span v-for="(owner,i) in listInfo.artists" :key="i">{{owner.name}}</span>
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn
        id="playBtn"
        rounded
        inline-block
        dark
        color='#1DB954'
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
        v-if="show" size="30"
        class="px-3"
        @click="changeLiked"
        color="#E0E0E0"
      >
        mdi-heart-outline
      </v-icon>
      <v-icon
        id="remove"
        v-show="store.state.liked"
        v-if="show"
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
          <dropDown></dropDown>
        </v-menu>
      </span>
      <v-tooltip id="tooltip" right v-model="tooltip">
        <template v-slot:activator="{ on1 }">
          <v-icon v-on="on1"></v-icon>
        </template>
        <span>More</span>
      </v-tooltip>
    </v-card-actions>
    <p class="text-center grey--text" id="songNum">
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
    /**
     * Change status of the current song
     */
    changeStatus() {
      this.play = !this.play;
      this.overlay = this.play;
      EventBus.$emit('pause', this.play);
    },

    /**
     * Add or remove Current List to/from user's library
     */
    async changeLiked() {
      let response = {};
      store.commit('changeLiked');
      if (store.state.liked === true) {
        if (this.listInfo.type === 'album') {
          // response = await server.SaveAlbum('5e71de1c7e4ff73544999694');
          response = await server.SaveAlbum(this.listInfo.id);
        } else if (this.listInfo.type === 'playlist') {
          // TODO[@Naiera]: Follow this playlist
          response = await server.FollowPlaylist(this.listInfo.id);
        }
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          this.snackbar = true;
          this.text = 'Saved to Your Library';
        }
      } else if (store.state.liked === false) {
        if (this.listInfo.type === 'album') {
          // const response = await server.RemoveAlbum('5e71de1c7e4ff73544999694');
          response = await server.RemoveAlbum(this.listInfo.id);
        } else if (this.listInfo.type === 'playlist') {
          // TODO[@Naiera]: Unfollow this playlist
          response = await server.UnfollowPlaylist(this.listInfo.id);
        }
        console.log(response);
        if (response.status === 200) {
          this.snackbar = true;
          this.text = 'Removed from Your Library';
        }
      }
    },
  },

  async created() {
    let response = {};
    if (this.listInfo.type === 'album') {
      // const response = await server.CheckAlbum('5e71de1c7e4ff73544999694');
      response = await server.CheckAlbum(this.listInfo.id);
    } else if (this.listInfo.type === 'playlist') {
      response = await server.CheckPlaylist(this.listInfo.id);
      console.log(response);
    } else {
      return;
    }
    if (response.data.length !== 0 && response.data[0] === true) {
      store.state.liked = true;
    } else {
      store.state.liked = false;
    }
  },

  // /**
  //  * Check if there is an event
  //  */
  // mounted() {
  //   EventBus.$on('changePlay', (play, id) => {
  //     if (this.listInfo.id === id) {
  //       this.overlay = play;
  //       this.play = play;
  //     }
  //   });
  // },

  /**
   * Update play icon
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
    /**
     * Check if this list is the current list or not then set the status of it
     */
    changePlayEvent() {
      EventBus.$on('changePlay', (play, id) => {
        if (this.listInfo.id === id) {
          this.overlay = play;
          this.play = play;
        }
      });
      return true;
    },
  },
};
</script>
