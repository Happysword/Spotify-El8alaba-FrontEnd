<template>
  <div>
    <v-container mx-5 v-if="ready">
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
    <v-container v-if="!ready">
      <v-row class="py-12">
        <v-col sm='6' md='4' lg="2" v-for="i in 12" :key="i">
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
import EventBus from '../../EventBus';

export default {
  data() {
    return {
      artistRelatedArtists: JSON,
      ready: false,
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
      this.ready = false;
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }
      /* istanbul ignore next */
      client.fetchArtistRelatedArtists(this.$route.params.id, this.token)
        .then((response) => {
          this.artistRelatedArtists = response;
          this.ready = true;
        });
    },
  },
};
</script>
