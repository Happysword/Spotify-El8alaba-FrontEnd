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
          <v-container fluid v-if="imagesExist">
            <v-img :src="images[0].url" id="imageID" height="150px"></v-img>
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
              v-if="showActionButton"
              @mousedown.stop
              @click.stop="showPlayButton = !showPlayButton"
            >
              <v-icon color="white" id="playID" v-show="showPlayButton">mdi-play</v-icon>
              <v-icon color="white" id="pauseID" v-show="!showPlayButton">mdi-pause</v-icon>
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
      FollowJSON: JSON,
      imagesExist: false,
      items: [
        { title: 'Start Radio' },
        { title: '' },
        { title: 'Copy link' },
      ],
    };
  },
  mounted() {
    this.fetchFollowStatus();
  },
  methods: {
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
      } else if (index === 2) {
        this.notificationMsg = 'Copied to clipboard';
        this.$copyText(this.external_urls.spotify);
        this.snackbar = true;
      }
    },
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
  created() {
    this.imagesExist = false;
    if (this.images) {
      if (this.images[0]) {
        this.imagesExist = true;
      }
    }
  },
};
</script>
