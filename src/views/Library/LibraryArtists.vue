<template>
    <v-container fluid="">
        <v-row>
            <v-col  xs="12" sm="6" md="4" lg="2"
            v-for="card in artistsJson" :key="card.id">
                   <artist-card
                   :id="card.id" :name="card.name"
                   :images="card.image"
                   :type="card.type" :external_urls="card.uri"
                   ></artist-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import client from 'api-client';
import ArtistCard from '../../components/ArtistCard.vue';

export default {
  data() {
    return {
      artistsJson: [],
    };
  },
  components: {
    ArtistCard,
  },
  mounted() {
    this.fetchUserArtists();
  },
  methods: {
    /** Fetches current user artists upon entry */
    fetchUserArtists() {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.fetchCurrentUserArtists(this.token)
        .then((response) => {
          this.artistsJson = response;
        });
    },
  },

};
</script>
