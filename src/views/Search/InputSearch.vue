<template>
    <v-container fluid="" class="cont">
      <v-row justify>
        <v-col xs="12" sm="12" md="6" lg="5">
          <span class="white--text mt-10 ml-10 display-1 font-weight-bold">Best result</span>
            <top-result
            :id="t[0].id"
            :image="t[0].image"
            :name="t[0].name"
            :track="t[0].track"
            :type="t[0].type"
            :artistName="t[0].artistName"
            :owner="t[0].owner" class="a"></top-result>
            </v-col>
<div class="ss">
  <v-row class="mb-1 mt-2 head" >
  <span class="white--text display-1 font-weight-bold z">Tracks</span>
<v-spacer></v-spacer>
  <span class="seeAll" @click="spanClicked()" @mouseover="typeToSee= 'tracks'">See All</span>
</v-row>
  <v-row class="sect"  v-for="x in tracks" :key="x.id">
          <v-col  xs="12" sm="12" md="6" lg="6" class="ss">
        <search-song
            :id="x.id"
            :image="x.image"
            :SongName="x.SongName"
            :track="x.track"
            :artistName="x.artistName"
            class="ss"></search-song>
        </v-col>
        </v-row>
        </div>
      </v-row>

      <v-row>
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
           v-show="t[0].type == 'artist'">Featuring {{ t[0].artistName }}</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in playlists.items" :key="card.id">
                   <song-card :id="card.id" :name="card.name"
                   :description="card.description" :images="card.images"
                   :type="card.type"
                   ></song-card>
            </v-col>
      </v-row>
       <v-row>
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
           >Artists</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()"
          @mouseover="typeToSee= 'artists'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in playlists.items" :key="card.id">
                   <song-card :id="card.id" :name="card.name"
                   :description="card.description" :images="card.images"
                   :type="card.type"
                   ></song-card>
            </v-col>
      </v-row>
       <v-row>
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
          >Albums</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()"
          @mouseover="typeToSee= 'albums'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in playlists.items" :key="card.id">
                   <song-card :id="card.id" :name="card.name"
                   :description="card.description" :images="card.images"
                   :type="card.type"
                   ></song-card>
            </v-col>
      </v-row>
    </v-container>
</template>

<script>
import top from '@/api/mock/data/top.json';
import Tracks from '../../api/mock/data/SearchSong.json';
import TopResult from '../../components/TopResult.vue';
import SearchSong from '../../components/SearchSong.vue';
import SongCard from '../../components/SongCard.vue';
import JsonPlaylists from '../../json/Get-Current-User-Playlists.json';

export default {
  name: 'InputSearch',
  components: {
    TopResult,
    SearchSong,
    SongCard,
  },
  data() {
    return {
      t: top,
      tracks: Tracks,
      playlists: JsonPlaylists,
      typeToSee: '',
    };
  },
  methods: {
    spanClicked() {
      if (this.typeToSee === 'tracks') {
        this.$router.push(`/home/search/${this.$store.state.InputSearch}/tracks`);
      } else if (this.typeToSee === 'albums') {
        this.$router.push(`/home/search/${this.$store.state.InputSearch}/albums`);
      } else if (this.typeToSee === 'artists') {
        this.$router.push(`/home/search/${this.$store.state.InputSearch}/artists`);
      }
    },
  },
  mounted() {
    this.$store.state.searching = true;
  },
  destroyed() {
    this.$store.state.searching = false;
  },
};
</script>

<style scoped>
.attribute{
  width: 86%;
  padding: 15px;
}
.seeAll{
 color: #b3b3b3;
 margin-right: 6px;
}
.seeAll:hover{
  text-decoration-line: underline;
  cursor: pointer;
}
.a{
  margin: 0px;
  margin-left: -100px;
}
.cont{
  margin: 5px;
}
.head{
  width:260%;
}
.sect{
  width: 550%;
  padding: 00px;
  }
.ss{
  padding: 0px;
  margin: 0px;
  }
</style>
