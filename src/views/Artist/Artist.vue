<template>
    <div>
        <v-card>
            <v-img :src="artist.images[1].url"
            gradient="rgba(255,255,255,0) 0%,rgba(0,0,0,1) 100%"
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
                    >PLAY</v-btn
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

export default {
  data() {
    return {
      artist: JSON,
      followStatus: '',
      FollowJSON: JSON,
      isFollowing: Boolean,
    };
  },
  mounted() {
    this.fetchFollowStatus();
    this.fetchAnArtist();
  },
  methods: {
    fetchAnArtist() {
      client.fetchAnArtist(this.$route.params.id)
        .then((response) => {
          this.artist = response;
        });
    },
    fetchFollowStatus() {
      client.ifCurrentUserFollowsArtistsOrUsers(this.$route.params.id)
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
    followLogic() {
      if (this.isFollowing === false) {
        client.followArtistsOrUsers({
          ids: [this.$route.params.id],
        }).then((res) => {
          console.log(res);
          this.isFollowing = true;
          this.followStatus = 'UNFOLLOW';
        });
      } else {
        client.unfollowArtistsOrUsers({
          ids: [this.$route.params.id],
        }).then((res) => {
          console.log(res);
          this.isFollowing = false;
          this.followStatus = 'FOLLOW';
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
