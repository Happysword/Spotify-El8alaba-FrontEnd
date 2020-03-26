<template>
<div>
     <v-snackbar
      v-model="snackbar"
      color="#2E77D0"
      timeout="3000"
      class="mb-12 pb-12 text-center"
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
               dark=""
               @mouseover="showActionButton = true"
               @mouseleave="showActionButton = false"
               height="285"
               @click="CardClickLink()"
               @contextmenu.prevent="on.click"
           >
             <v-container fluid="">
                 <v-img class="circle"
                 :src="images[0].url"
                 height="150px"
                 ></v-img>
             </v-container>
               <v-card-title class="font-weight-bold subtitle-2">
               {{name}}
               </v-card-title>

               <v-card-subtitle class="caption"
               v-if="!showActionButton">
               {{type}}
               </v-card-subtitle>
               <v-card-actions>
               <v-spacer></v-spacer>

               <v-btn fab="" small=""  color="#1ED760"
               v-if="showActionButton" id="playBTN"
               @mousedown.stop="" @click.stop="showPlayButton = !showPlayButton">
                   <v-icon color="white" v-show="showPlayButton">mdi-play</v-icon>
                   <v-icon color="white" v-show="!showPlayButton">mdi-pause</v-icon>
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
    external_urls: Object,
    followers: Object,
    genres: [],
    href: String,
    id: String,
    images: Array,
    name: String,
    popularity: String,
    type: String,
    uri: String,
  },
  data() {
    return {
      showActionButton: false,
      showPlayButton: true,
      snackbar: false,
      isFollowing: Boolean,
      FollowJSON: JSON,
      notificationMsg: String,
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
      this.$router.push(`/home/artist/${this.id}`);
    },
    /** Performs menu logic
     * @param {string} index Index of the Sub menu
     */
    menuLogic(index) {
      if (index === 0) {
        console.log('Start Radio');
      } else if (index === 1) {
        if (this.isFollowing === false) {
          client.followArtistsOrUsers({
            ids: [this.id],
          }, this.token).then((res) => {
            console.log(res);
            this.isFollowing = true;
            this.items[1].title = 'Unfollow';
            this.notificationMsg = 'Saved to Your Library';
            this.snackbar = true;
          });
        } else {
          client.unfollowArtistsOrUsers({
            ids: [this.id],
          }).then((res) => {
            console.log(res);
            this.isFollowing = false;
            this.items[1].title = 'Follow';
            this.notificationMsg = 'Removed from Your Library';
            this.snackbar = true;
          });
        }
      } else if (index === 2) {
        this.$copyText(this.external_urls.spotify);
        this.notificationMsg = 'Link copied to clipboard';
        this.snackbar = true;
      }
    },
    /** Fetches the current following status */
    fetchFollowStatus() {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.ifCurrentUserFollowsArtistsOrUsers(this.$route.params.id, token)
        .then((res) => {
          this.FollowJSON = res;
          [this.isFollowing] = this.FollowJSON;
          if (this.isFollowing === true) {
            this.items[1].title = 'Unfollow';
          } else {
            this.items[1].title = 'Follow';
          }
        });
    },
  },
};
</script>

<style scoped>
.circle {
    border-radius: 500px;
}
</style>
