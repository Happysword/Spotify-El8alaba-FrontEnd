<template>
    <v-container mx-5>
        <h1 class="white--text title font-weight-black">Biography</h1>
        <h5 class="grey--text py-4 body-2">{{artist.biography}}</h5>
    </v-container>
</template>

<script>
import client from 'api-client';

export default {
  data() {
    return {
      artist: [],
    };
  },
  mounted() {
    this.fetchAnArtist();
  },
  methods: {
    /** Get current artist info */
    /* istanbul ignore next */
    fetchAnArtist() {
      client.fetchAnArtist(this.$route.params.id)
        .then((response) => {
          [this.artist] = response;
        });
    },
  },
};
</script>
