<template>
  <div class="ml-6">
    <h2 class="white--text mt-10 font-weight-bold">Prefered Genres</h2>
    <v-layout row wrap>
      <pref
        v-for="i in 3"
        :key="genres[i].text"
        class="mt-3"
        :source="genres[i].src"
        :title="genres[i].text"
        :route="genres[i].route"
        :color="genres[i].color"
      ></pref>
    </v-layout>
    <h2 class="white--text mt-10 font-weight-bold">Browse all</h2>
    <v-layout row wrap>
      <Genres
        v-for="genre in genres"
        :key="genre.text"
        class="mt-3"
        :source="genre.src"
        :title="genre.text"
        :route="genre.route"
        :color="genre.color"
      ></Genres>
    </v-layout>
  </div>
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
