<template>
    <v-container class="mx-6">

                <h1 class="white--text font-weight-bold">Popular</h1>
                <songBar v-for="(song,index) in songs"
                :key="index"
                :counter="index"
                :song="song"
                :list="songs"
                >
                </songBar>
    </v-container>
</template>

<script>
import client from 'api-client';
import songBar from '../../components/SongsBar.vue';

export default {
  data() {
    return {
      artistID: '',
      songs: [],
    };
  },
  async created() {
    this.fetchAnArtist();
  },
  components: {
    songBar,
  },
  methods: {
    test() {
      console.log(this.songs);
    },
    /** Get current artist info */
    fetchAnArtist() {
      client.fetchAnArtist(this.$route.params.id)
        .then((response) => {
          this.artistID = response[0].id;
          this.fetchArtistTopTracks();
        });
    },
    /** Gets the top tracks of an artist */
    async fetchArtistTopTracks() {
      this.songs = await client.fetchArtistTopTracks(this.artistID);
    },
  },
};
</script>
