<template>
<div>
  <v-snackbar
      id="snackbar"
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      color='#1DB954'
    >
      <h3 class="white--text title font-weight-light mx-auto">
        {{ snackbar.content }}
      </h3>
    </v-snackbar>
    <v-dialog :value="overlay" justify="center"
      overlay-color="#000000FF" overlay-opacity="0.7" dark>
        <h1 class="display-2 white--text text-center mb-12">
          Do you really want to delete this playlist?
        </h1>
      <div align="center">
        <v-btn
          justify="center"
          rounded
          dark
          outlined
          width="130"
          class="mx-8"
          @click="overlay = false"
        >
          Cancel
        </v-btn>
        <v-btn
          rounded
          width="130"
          color="#1DB954"
          @click="Delete()"
        >
          Delete
        </v-btn>
      </div>
    </v-dialog>
    <v-dialog :value="addOverlay" v-on:="reRender"
      overlay-color="#000000FF" overlay-opacity="0.8" dark>
      <div align="center">
      <v-icon
        class="mb-8 mx-0"
        color="#808080"
        size="70"
        @click="addOverlay = false"
      >
        mdi-close
      </v-icon>
      <h1 class="display-3 font-weight-bold white--text text-center mb-7">
        Add to Playlist
      </h1>
      <v-btn
        rounded
        width="160"
        color="#1DB954"
        class="mb-7"
        @click="$store.state.dialog = true; dialog=true"
      >
        New PlayList
      </v-btn>
      <createList v-if="dialog === true"></createList>
      </div>
      <v-row justify="center">
      <template v-for="(userlist,index) in $store.state.userPlaylists.items">
      <v-col sm="4" md="3" lg="2"
        v-if="userlist.owner.id === userId"
        :key="userlist.id">
        <v-card color="#50505020" justify="center" class="text-center mt-6"
          >
          <v-icon
          width="130"
          heiht="300"
          size="120"
          color="#F0F0F0"
          @mouseover="on = index"
          @mouseout="on = -1"
          @click="AddtoPlaylist(userlist.id)"
          >
          {{ on === index? 'mdi-music-note-plus':'mdi-music-note'}}
          </v-icon>
          <p class="text-center title pb-4">{{userlist.name}}</p>
        </v-card>
      </v-col>
      </template>
      </v-row>
    </v-dialog>
</div>
</template>

<script>
import server from 'api-client';
import EventBus from '../EventBus';
import createList from './CreatePlayList.vue';

/**
 * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
 */
export default {
  data() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        content: '',
      },
      over: false,
      overlay: false,
      addOverlay: false,
      dialog: false,
      trackId: '',
      listId: '',
      on: -1,
      // eslint-disable-next-line no-underscore-dangle
      userId: JSON.parse(localStorage.getItem('currentUser')).data._id,
    };
  },
  components: {
    createList,
  },
  methods: {
    /**
     * Unfollow User's List
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     */
    async Delete() {
      const response = await server.UnfollowPlaylist(this.listId);
      if (response.status === 200) {
        this.overlay = false;
        this.snackbar = {
          show: true,
          timeout: 2000,
          content: 'Removed from Your Library',
        };
        server.fetchCurrentUserPlaylists(JSON.parse(localStorage.getItem('currentUser')).token).then((res) => {
          this.$store.state.userPlaylists = res;
        });
      }
    },
    /**
     * Add song to playlist
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     */
    async AddtoPlaylist(id) {
      // eslint-disable-next-line no-underscore-dangle
      const response = await server.AddTrackToPlaylist(id, this.trackId);
      if (response === true) {
        this.addOverlay = false;
        this.snackbar = {
          show: true,
          timeout: 2000,
          content: 'Added to Playlist',
        };
      }
    },
  },
  computed: {
    reRender() {
      this.$forceUpdate(); // Force Vue to re-render the component
      return true;
    },
  },
  async mounted() {
    this.dialog = false;
    EventBus.$on('snackbar', (snackbar) => {
      this.snackbar = snackbar;
    });

    EventBus.$on('overlay', (overlay, id) => {
      this.overlay = overlay;
      this.listId = id;
    });

    EventBus.$on('addOverlay', (overlay, id) => {
      this.addOverlay = overlay;
      this.trackId = id;
    });
  },
};
</script>
