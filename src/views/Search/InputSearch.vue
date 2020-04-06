<template>
    <v-container fluid="" class="cont">
      <v-row v-if="artistsExist || tracksExist">
        <v-col xs="12" sm="12" md="6" lg="5">
          <span class="white--text mt-10 ml-10 display-1 font-weight-bold">Best result</span>
          <div @click="local(top.id, top.type)">
            <top-result
            v-if="top.type === 'track'"
            :id="top.id"
            :name="top.name"
            :image="imageTop"
            :type="top.type"
            :artists="top.artists"
            class="a"></top-result>
          </div>
          <div @click="local(top.id, top.type)">
            <top-result
            v-if="top.type === 'artist'"
            :id="top.id"
            :image="imageTop"
            :name="top.name"
            :type="top.type"
            class="a"></top-result>
          </div>
            </v-col>
<div class="ss ml-6" v-if="tracksExist">
  <v-row class="mb-1 mt-2 head" >
  <span class="white--text display-1 font-weight-bold z">Tracks</span>
<v-spacer></v-spacer>
  <span class="seeAll" @click="spanClicked()" @mouseover="typeToSee= 'tracks'">See All</span>
</v-row>
  <v-row class="sect"  v-for="x in tracks" :key="x.id">
          <v-col  xs="12" sm="12" md="6" lg="6" class="ss">
            <div @click="local(x.id, 'track')">
        <search-song
            :id="x.id"
            :image="x.album.images[0].url"
            :SongName="x.name"
            :artists="x.artists"
            :albumID="x.album.id"
            :uri="x.uri"
            class="ss"></search-song>
            </div>
        </v-col>
        </v-row>
        </div>
      </v-row>
      <v-row v-if="artistsExist">
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
           >Artists</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()"
          @mouseover="typeToSee= 'artists'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in artists" :key="card.id">
                  <div @click="local(card.id, card.type)">
                   <ArtistCard
                   :id="card.id"
                   :profileName="card.name"
                   :images="card.images"
                   :type="card.type"
                   :href="card.href"
                   ></ArtistCard>
                  </div>
            </v-col>
      </v-row>
       <v-row v-if="albumsExist">
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
          >Albums</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()"
          @mouseover="typeToSee= 'albums'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in albums" :key="card.id">
                  <div @click="local(card.id, card.type)">
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
                     :uri="card.uri">
                    </song-card>
                  </div>
          </v-col>
      </v-row>
      <v-row v-if="playlistsExist">
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
          >Playlists</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()"
          @mouseover="typeToSee= 'playlists'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in playlists" :key="card.id">
                  <div @click="local(card.id, card.type)">
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
                  </div>
            </v-col>
      </v-row>
      <v-container v-if="NoResult" id="NO">
          <span class="white--text display-1 font-weight-bold">
            No results for "{{ this.$route.params.id }}"</span>
            <p class="white--text">Please check the spelling of the words.
              You can also try to use fewer keywords or other keywords.</p>
      </v-container>
    </v-container>
</template>

<script>
import Client from 'api-client';
import ArtistCard from '../../components/ArtistCard.vue';
import TopResult from '../../components/TopResult.vue';
import SearchSong from '../../components/SearchSong.vue';
import SongCard from '../../components/SongCard.vue';


export default {
  name: 'InputSearch',
  components: {
    TopResult,
    SearchSong,
    SongCard,
    ArtistCard,
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
      SearchHistory: [],
      SavedData: { },
    };
  },
  methods: {
    async local(id, type) {
      let data;
      if (type === 'track') {
        data = await Client.fetchTrack(id);
      } else if (type === 'album') {
        data = await Client.fetchAlbum(id);
      } else if (type === 'artist') {
        data = await Client.fetchArtist(id);
      } else if (type === 'playlist') {
        data = await Client.fetchPlaylist(id);
      }
      this.SearchHistory = JSON.parse(localStorage.getItem('SearchHistory') || '[]');
      console.log(this.SearchHistory);
      if (!(this.SearchHistory.some((x) => x.id === data.id))) {
        this.SavedData.name = data.name;
        this.SavedData.id = data.id;
        this.SavedData.description = data.description;
        this.SavedData.type = data.type;
        this.SavedData.collaborative = data.collaborative;
        this.SavedData.external_urls = data.external_urls;
        this.SavedData.href = data.href;
        this.SavedData.public = data.public;
        this.SavedData.snapshot_id = data.snapshot_id;
        this.SavedData.tracks = data.tracks;
        this.SavedData.uri = data.uri;
        if (data.type === 'track') {
          this.SavedData.images = data.album.images;
        } else if (data.images[0]) {
          this.SavedData.images = data.images;
        }
        this.SearchHistory.push(this.SavedData);
        localStorage.setItem('SearchHistory', JSON.stringify(this.SearchHistory));
      }
    },
    spanClicked() {
      if (this.typeToSee === 'tracks') {
        this.$router.push(`/home/search/${this.$route.params.id}/tracks`);
      } else if (this.typeToSee === 'albums') {
        this.$router.push(`/home/search/${this.$route.params.id}/albums`);
      } else if (this.typeToSee === 'artists') {
        this.$router.push(`/home/search/${this.$route.params.id}/artists`);
      } else if (this.typeToSee === 'playlists') {
        this.$router.push(`/home/search/${this.$route.params.id}/playlists`);
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
