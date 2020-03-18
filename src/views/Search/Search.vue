<template>
  <v-container fluid="">
    <h2 class="white--text mt-10 font-weight-bold">Prefered Genres</h2>
    <v-row>
        <v-col  xs="12" sm="12" md="12" lg="4"  v-for="i in 3" :key="genres[i].text">
          <pref
            class="mt-3"
            :source="genres[i].src"
            :title="genres[i].text"
            :route="genres[i].route"
            :color="genres[i].color"
          ></pref>
         </v-col>
    </v-row>
    <h2 class="white--text mt-10 font-weight-bold">Browse all</h2>
    <v-row>
      <v-col  xs="12" sm="6" md="3" lg="2"  v-for="genre in genres"
      :key="genre.text">
      <Genres
        class="mt-3"
        :source="genre.src"
        :title="genre.text"
        :route="genre.route"
        :color="genre.color"
      ></Genres>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import g from '@/api/mock/data/genres.json';
import Genres from '../../components/GenresCard.vue';
import pref from '../../components/prefGenres.vue';

export default {
  name: 'Home',
  components: {
    Genres,
    pref,
  },
  data() {
    return {
      genres: g,
    };
  },

  created() {
    this.$store.state.searching = true;
  },
  destroyed() {
    this.$store.state.searching = false;
  },
};
</script>
