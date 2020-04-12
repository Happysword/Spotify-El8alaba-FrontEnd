<template>
  <v-container>
    <v-container fluid="" class="cont" v-if="RecentExist">
      <v-row>
        <span class="white--text mt-10 display-1 font-weight-bold RECENT">Recent searches</span>
        <v-spacer></v-spacer>
        <span class="deleteAll mt-10 font-weight-bold"
        id="clear"
        @click="ClearAll()">Delete the last searches</span>
      </v-row>
      <v-row>
        <v-col  xs="12" sm="6" md="3" lg="2"
        v-for="d in Recent" :key="d.id">
         <song-card v-if="d.type != 'artist'"
          :id="d.id"
          :name="d.name"
          :description="d.description"
          :images="d.images"
          :type="d.type"
          :collaborative="d.collaborative"
          :external_urls="d.external_urls"
          :href="d.href"
          :public="d.public"
          :snapshot_id="d.snapshot_id"
          :uri="d.uri"></song-card>
         <artist-card v-if="d.type == 'artist'"
          :id="d.id"
          :profileName="d.name"
          :images="d.images"
          :type="d.type"
          :href="d.href"
        ></artist-card>
         </v-col>
    </v-row>
    </v-container>
    <v-container v-if="!RecentExist" id="NO">
          <span class="white--text display-1 font-weight-bold">
            No results for Recent Searches</span>
    </v-container>
  </v-container>
</template>

<script>
import SongCard from '../../components/SongCard.vue';
import ArtistCard from '../../components/ArtistCard.vue';

export default {
  name: 'recentSearch',
  components: {
    SongCard,
    ArtistCard,
  },
  data() {
    return {
      Recent: [],
      RecentExist: false,
    };
  },
  methods: {
    ClearAll() {
      this.Recent = [];
      localStorage.setItem('SearchHistory', JSON.stringify(this.Recent));
      this.$router.replace('/home/search');
    },
  },
  created() {
    this.Recent = JSON.parse(localStorage.getItem('SearchHistory') || '[]');
    if (this.Recent.length !== 0) {
      this.RecentExist = true;
    }
  },
};
</script>

<style scoped>
.cont{
  margin: 5px;
}
.RECENT {
  display: inline-block;
}
.deleteAll {
  color: #b3b3b3;
}
.deleteAll:hover {
  text-decoration-line: underline;
  cursor: pointer;
}
#NO{
    text-align: center;
  }
  #results{
    display: inline-block;
    overflow-wrap: break-word;
    }
</style>
