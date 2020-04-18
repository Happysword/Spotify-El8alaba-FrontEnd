<template>
  <v-container v-if="ready">
    <br><br><br><br><br>
    <h1 class="white--text display-3 font-weight-bold">
    {{ title }}</h1>
    <br><br><br><br>
    <div v-if="PopularExist">
      <p class="white--text display-1 font-weight-bold">Popular Playlists</p>
      <v-row>
        <v-col xs="12" sm="6" md="3" lg="2" v-for=" i in PPLength"
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
        <v-col xs="12" sm="6" md="3" lg="2" v-for="i in PPLength"
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
      test: false,
    };
  },
  methods: {
    async fetchGenreReq() {
      this.ready = false;
      console.log(this.$route.params.id);
      this.category = await Client.fetchGenre(this.$route.params.id);
      console.log('ana hna');
      console.log(this.category);
      if (this.category !== undefined && this.category !== {}) {
        if (this.category.icons && this.category.icons[0] && !this.test) {
          const result = await analyze(this.category.icons[0].url);
          EventBus.$emit('changeColor', result[100].color);
        }
        this.title = this.category.name;
        this.ready = true;
      }
      console.log('title', this.title);
      // eslint-disable-next-line no-underscore-dangle
      this.PopularPlaylists = await Client.fetchCategoryPlaylists(this.$route.params.id);
      // this.PopularPlaylists = this.category.playlists;
      if (this.PopularPlaylists) {
        this.PopularExist = true;
        if (this.PopularPlaylists.length > 6) {
          this.PPLength = 6;
        } else {
          this.PPLength = this.PopularPlaylists.length;
        }
      }
    },
  },
  async created() {
    await this.fetchGenreReq();
  },
};
</script>

<style scoped>
.t {
  transform: translate(0 , 80px);
}
</style>
