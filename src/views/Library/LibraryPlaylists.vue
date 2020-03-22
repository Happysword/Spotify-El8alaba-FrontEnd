<template>
    <v-container fluid="">
        <v-row>
            <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in playlists.items" :key="card.id">
                   <song-card :id="card.id" :name="card.name"
                   :description="card.description" :images="card.images"
                   :type="card.type"
                   :external_urls="card.external_urls.spotify"
                   ></song-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import client from '../../api/mock';
import SongCard from '../../components/SongCard.vue';

export default {
  data() {
    return {
      playlists: JSON,
    };
  },
  components: {
    SongCard,
  },
  created() {
    this.fetchUserPlaylists();
  },
  methods: {
    fetchUserPlaylists() {
      // TODO: Add localStorage.getItem('currentUser').data.id to work
      client.fetchCurrentUserPlaylists(localStorage.getItem('currentUser'))
        .then((response) => {
          this.playlists = response;
        });
    },
  },
};
</script>
