<template>
  <div>
    <v-container fluid="" class="cont" v-if="ready">
      <v-container v-if="dataExist">
        <p class="white--text font-weight-bold display-1">
                Viewing {{this.$route.params.type}} for {{this.$route.params.id}}
            </p>
            <v-row>
            <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in data" :key="card.id">
                  <song-card
                      v-if="card.type != 'artist' && card.type != 'user'"
                      :id="card.id"
                      :name="card.name"
                      :description="card.description"
                      :images="card.images"
                      :type="card.type"
                      :collaborative="card.collaborative"
                      :external_urls="card.external_urls"
                      :href="card.href"
                      :Public="card.public"
                      :snapshot_id="card.snapshot_id"
                      :uri="card.uri">
                  </song-card>
                  <artist-card
                      v-if="card.type === 'artist'"
                      :id="card.id"
                      :name="card.name"
                      :images="card.image"
                      :type="card.type"
                      :href="card.href">
                  </artist-card>
                  <profile-card
                      v-if="card.type === 'user'"
                      :profileName="card.name"
                      :id="card.id"
                      :images="card.image ? card.image : [{ url:'https://www.scdn.co/i/_global/twitter_card-default.jpg'}]"
                      :type="card.type">
                  </profile-card>
            </v-col>

            </v-row>
        </v-container>
        <v-container v-if="!dataExist" id="NO">
            <span class="white--text display-1 font-weight-bold" id="results">
            No results for {{ this.$route.params.id }} {{ this.$route.params.type}}</span>
        </v-container>
    </v-container>
    <v-container v-if="!ready">
      <v-col sm="6" md="6" lg="6">
        <v-skeleton-loader
            ref="skeleton"
            type="heading"
            class="py-1"
            dark
        ></v-skeleton-loader>
      </v-col>
      <v-row class="pb-6" v-for="j in 2" :key="j">
        <v-col sm='6' md='4' lg="2" v-for="i in 6" :key="i">
          <v-skeleton-loader
            ref="skeleton"
            type="card"
            class="mx-auto px-1"
            dark
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Client from 'api-client';
import SongCard from '../../components/SongCard.vue';
import ArtistCard from '../../components/ArtistCard.vue';
import ProfileCard from '../../components/ProfileCard.vue';

export default {
  name: 'searchType',
  components: {
    SongCard,
    ArtistCard,
    ProfileCard,
  },
  data() {
    return {
      data: Array,
      dataExist: false,
      ready: false,
    };
  },
  methods: {
    /**
   * fetch specific type of data according to users selection or input
   */
    async fetchSearch() {
      this.ready = false;
      this.dataExist = false;
      this.data = [];
      const response = await Client.fetchSearch(`${this.$route.params.id} ${this.$route.params.type}`);
      if (response) {
        if (response.artists && this.$route.params.type === 'artists') {
          this.data = response.artists;
        } else if (response.albums && this.$route.params.type === 'albums') {
          this.data = response.albums;
        } else if (response.playlists && this.$route.params.type === 'playlists') {
          this.data = response.playlists;
        } else if (response.tracks && this.$route.params.type === 'tracks') {
          this.data = response.tracks;
        } else if (response.users && this.$route.params.type === 'users') {
          this.data = response.users;
        }
        if (this.data.length > 0) { this.dataExist = true; }
      }
      console.log(this.data.length);
      this.ready = true;
    },
  },
  async created() {
    await this.fetchSearch();
  },
};
</script>

<style scoped>
.cont{
  margin: 5px;
}
#NO{
    text-align: center;
}
#results{
    display: inline-block;
    overflow-wrap: break-word;
}
</style>
