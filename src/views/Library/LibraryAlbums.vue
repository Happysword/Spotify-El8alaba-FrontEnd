<template>
  <div>
    <v-container fluid="" v-if="ready">
        <v-row>
            <v-col  xs="12" sm="6" md="3" lg="2"
            v-for="card in albums.items" :key="card.album.id">
                   <song-card :id="card.album.id" :name="card.album.name"
                   :images="card.album.images" :artistName="card.album.artists[0].name"
                   :type="card.album.type"
                   :external_urls="card.album.external_urls"
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

export default {
  data() {
    return {
      albums: [],
      ready: false,
    };
  },
  components: {
    SongCard,
  },
  mounted() {
    this.fetchUserAlbums();
  },
  methods: {

    /** Fetches current user albums upon entry */
    fetchUserAlbums() {
      this.ready = false;
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.fetchCurrentUserAlbum(this.token)
        .then((response) => {
          this.albums = response;
          this.ready = true;
        });
    },
  },
};
</script>
