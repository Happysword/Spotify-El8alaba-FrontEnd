<template>
  <div>
    <v-container fluid="">
      <div v-if="RecentExist">
        <h2 class="white--text mt-10 font-weight-bold RECENT"
        id="history"
        @click="History()">Recent searches</h2>
      <v-row>
          <v-col  xs="12" sm="6" md="3" lg="2"
          v-for="( s , i ) in RecentLength" :key="i">
          <artist-card v-if="RecentSearch[i].type === 'artist'"
            :id="RecentSearch[i].id"
            :name="RecentSearch[i].name"
            :images="RecentSearch[i].images"
            :type="RecentSearch[i].type"
          ></artist-card>
          <profile-card
          v-if="RecentSearch[i].type === 'user'"
          :profileName="RecentSearch[i].name"
          :id="RecentSearch[i].id"
          :images="RecentSearch[i].images"
          :type="RecentSearch[i].type"></profile-card>
          <song-card
              v-if="RecentSearch[i].type != 'artist' && RecentSearch[i].type != 'user'"
              :id="RecentSearch[i].id"
              :name="RecentSearch[i].name"
              :images="RecentSearch[i].images"
              :type="RecentSearch[i].type">
          </song-card>
          </v-col>
      </v-row>
      </div>
      <div v-if="PGenresExist && ready">
      <h2 class="white--text mt-10 font-weight-bold">Prefered Genres</h2>
      <v-row>
          <v-col  xs="12" sm="12" md="12" lg="4"
          v-for="PGenre in PGenres" :key="PGenre._id">
            <pref
              class="mt-3"
              :source="PGenre.icons[0]? PGenre.icons[0].url :'https://www.scdn.co/i/_global/twitter_card-default.jpg'"
              :title="PGenre.name"
              :route="PGenre._id"
              :color="PGenre.icons[0] && PGenre.icons[0].colors[0]
                ? PGenre.icons[0].colors[0] : 'rgb(24, 216, 96)'"
            ></pref>
          </v-col>
      </v-row>
      </div>
      <div v-if="genresExist && ready">
      <h2 class="white--text mt-10 font-weight-bold">Browse all</h2>
      <v-row>
        <v-col  xs="12" sm="6" md="3" lg="2"  v-for="genre in genres"
        :key="genre._id">
        <Genres
          class="mt-3"
          :source="genre.icons[0]? genre.icons[0].url : 'https://www.scdn.co/i/_global/twitter_card-default.jpg'"
          :title="genre.name"
          :route="genre._id"
          :color="genre.icons[0] && genre.icons[0].colors[0]
            ? genre.icons[0].colors[0] : 'rgb(24, 216, 96)'"
        ></Genres>
      </v-col>
      </v-row>
      </div>
    </v-container>
    <v-container v-if="!ready">
      <br><br><br>
      <v-row v-for="j in 6" :key="j">
        <v-col xs="12" sm="6" md="3" lg="2" v-for="i in 6" :key="i">
          <v-skeleton-loader
            ref="skeleton"
            type="image"
            class="mt-3"
            dark
            height="100%"
            width="100%"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import client from 'api-client';
import Genres from '../../components/GenresCard.vue';
import pref from '../../components/prefGenres.vue';
import SongCard from '../../components/SongCard.vue';
import ArtistCard from '../../components/ArtistCard.vue';
import ProfileCard from '../../components/ProfileCard.vue';

export default {
  name: 'Search',
  components: {
    Genres,
    pref,
    SongCard,
    ArtistCard,
    ProfileCard,
  },
  data() {
    return {
      genres: [],
      PGenres: [],
      RecentSearch: [],
      genresExist: false,
      RecentLength: 0,
      PGenresExist: false,
      RecentExist: false,
      ready: false,
    };
  },
  methods: {
    /**
   * fetch all the categories
   */
    async fetchAllGenres() {
      this.ready = false;
      this.genres = await client.fetchGenres();
      if (this.genres.length > 0) {
        this.genresExist = true;
      } else {
        /* istanbul ignore next */
        this.genres = {};
      }
      this.ready = true;
    },
    History() {
      this.$router.push('/home/search/history/showRecent');
    },
  },
  async created() {
    this.fetchAllGenres();
    // this.fetchAllPrefG();
    const temp = JSON.parse(localStorage.getItem('SearchHistory') || '[]');
    if (temp.length !== 0) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      for (let i = 0; i < temp.length; i += 1) {
        if (user.data.id === temp[i].UserID) {
          this.RecentSearch.push(temp[i]);
        }
        // eslint-disable-next-line no-unused-expressions
        this.RecentSearch.length ? this.RecentExist = true : this.RecentExist = false;
        // eslint-disable-next-line no-unused-expressions
        if (this.RecentSearch.length <= 6) {
          this.RecentLength = this.RecentSearch.length;
        } else {
          this.RecentLength = 6;
        }
      }
    }
    console.log(this.RecentSearch);
  },
  mounted() {
    this.$store.state.searching = true;
  },

  updated() {
    this.$store.state.searching = true;
  },
  /* istanbul ignore next */
  destroyed() {
    this.$store.state.searching = false;
  },
};
</script>

<style scoped>
.RECENT:hover {
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
