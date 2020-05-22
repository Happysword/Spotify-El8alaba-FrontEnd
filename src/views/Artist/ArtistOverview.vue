<template>
    <v-container class="mx-6">
                <h1 class="white--text font-weight-bold">Popular</h1>
                <songBar v-for="(song,index) in computedObj"
                :key="index"
                :counter="index"
                :song="song"
                :list="songs"
                >
                </songBar>
                <h1 class="white--text font-weight-bold mt-7">Albums</h1>
                <v-container fluid="">
                    <v-row>
                        <v-col  xs="12" sm="6" md="3" lg="2" v-for="box in artistAlbums.items"
                        :key="box.id">
                              <AlbumBox :albumID="box.id"
                              :albumName="box.name"
                              :albumImage="box.images"></AlbumBox>
                        </v-col>
                    </v-row>
                </v-container>
    </v-container>
</template>

<script>
import client from 'api-client';
import songBar from '../../components/SongsBar.vue';
import AlbumBox from '../../components/AlbumBox.vue';

export default {
  data() {
    return {
      artistID: '',
      songs: [],
      artistAlbums: [],
      limit: 5,
    };
  },
  async created() {
    this.fetchAnArtist();
    this.fetchArtistAlbums();
  },
  components: {
    songBar,
    AlbumBox,
  },
  computed: {
    computedObj() {
      return this.limit ? this.songs.slice(0, this.limit) : this.songs;
    },
  },
  methods: {
    test() {
      console.log(this.artistID);
    },
    /** Get current artist info */
    fetchAnArtist() {
      client.fetchAnArtist(this.$route.params.id)
        .then((response) => {
          this.artistID = response[0].id;
          this.fetchArtistTopTracks();
        });
    },
    async fetchArtistAlbums() {
      this.artistAlbums = await client.fetchArtistAlbums(this.$route.params.id);
    },
    /** Gets the top tracks of an artist */
    async fetchArtistTopTracks() {
      this.songs = await client.fetchArtistTopTracks(this.artistID);
    },
  },
};
</script>
