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
          :images="d.images"
          :type="d.type"
          ></song-card>
         <artist-card v-if="d.type == 'artist'"
          :id="d.id"
          :profileName="d.name"
          :images="d.images"
          :type="d.type"
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
    const temp = JSON.parse(localStorage.getItem('SearchHistory') || '[]');
    if (temp.length !== 0) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      for (let i = 0; i < temp.length; i += 1) {
        if (user.data.id === temp[i].UserID) {
          this.Recent.push(temp[i]);
        }
        // eslint-disable-next-line no-unused-expressions
        this.Recent.length ? this.RecentExist = true : this.RecentExist = false;
      }
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
