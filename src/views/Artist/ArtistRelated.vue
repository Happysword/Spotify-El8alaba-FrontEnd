<template>
    <v-container mx-5>
        <v-row>
            <v-col  xs="12" sm="6" md="4" lg="2"
            v-for="card in artistRelatedArtists.artists" :key="card.id">
                   <artist-card :id="card.id" :profileName="card.name"
                   :images="card.images"
                   :type="card.type"
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
      artistRelatedArtists: JSON,
    };
  },
  mounted() {
    this.fetchArtistRelatedArtists();
  },
  components: {
    ArtistCard,
  },
  methods: {
    fetchArtistRelatedArtists() {
      client.fetchArtistRelatedArtists(this.$route.params.id)
        .then((response) => {
          this.artistRelatedArtists = response;
        });
    },
  },

};
</script>
