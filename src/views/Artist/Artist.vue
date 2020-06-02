<template>
    <div>
      <v-snackbar
      v-model="snackbar"
      color="#2E77D0"
      :timeout="3000"
      class="mb-12 pb-12 text-center"
      >
      <h1 class="text-center subtitle-1">{{notificationMsg}}</h1>
      </v-snackbar>
        <v-card v-if="artist && artist.followers">
            <v-img :src="imageURL"
            gradient="rgba(255,255,255,0) 0%,rgba(18,18,18,255) 100%"
            class="align-center"
            height="340px">
            <v-container fluid="" mx-3>
                <v-card-text
                class="grey--text subtitle-2">
                {{artist.followers.total}} MONTHLY LISTENERS</v-card-text>
                <v-card-title
                class="white--text display-3 font-weight-black">{{artist.name}}
                </v-card-title>
                <v-card-actions >
                    <v-btn
                    width="120"
                    height="40"
                    rounded=""
                    depressed
                    route
                    color="#1DD660"
                    dark=""
                    v-if="showPlayButton"
                    @click="playAction()"
                    >PLAY</v-btn
                    >
                    <v-btn
                    width="120"
                    height="40"
                    rounded=""
                    depressed
                    route
                    color="#1DD660"
                    dark=""
                    v-if="!showPlayButton"
                    @click="pauseAction()"
                    >PAUSE</v-btn
                    >
                    <v-btn
                    width="120"
                    height="40"
                    rounded=""
                    depressed
                    route
                    outlined=""
                    dark=""
                    @click="followLogic()"
                    >{{followStatus}}</v-btn
                    >
                </v-card-actions>
                <v-container class="mt-5" fluid="">
                    <v-btn-toggle
                        group
                        color="white"
                        dense
                        dark="" rounded=""
                        >
                            <v-btn value="overview" route
                            :to="{ name: 'artistOverview' , params: { id: $route.params.id } }"
                            exact=""
                            class="subtitle-2 font-weight-bold">
                                overview
                            </v-btn>
                        </v-btn-toggle>
                        <v-btn-toggle
                        group
                        color="white"
                        dense
                        dark="" rounded=""
                        >
                            <v-btn value="related Artists" route
                            :to="{ name: 'artistRelated' , params: { id: $route.params.id } }"
                            class="subtitle-2 font-weight-bold">
                                 related Artists
                            </v-btn>
                        </v-btn-toggle>
                        <v-btn-toggle
                        group
                        color="white"
                        dense
                        dark="" rounded=""
                        >
                            <v-btn value="About" route
                            :to="{ name: 'artistAbout' , params: { id: $route.params.id } }"
                            class="subtitle-2 font-weight-bold">
                                 About
                            </v-btn>
                        </v-btn-toggle>
                    </v-container>
            </v-container>
            </v-img>
        </v-card>
        <router-view></router-view>
        </div>
</template>

<script>
import client from 'api-client';
import EventBus from '../../EventBus';

export default {
  data() {
    return {
      artist: [],
      artistID: '',
      followStatus: '',
      FollowJSON: JSON,
      isFollowing: Boolean,
      notificationMsg: String,
      snackbar: false,
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Solid_white.svg',
      songsList: [],
      showPlayButton: true,
    };
  },
  mounted() {
    this.fetchAnArtist();
  },
  created() {
    EventBus.$on('updateHeader', () => {
      this.fetchAnArtist();
    });
  },
  watch: {
    $route() {
      this.fetchAnArtist();
    },
  },
  methods: {
    playAction() {
      this.$store.dispatch('playpauseplaylist', {
        playstatus: true,
        currentList: this.songsList,
        song: this.songsList[0],
        type: 'album',
      });

      this.showPlayButton = false;
    },
    pauseAction() {
      this.$store.dispatch('playpauseplaylist', {
        playstatus: false,
        type: 'album',
      });
      this.showPlayButton = true;
    },
    /** Checks If an image is in the request */
    checkImage() {
      if (this.artist.images[0]) {
        this.imageURL = this.artist.images[0].url;
      }
    },
    /** Get current artist info */
    fetchAnArtist() {
      client.fetchAnArtist(this.$route.params.id)
        .then((response) => {
          [this.artist] = response;
          this.artistID = response[0].id;
          this.fetchArtistTopTracks();
          this.fetchFollowStatus();
          this.checkImage();
        });
    },
    /** Gets the top tracks of an artist */
    async fetchArtistTopTracks() {
      this.songsList = await client.fetchArtistTopTracks(this.artistID);
    },
    /** Fetches the current following status */
    fetchFollowStatus() {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.ifCurrentUserFollowsArtistsOrUsers(this.artist.userInfo.id, this.token)
        .then((res) => {
          this.FollowJSON = res;
          [this.isFollowing] = this.FollowJSON;
          if (this.isFollowing === true) {
            this.followStatus = 'UNFOLLOW';
          } else {
            this.followStatus = 'FOLLOW';
          }
        });
    },
    /** Responsible for the follow logic */
    followLogic() {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      if (this.isFollowing === false) {
        client.followArtistsOrUsers({
          ids: [this.artist.userInfo.id],
        }, this.token).then((res) => {
          console.log(res);
          this.isFollowing = true;
          this.followStatus = 'UNFOLLOW';
          this.notificationMsg = 'Saved to Your Library';
          this.snackbar = true;
        });
      } else {
        client.unfollowArtistsOrUsers(
          [this.artist.userInfo.id], this.token,
        )
          .then((res) => {
            console.log(res);
            this.isFollowing = false;
            this.followStatus = 'FOLLOW';
            this.notificationMsg = 'Removed from Your Library';
            this.snackbar = true;
          });
      }
    },
  },

};
</script>

<style scoped>
.v-btn-toggle--rounded {
    border-radius: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}
</style>
