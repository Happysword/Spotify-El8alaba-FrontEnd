<template>
  <v-container v-if="ready">
    <br><br><br><br><br>
    <h1 class="white--text display-3 font-weight-bold">
    {{ title }}</h1>
    <br><br><br><br>
    <div v-if="PopularExist">
      <p class="white--text display-1 font-weight-bold">Popular Playlists</p>
      <v-row>
        <v-col xs="12" sm="6" md="3" lg="2" v-for="(s , i) in PPLength"
        :key="PopularPlaylists[i-1].id">
          <SongCard :id="PopularPlaylists[i-1].id" :name="PopularPlaylists[i-1].name"
                :description="PopularPlaylists[i-1].description"
                :images="PopularPlaylists[i-1].images"
                :type="PopularPlaylists[i-1].type"></SongCard>
        </v-col>
      </v-row>
    </div>
    <br><br>
    <div v-if="PopularExist">
      <p class="white--text display-1 font-weight-bold">Releases</p>
      <v-row>
        <v-col xs="12" sm="6" md="3" lg="2" v-for="(s , i) in PPLength"
        :key="PopularPlaylists[i-1].id">
          <SongCard :id="PopularPlaylists[i-1].id" :name="PopularPlaylists[i-1].name"
                :description="PopularPlaylists[i-1].description"
                :images="PopularPlaylists[i-1].images"
                :type="PopularPlaylists[i-1].type"></SongCard>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Client from 'api-client';
import analyze from 'rgbaster';
import EventBus from '../../EventBus';
import SongCard from '../../components/SongCard.vue';

export default {
  name: 'genres',
  components: {
    SongCard,
  },
  data() {
    return {
      ready: false,
      PopularExist: false,
      exist: false,
      color: '',
      title: '',
      category: {},
      PopularPlaylists: [],
      PPLength: 0,
      Releases: [],
    };
  },
  methods: {
    async fetchGenreReq() {
      this.ready = false;
      this.category = await Client.fetchGenre(this.$route.params.id);
      console.log(this.category);
      this.color = this.category.icons[0].url;
      const result = await analyze(this.color);
      EventBus.$emit('changeColor', result[100].color);
      this.title = this.category.name;
      this.ready = true;
      // eslint-disable-next-line no-underscore-dangle
      // this.PopularPlaylists = await Client.fetchCategoryPlaylists(this.category._id);
      this.PopularPlaylists = this.category.playlists;
      if (this.PopularPlaylists.length !== 0) {
        this.PopularExist = true;
        if (this.PopularPlaylists.length > 6) {
          this.PPLength = 6;
        } else {
          this.PPLength = this.PopularPlaylists.length;
        }
      }
      console.log();
    },
  },
  async created() {
    this.fetchGenreReq();
  },
};
</script>

<style scoped>
.t {
  transform: translate(0 , 80px);
}
</style>
