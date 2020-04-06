<template>
    <v-container fluid="">
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
</template>

<script>
import client from 'api-client';
import SongCard from '../../components/SongCard.vue';

export default {
  data() {
    return {
      playlists: [],
    };
  },
  components: {
    SongCard,
  },
  mounted() {
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

      client.fetchCurrentUserPlaylists(this.token)
        .then((response) => {
          this.playlists = response;
        });
    },
  },
};
</script>
