<template>
    <v-container fluid="">
        <v-row>
            <v-col  xs="12" sm="6" md="4" lg="2"
            v-for="card in artistsJson.artists.items" :key="card.id">
                   <artist-card :id="card.id" :profileName="card.name"
                   :images="card.images"
                   :type="card.type" :external_urls="card.external_urls.spotify"
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
      artistsJson: JSON,
    };
  },
  components: {
    ArtistCard,
  },
  mounted() {
    this.fetchUserArtists();
  },
  methods: {
    fetchUserArtists() {
      client.fetchCurrentUserArtists()
        .then((response) => {
          this.artistsJson = response;
        });
    },
  },

};
</script>
