<template>
  <v-container fluid="">
    <div v-show="PGenresExist">
    <h2 class="white--text mt-10 font-weight-bold">Prefered Genres</h2>
    <v-row>
        <v-col  xs="12" sm="12" md="12" lg="4"
        v-for="PGenre in PGenres" :key="PGenre.id">
          <pref
            class="mt-3"
            :source="PGenre.icons[0].url"
            :title="PGenre.name"
            :route="PGenre.id"
          ></pref>
         </v-col>
    </v-row>
    </div>
    <div v-show="genresExist">
    <h2 class="white--text mt-10 font-weight-bold">Browse all</h2>
    <v-row>
      <v-col  xs="12" sm="6" md="3" lg="2"  v-for="genre in genres"
      :key="genre.id">
      <Genres
        class="mt-3"
        :source="genre.icons[0].url"
        :title="genre.name"
        :route="genre.id"
      ></Genres>
    </v-col>
    </v-row>
    </div>
  </v-container>
</template>

<script>
import client from '../../api/mock';
import Genres from '../../components/GenresCard.vue';
import pref from '../../components/prefGenres.vue';


export default {
  name: 'Search',
  components: {
    Genres,
    pref,
  },
  data() {
    return {
      genres: [],
      PGenres: [],
      genresExist: false,
      PGenresExist: false,
    };
  },
  methods: {
    async fetchAllGenres() {
      this.genres = await client.fetchGenres();
      if (this.genres) {
        this.genres = this.genres.categories.items;
        this.genresExist = true;
      } else this.genres = {};
    },
    async fetchAllPrefG() {
      this.PGenres = await client.fetchPrefGenres();
      if (this.PGenres) {
        this.PGenres = this.PGenres.categories.items;
        this.PGenresExist = true;
      } else this.PGenres = {};
    },
  },
  async created() {
    this.fetchAllGenres();
    this.fetchAllPrefG();
  },
  mounted() {
    this.$store.state.searching = true;
  },

  updated() {
    this.$store.state.searching = true;
  },

  destroyed() {
    this.$store.state.searching = false;
  },
};
</script>
