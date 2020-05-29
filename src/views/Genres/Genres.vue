<template>
  <div>
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
            <SongCard
            :id="PopularPlaylists[i-1].id"
            :name="PopularPlaylists[i-1].name"
            :description="PopularPlaylists[i-1].description"
            :images="PopularPlaylists[i-1].images"
            :type="PopularPlaylists[i-1].type"
            :collaborative="PopularPlaylists[i-1].collaborative"
            :external_urls="PopularPlaylists[i-1].external_urls"
            :href="PopularPlaylists[i-1].href"
            :Public="PopularPlaylists[i-1].public"
            :uri="PopularPlaylists[i-1].uri"></SongCard>
          </v-col>
        </v-row>
      </div>
      <br><br>
      <div v-if="PopularExist">
        <p class="white--text display-1 font-weight-bold">Releases</p>
        <v-row>
          <v-col xs="12" sm="6" md="3" lg="2" v-for="i in PPLength"
          :key="PopularPlaylists[i-1].id">
            <SongCard
              :id="PopularPlaylists[i-1].id"
              :name="PopularPlaylists[i-1].name"
              :description="PopularPlaylists[i-1].description"
              :images="PopularPlaylists[i-1].images"
              :type="PopularPlaylists[i-1].type"
              :collaborative="PopularPlaylists[i-1].collaborative"
              :external_urls="PopularPlaylists[i-1].external_urls"
              :href="PopularPlaylists[i-1].href"
              :Public="PopularPlaylists[i-1].public"
              :snapshot_id="PopularPlaylists[i-1].snapshot_id"
              :uri="PopularPlaylists[i-1].uri"></SongCard>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-container v-if="!ready">
      <br><br><br><br><br>
      <v-skeleton-loader
        ref="skeleton"
        type="heading"
        class="py-1"
        dark
      ></v-skeleton-loader>
      <br><br><br><br>
      <div v-for="j in 2" :key="j">
        <v-col sm="6" md="6" lg="6">
          <v-skeleton-loader
            ref="skeleton"
            type="heading"
            class="py-1"
            dark
          ></v-skeleton-loader>
        </v-col>
        <v-row class="py-12">
          <v-col sm='6' md='4' lg="2" v-for="i in 6" :key="i">
            <v-skeleton-loader
              ref="skeleton"
              type="card"
              class="mx-auto px-1"
              dark
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
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
    /**
   * fetch most popular playlists for a specific category or genre
   */
    async fetchGenreReq() {
      if (this.$route.params.id === 'RecentlyPlayed') {
        this.title = 'Recently Played';
        this.ready = true;
        const data = await Client.fetchRecentlyPlayedLists(20);
        this.PopularPlaylists = data;
        /* istanbul ignore next */
        if (this.PopularPlaylists.length) {
          this.PopularExist = true;
          this.PPLength = 4;
        }
        return;
      }
      this.ready = false;
      this.category = await Client.fetchGenre(this.$route.params.id);
      /* istanbul ignore next */
      if (this.category !== undefined && this.category !== {}) {
        if (this.category.icons && this.category.icons.length && !this.test) {
          /* istanbul ignore next */
          const result = await analyze(this.category.icons[0].url);
          /* istanbul ignore next */
          EventBus.$emit('changeColor', result[100].color);
        }
        this.title = this.category.name;
        this.ready = true;
      }
      this.PopularPlaylists = await Client.fetchCategoryPlaylists(this.$route.params.id);
      /* istanbul ignore next */
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
