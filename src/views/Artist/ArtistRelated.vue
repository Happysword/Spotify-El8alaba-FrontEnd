<template>
    <v-container mx-5>
        <v-row>
            <v-col  xs="12" sm="6" md="4" lg="2"
            v-for="card in artistRelatedArtists" :key="card.id">
                   <artist-card :id="card.id" :name="card.name"
                   :images="card.userInfo.image"
                   :type="card.type" :external_urls="card.href"
                   ></artist-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import client from 'api-client';
import ArtistCard from '../../components/ArtistCard.vue';
import EventBus from '../../EventBus';

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
    updateHeader() {
      EventBus.$emit('updateHeader');
    },
    /** Fetches artist related artist */
    fetchArtistRelatedArtists() {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.fetchArtistRelatedArtists(this.$route.params.id, this.token)
        .then((response) => {
          this.artistRelatedArtists = response;
        });
    },
  },
};
</script>
