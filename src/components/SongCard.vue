<template>
  <div>
    <v-snackbar
    v-model="snackbar"
    color="#2E77D0"
    :timeout="3000"
    class="mb-12 pb-12 text-center" id="snackbarID"
    >
    <h1 class="text-center subtitle-1">{{notificationMsg}}</h1>
    </v-snackbar>
    <v-menu offset-y absolute=""
    dark=""
    >
    <template v-slot:activator="{ on }">
        <v-card
          class="mx-auto"
          max-width="185"
          dark
          @mouseover="showActionButton = true"
          @mouseleave="showActionButton = false"
          height="285"
          @click="CardClickLink()"
          @contextmenu.prevent="on.click"
          id="cardID"
        >
          <v-container fluid>
            <v-img v-if="(images === undefined || images.length == 0)"
            src="https://getdrawings.com/free-icon-bw/black-music-icons-23.png" id="imageID" height="150px"></v-img>
            <v-img v-if="!(images === undefined || images.length == 0)"
            :src="images[0].url"
            id="imageID" height="150px"></v-img>
          </v-container>
          <v-card-title id="nameID" class="font-weight-bold subtitle-2">{{name}}</v-card-title>

          <v-card-subtitle id="descriptionID"
           class="caption" v-if="!showActionButton && type === 'playlist'">
            {{description | shorten}}
          </v-card-subtitle>

          <v-card-subtitle class="caption" id="artistNameID"
           v-if="!showActionButton && type === 'album'">
            {{artistName}}
          </v-card-subtitle>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              fab
              small
              color="#1ED760"
              v-if="showActionButton && showPlayButton"
              @mousedown.stop
              @click.stop="playAction()"
            >
              <v-icon color="white" id="playID">mdi-play</v-icon>
            </v-btn>
            <v-btn
              fab
              small
              color="#1ED760"
              v-if="showActionButton && !showPlayButton"
              @mousedown.stop
              @click.stop="pauseAction()"
            >
              <v-icon color="white" id="pauseID">mdi-pause</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="menuLogic(index)"
        >
          <v-list-item-title class="grey--text">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import client from 'api-client';

/** */
export default {
  props: {
    description: String,
    collaborative: Boolean,
    external_urls: Object,
    href: String,
    id: String,
    images: Array,
    name: String,
    owner: [],
    public: Boolean,
    snapshot_id: String,
    tracks: Object,
    type: String,
    uri: String,
    artistName: String, // For Albums only
  },
  data() {
    return {
      showActionButton: false,
      showPlayButton: true,
      snackbar: false,
      notificationMsg: String,
      isFollowing: Boolean,
      FollowJSON: [],
      songsList: [],
      items: [
        { title: 'Start Radio' },
        { title: '' },
        { title: 'Copy link' },
      ],
    };
  },
  mounted() {
    this.fetchFollowStatus();
    this.getSongsList();
  },
  methods: {
    playAction() {
      if (this.$store.state.MusicPlayer.ID === this.id) {
        this.$store.dispatch('playpauseplaylist', {
          playstatus: true,
          ID: this.id,
        });
      } else {
        this.$store.state.MusicPlayer.currentSong = this.songsList;
        this.$store.state.MusicPlayer.currentList = this.songsList;
        this.$store.dispatch('playpauseplaylist', {
          playstatus: true,
          currentList: this.songsList,
          ID: this.id,
          song: this.songsList[0],
        });
      }
      this.showPlayButton = false;
    },
    pauseAction() {
      this.$store.dispatch('playpauseplaylist', {
        playstatus: false,
      });
      this.showPlayButton = true;
    },
    /** Get the song of album or playlist */
    async getSongsList() {
      if (this.type === 'playlist') {
        this.songsList = await client.fetchSongs(this.id);
      } else {
        this.songsList = await client.fetchAlbumSongs(this.id);
      }
    },
    /* istanbul ignore next */
    /** When a card is clicked it go to route of playlist or album depending on its type */
    CardClickLink() {
      if (this.type === 'playlist') {
        this.$router.push(`/playlist/${this.id}`);
      } else if (this.type === 'album') {
        this.$router.push(`/album/${this.id}`);
      }
    },
    /** Performs menu logic
     * @param {string} index Index of the Sub menu
     */
    menuLogic(index) {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      if (index === 1) {
        if (this.type === 'playlist') {
          if (this.isFollowing === false) {
            client.followaPlaylist(this.id, this.token).then((res) => {
              console.log(res);
              this.isFollowing = true;
              this.items[1].title = 'Remove from Your Library';
              this.notificationMsg = 'Saved to Your Library';
              this.snackbar = true;
            });
          } else {
            client.UnfollowaPlaylist(this.id, this.token).then((res) => {
              console.log(res);
              this.isFollowing = false;
              this.items[1].title = 'Save to Your Library';
              this.notificationMsg = 'Removed from Your Library';
              this.snackbar = true;
            });
          }
        } else if (this.type === 'album') {
          if (this.isFollowing === false) {
            client.saveAlbumsForCurrentUser(this.id, this.token).then((res) => {
              console.log(res);
              this.isFollowing = true;
              this.items[1].title = 'Remove from Your Library';
              this.notificationMsg = 'Saved to Your Library';
              this.snackbar = true;
            });
          } else {
            client.UnfollowaPlaylist(this.id, this.token).then((res) => {
              console.log(res);
              this.isFollowing = false;
              this.items[1].title = 'Save to Your Library';
              this.notificationMsg = 'Removed from Your Library';
              this.snackbar = true;
            });
          }
        }
      } /* istanbul ignore next */ else if (index === 2) {
        this.notificationMsg = 'Copied to clipboard';
        this.$copyText(this.external_urls.spotify);
        this.snackbar = true;
      }
    },
    /* istanbul ignore next */
    /** Fetches the current following status */
    fetchFollowStatus() {
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

      if (this.type === 'playlist') {
        client.ifUsersFollowsaPlaylist(this.userID, this.id, this.token)
          .then((res) => {
            this.FollowJSON = res;
            [this.isFollowing] = this.FollowJSON;
            if (this.isFollowing === true) {
              this.items[1].title = 'Remove from Your Library';
            } else {
              this.items[1].title = 'Save to Your Library';
            }
          });
      } else {
        client.ifUserFollowsAlbums(this.id, this.token)
          .then((res) => {
            this.FollowJSON = res;
            [this.isFollowing] = this.FollowJSON;
            if (this.isFollowing === true) {
              this.items[1].title = 'Remove from Your Library';
            } else {
              this.items[1].title = 'Save to Your Library';
            }
          });
      }
    },
  },
  computed: {
    musicPlayerSongID() {
      return this.$store.state.MusicPlayer.ID;
    },
  },
  watch: {
    musicPlayerSongID() {
      if (this.$store.state.MusicPlayer.ID !== this.id) {
        this.showPlayButton = true;
      }
    },
  },
};
</script>
