<template>
  <div>
    <v-container fluid="" v-if="ready">
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
import ArtistCard from '../../components/ArtistCard.vue';

export default {
  data() {
    return {
      artistsJson: [],
      ready: false,
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
      this.ready = false;
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.fetchCurrentUserArtists(this.token)
        .then((response) => {
          this.artistsJson = response;
          this.ready = true;
        });
    },
  },

};
</script>
