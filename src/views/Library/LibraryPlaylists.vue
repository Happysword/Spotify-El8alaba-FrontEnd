<template>
  <div>
    <v-container fluid="" v-if="ready">
        <v-row>
            <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in playlists.items" :key="card.id">
                   <song-card :id="card.id" :name="card.name"
                   :description="card.description" :images="card.images"
                   :type="card.type"
                   :external_urls="card.external_urls"
                   :owner="card.owner.id"
                   :Public="card.public"
                   ></song-card>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-if="!ready">
      <v-row>
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
      playlists: [],
      ready: false,
    };
  },
  components: {
    SongCard,
  },
  mounted() {
    this.fetchUserPlaylists();
  },
  methods: {

    /** Fetches current user playlists upon entry */
    fetchUserPlaylists() {
      this.ready = false;
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      const userID = JSON.parse(localStorage.getItem('currentUser'));
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (userID === null && token === null) {
        this.userID = 'user';
        this.token = 'token';
      } else {
        this.userID = JSON.parse(localStorage.getItem('currentUser')).data._id;
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client.fetchCurrentUserPlaylists(this.token)
        .then((response) => {
          this.playlists = response;
          this.ready = true;
        });
    },
  },
};
</script>
