<template>
  <v-container v-if="ready">
    <br><br><br><br><br>
    <h1 class="white--text display-3 font-weight-bold">
    {{ title }}</h1>
    <br><br><br><br>
    <div v-if="PopularExist">
      <p class="white--text display-1 font-weight-bold">Popular Playlists</p>
      <v-row>
        <v-col xs="12" sm="6" md="3" lg="2" v-for="i in 6" :key="PopularPlaylists[i].id">
          <SongCard
          :id="PopularPlaylists[i].id"
          :name="PopularPlaylists[i].name"
          :description="PopularPlaylists[i].description"
          :images="PopularPlaylists[i].images"
          :type="PopularPlaylists[i].type"
          :collaborative="PopularPlaylists[i].collaborative"
          :external_urls="PopularPlaylists[i].external_urls"
          :href="PopularPlaylists[i].href"
          :public="PopularPlaylists[i].public"
          :snapshot_id="PopularPlaylists[i].snapshot_id"
          :tracks="PopularPlaylists[i].tracks"
          :uri="PopularPlaylists[i].uri">
          </SongCard>
        </v-col>
      </v-row>
    </div>
    <br><br>
    <div v-if="PopularExist">
      <p class="white--text display-1 font-weight-bold">Releases</p>
      <v-row>
        <v-col xs="12" sm="6" md="3" lg="2" v-for="i in 6" :key="PopularPlaylists[i].id">
          <SongCard
          :id="PopularPlaylists[i].id"
          :name="PopularPlaylists[i].name"
          :description="PopularPlaylists[i].description"
          :images="PopularPlaylists[i].images"
          :type="PopularPlaylists[i].type"
          :collaborative="PopularPlaylists[i].collaborative"
          :external_urls="PopularPlaylists[i].external_urls"
          :href="PopularPlaylists[i].href"
          :public="PopularPlaylists[i].public"
          :snapshot_id="PopularPlaylists[i].snapshot_id"
          :tracks="PopularPlaylists[i].tracks"
          :uri="PopularPlaylists[i].uri">
          </SongCard>
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
      Releases: [],
    };
  },
  methods: {
    async fetchGenreReq() {
      this.ready = false;
      this.category = await Client.fetchGenre(this.$route.params.id);
      this.color = this.category.icons[0].url;
      const result = await analyze(this.color);
      EventBus.$emit('changeColor', result[100].color);
      this.title = this.category.name;
      this.ready = true;
      // eslint-disable-next-line no-underscore-dangle
      this.PopularPlaylists = await Client.fetchCategoryPlaylists(this.category._id);
      if ('playlists' in this.PopularPlaylists) {
        this.PopularPlaylists = this.PopularPlaylists.playlists.items;
        this.PopularExist = true;
      }
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
