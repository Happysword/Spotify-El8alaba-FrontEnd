<template>
    <div>
        <v-container>
            <v-row>
                <v-col class="text-center">
                    <v-avatar size="200">
                        <img :src="userProfile.images[0].url">
                    </v-avatar>
                    <h1 class="white--text mt-9">{{userProfile.display_name}}</h1>
                </v-col>
            </v-row>
        </v-container>
        <v-container mx-5>
            <v-row>
               <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in playlists.items" :key="card.id">
                       <song-card :id="card.id" :name="card.name"
                       :description="card.description" :images="card.images"
                       :type="card.type"
                       :external_urls="card.external_urls"
                       ></song-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import client from 'api-client';
import SongCard from '../../components/SongCard.vue';

export default {
  data() {
    return {
      userProfile: [],
      playlists: [],
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

      client.fetchUserProfile(this.$route.params.id, this.token)
        .then((response) => {
          this.userProfile = response;
        });
    },
    /** Fetches current user playlists upon entry */
    fetchUserPlaylists() {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.fetchaListOfUserPlaylists(this.$route.params.id, this.token)
        .then((response) => {
          this.playlists = response;
        });
    },

  },
};
</script>
