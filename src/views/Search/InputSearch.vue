<template>
    <v-container fluid="" class="cont">
      <v-row v-show="artistsExist || tracksExist">
        <v-col xs="12" sm="12" md="6" lg="5">
          <span class="white--text mt-10 ml-10 display-1 font-weight-bold">Best result</span>
            <top-result
            v-show="top.type === 'track'"
            :id="top.id"
            :name="top.name"
            :image="imageTop"
            :type="top.type"
            :artists="top.artists"
            class="a"></top-result>
            <top-result
            v-show="top.type === 'artist'"
            :id="top.id"
            :image="imageTop"
            :name="top.name"
            :type="top.type"
            class="a"></top-result>
            </v-col>
<div class="ss ml-6" v-show="tracksExist">
  <v-row class="mb-1 mt-2 head" >
  <span class="white--text display-1 font-weight-bold z">Tracks</span>
<v-spacer></v-spacer>
  <span class="seeAll" @click="spanClicked()" @mouseover="typeToSee= 'tracks'">See All</span>
</v-row>
  <v-row class="sect"  v-for="x in tracks" :key="x.id">
          <v-col  xs="12" sm="12" md="6" lg="6" class="ss">
        <search-song
            :id="x.id"
            :image="x.album.images[0].url"
            :SongName="x.name"
            :artists="x.artists"
            class="ss"></search-song>
        </v-col>
        </v-row>
        </div>
      </v-row>
      <v-row v-show="artistsExist">
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
           >Artists</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()"
          @mouseover="typeToSee= 'artists'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in artists" :key="card.id">
                   <song-card :id="card.id" :name="card.name"
                   :images="card.images"
                   :type="card.type"
                   ></song-card>
            </v-col>
      </v-row>
       <v-row v-show="albumsExist">
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
          >Albums</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()"
          @mouseover="typeToSee= 'albums'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in albums" :key="card.id">
                   <song-card :id="card.id" :name="card.name"
                   :description="card.description" :images="card.images"
                   :type="card.type"
                   ></song-card>
            </v-col>
      </v-row>
      <v-row v-show="playlistsExist">
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
          >Playlists</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()"
          @mouseover="typeToSee= 'albums'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in playlists" :key="card.id">
                   <song-card :id="card.id" :name="card.name"
                   :description="card.description" :images="card.images"
                   :type="card.type"
                   ></song-card>
            </v-col>
      </v-row>
      <v-container v-show="NoResult" id="NO">
          <span class="white--text display-1 font-weight-bold">
            No results for </span>
          <span class="white--text display-1 font-weight-bold" id="results">
            "&nbsp;{{ this.$route.params.id }}&nbsp;" </span>
            <p class="white--text">Please check the spelling of the words.
              You can also try to use fewer keywords or other keywords.</p>
      </v-container>
    </v-container>
</template>

<script>
// import top from '@/api/mock/data/top.json';
// import Tracks from '../../api/mock/data/SearchSong.json';
import TopResult from '../../components/TopResult.vue';
import SearchSong from '../../components/SearchSong.vue';
import SongCard from '../../components/SongCard.vue';
// import JsonPlaylists from '../../json/Get-Current-User-Playlists.json';
import Client from '../../api/mock';
// :image="top.images[0].url"
export default {
  name: 'InputSearch',
  components: {
    TopResult,
    SearchSong,
    SongCard,
  },
  data() {
    return {
      top: {},
      tracks: [],
      playlists: [],
      typeToSee: '',
      albums: [],
      artists: [],
      NoResult: false,
      tracksExist: false,
      playlistsExist: false,
      albumsExist: false,
      artistsExist: false,
      imageTop: '',
    };
  },
  methods: {
    spanClicked() {
      if (this.typeToSee === 'tracks') {
        this.$router.push(`/home/search/${this.$route.params.id}/tracks`);
      } else if (this.typeToSee === 'albums') {
        this.$router.push(`/home/search/${this.$route.params.id}/albums`);
      } else if (this.typeToSee === 'artists') {
        this.$router.push(`/home/search/${this.$route.params.id}/artists`);
      }
    },
    async fetchSearch() {
      this.artistsExist = false;
      this.tracksExist = false;
      this.playlistsExist = false;
      this.albumsExist = false;
      this.NoResult = false;
      const response = await Client.fetchSearch(this.$route.params.id);
      if (response) {
        if (response.artists) {
          this.artists = response.artists.items;
          this.artistsExist = true;
        }
        if (response.albums) {
          this.albums = response.albums.items;
          this.albumsExist = true;
        }
        if (response.playlists) {
          this.playlists = response.playlists.items;
          this.playlistsExist = true;
        }
        if (response.tracks) {
          this.tracks = response.tracks.items;
          this.tracksExist = true;
        }
        if (this.artists[0].popularity >= this.tracks[0].popularity) {
          const top = this.artists[0];
          this.top = top;
          this.imageTop = this.top.images[0].url;
        } else {
          const top = this.tracks[0];
          this.top = top;
          this.imageTop = this.top.album.images[0].url;
        }
      } else {
        this.NoResult = true;
      }
    },
  },
  watch: {
    $route(to) {
      this.fetchSearch(to.params.id);
    },
  },
  async created() {
    await this.fetchSearch(this.$route.params.id);
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
  margin: px;
  }
  #NO{
    text-align: center;
  }
  #results{
    display: inline-block;
    overflow-wrap: break-word;
    }
</style>
