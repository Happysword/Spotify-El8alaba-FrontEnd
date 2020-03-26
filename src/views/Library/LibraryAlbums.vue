<template>
    <v-container fluid="">
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
</template>

<script>
import client from 'api-client';
import SongCard from '../../components/SongCard.vue';

export default {
  data() {
    return {
      albums: [],
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
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.fetchCurrentUserAlbum(this.token)
        .then((response) => {
          this.albums = response;
        });
    },
  },
};
</script>
