<template>
  <nav>
    <v-navigation-drawer
      app
      color="#040404"
      dark
      v-model="drawer"
      width="230"
      permanent
      :expand-on-hover="$vuetify.breakpoint.xs"
    >
      <v-container>
        <v-list dense="">
          <v-list-item-content>
            <v-img
              src="../assets/imgs/El-8alaba.png"
              contain
              height="120"
              @click="$router.push('/home')"
              id="logo">
            </v-img>
          </v-list-item-content>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            route
            :exact="link.exact"
            :to="link.route"
            id="mainLinks">
            <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2">
                {{ link.text}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            route
            to="/home/artist/manage"
            v-if="isArtist"
          >
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2">Manage</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list dark="" dense="">
          <v-list-item-content>
            <v-list-item-title class="caption font-weight-bold gray--text">
              PLAYLISTS
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item @click="drawer = !drawer; $store.state.dialog = true; dialog=true;">
            <v-list-item-icon>
              <v-icon>mdi-plus-box</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2" id="createPlaylist"
                >Create Playlist</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <createList v-if="dialog === true"></createList>
          <v-list-item route to="/home/library/tracks">
            <v-list-item-icon>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2" id="likedSongs">
                Liked Songs
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
          v-if="
            !$store.state.MusicPlayer.navBarImage &&
              !$store.state.MusicPlayer.adTime
          "
        >
          <v-list-item
            v-for="playlist in $store.state.userPlaylists.items"
            :key="playlist.id"
            dense
            route
            :to="'/playlist/' + playlist.id">
            <v-list-item-content>
              <v-list-item-title class="subtitle-2">
                {{playlist.name}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-img
          v-else-if="
            $store.state.MusicPlayer.navBarImage &&
              !$store.state.MusicPlayer.adTime
          "
          class="mt-2"
          max-height="180"
          max-width="200"
          :src="
            $store.state.MusicPlayer.currentSong.track.album.images[0].url ||
              'https://player.listenlive.co/templates/StandardPlayerV4/webroot/img/default-cover-art.png'
          "
          contain
          @mouseenter="imageButton = true"
          @mouseleave="imageButton = false">
          <v-icon
            color="grey"
            v-show="imageButton"
            @click="$store.state.MusicPlayer.navBarImage = false"
            >mdi-chevron-down-circle</v-icon
          ></v-img
        >
        <v-img
          v-else
          class="mt-2"
          max-height="180"
          max-width="200"
          src="../assets/imgs/El-8alaba.png"
          contain
        ></v-img>
      </v-container>
      <v-container id="Download">
        <v-list dense="" >
          <v-list-item
            route to="/download"
            id="mainLinks">
            <v-list-item-icon>
                <v-icon>mdi-arrow-down-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2">
                Download app
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>

    </v-navigation-drawer>
  </nav>
</template>

<script>
import client from 'api-client';
import createList from './CreatePlayList.vue';

/** */
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: true,
      links: [
        {
          icon: 'mdi-home',
          text: 'Home',
          route: '/home',
          exact: true,
        },
        {
          icon: 'mdi-magnify',
          text: 'Search',
          route: '/home/search',
          exact: false,
        },
        {
          icon: 'mdi-bookshelf',
          text: 'Your Library',
          route: '/home/library/playlists',
          exact: false,
        },
      ],
      playlists: JSON,
      createdPlaylistName: '',
      dialog: false,
      imageButton: false,
      isArtist: false,
      rules: {
        required: (value) => !!value || 'Required.',
      },
    };
  },
  components: {
    createList,
  },
  props: {
    searching: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (JSON.parse(localStorage.getItem('currentUser')).data.type === 'artist') {
      this.isArtist = true;
    }
  },
  mounted() {
    this.dialog = false;
    this.fetchUserPlaylists();
  },
  methods: {
    /** Fetches current user playlists upon entry */
    fetchUserPlaylists() {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      const userID = JSON.parse(localStorage.getItem('currentUser'));
      const token = JSON.parse(localStorage.getItem('currentUser'));
      if (userID === null && token === null) {
        this.userID = 'user';
        this.token = 'token';
      } else {
        this.userID = JSON.parse(localStorage.getItem('currentUser')).data._id;
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.fetchCurrentUserPlaylists(this.token).then((response) => {
        this.$store.state.userPlaylists = response;
      });
    },
    // /** Create a new playlist */
    // createNewPlaylist() {
    //   const token = JSON.parse(localStorage.getItem('currentUser'));

    //   if (token === null) {
    //     this.token = 'token';
    //   } else {
    //     this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    //   }

    //   client
    //     .createNewPlayList(
    //       {
    //         name: this.createdPlaylistName,
    //         public: 'true',
    //         description: '',
    //       },
    //       this.token,
    //     )
    //     .then((r) => {
    //       console.log(r);
    //       this.createdPlaylistName = '';
    //       this.fetchUserPlaylists();
    //     });
    //   },
  },
};
</script>
<style scoped>
#Download{
  position: fixed;
  bottom: 0px;
}
</style>
