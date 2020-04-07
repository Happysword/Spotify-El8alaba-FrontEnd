<template>
    <v-container fluid="" class="cont">
        <v-row v-if="dataExist">
            <p class="white--text font-weight-bold display-1">
                Viewing {{this.$route.params.type}} for {{this.$route.params.id}}
            </p>
            <v-row>
            <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in data" :key="card.id">
                   <song-card
                    :id="card.id"
                    :name="card.name"
                    :description="card.description"
                    :images="card.images"
                    :type="card.type"
                    :collaborative="card.collaborative"
                    :external_urls="card.external_urls"
                    :href="card.href"
                    :public="card.public"
                    :snapshot_id="card.snapshot_id"
                    :tracks="card.tracks"
                    :uri="card.uri"></song-card>
            </v-col>

            </v-row>
        </v-row>
        <v-container v-if="!dataExist" id="NO">
            <span class="white--text display-1 font-weight-bold" id="results">
            No results for {{ this.$route.params.id }} {{ this.$route.params.type}}</span>
        </v-container>
    </v-container>
</template>

<script>
import Client from 'api-client';
import SongCard from '../../components/SongCard.vue';

export default {
  name: 'searchType',
  components: {
    SongCard,
  },
  data() {
    return {
      data: [],
      NoResult: false,
      dataExist: false,
    };
  },
  methods: {
    async fetchSearch() {
      this.datasExist = false;
      console.log(`${this.$route.params.id} ${this.$route.params.type}`);
      const response = await Client.fetchSearch(`${this.$route.params.id} ${this.$route.params.type}`);
      console.log(response);
      if (response) {
        if (response.artists && this.$route.params.type === 'artists') {
          this.data = response.artists.items;
          this.dataExist = true;
        }
        if (response.albums && this.$route.params.type === 'albums') {
          this.data = response.albums.items;
          this.dataExist = true;
        }
        if (response.playlists && this.$route.params.type === 'playlists') {
          this.data = response.playlists.items;
          this.dataExist = true;
        }
        if (response.tracks && this.$route.params.type === 'tracks') {
          this.data = response.tracks.items;
          this.dataExist = true;
        }
      }
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
