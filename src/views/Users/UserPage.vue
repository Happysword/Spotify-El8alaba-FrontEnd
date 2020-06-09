<template>
    <div>
        <v-container>
            <v-row>
                <v-col class="text-center">
                  <v-avatar size="200" v-if="!(userProfile.image)">
                        <img src="https://www.scdn.co/i/_global/twitter_card-default.jpg">
                    </v-avatar>
                    <v-avatar size="200" v-if="userProfile.image">
                        <img :src="userProfile.image[0].url">
                    </v-avatar>
                    <h1 class="white--text mt-9">{{userProfile.name}}</h1>
                </v-col>
            </v-row>
        </v-container>
        <v-container mx-5 v-if="ready">
            <v-row v-if="playlists">
               <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in playlists.items" :key="card.id">
                       <song-card :id="card.id" :name="card.name"
                       :description="card.description" :images="card.images"
                       :type="card.type" v-if="playlists.items"
                       :external_urls="card.external_urls"
                       ></song-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-if="!ready">
          <v-row class="py-12">
            <v-col sm='6' md='4' lg="2" v-for="i in 6" :key="i">
              <v-skeleton-loader
                ref="skeleton"
                type="card"
                class="mx-auto px-1"
                dark
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-container>
    </div>
</template>

<script>
import client from 'api-client';
import SongCard from '../../components/SongCard.vue';
import EventBus from '../../EventBus';

export default {
  data() {
    return {
      userProfile: [],
      playlists: [],
      ready: false,
    };
  },
  components: {
    SongCard,
  },
  mounted() {
    this.fetchUserProfile();
    this.fetchUserPlaylists();
  },
  methods: {
    /** Get the user profile info */
    fetchUserProfile() {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.fetchaUserProfile(this.$route.params.id, this.token)
        .then((response) => {
          this.userProfile = response;
          // eslint-disable-next-line no-unused-expressions
          EventBus.$emit('changeColor', this.userProfile.image[0] ? this.userProfile.image[0].colors[0] : 'rgb(24, 216, 96)');
        });
    },
    /** Fetches current user playlists upon entry */
    fetchUserPlaylists() {
      this.ready = false;
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.fetchaListOfUserPlaylists(this.$route.params.id, this.token)
        .then((response) => {
          this.playlists = response;
          this.ready = true;
        });
    },

  },
};
</script>
