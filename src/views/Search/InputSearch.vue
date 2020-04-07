<template>
    <v-container fluid="" class="cont">
      <v-row v-if="artistsExist || tracksExist">
        <v-col xs="12" sm="12" md="6" lg="5">
          <span class="white--text mt-10 ml-10 display-1 font-weight-bold">Best result</span>
          <div @click="local(top.id, top.type)">
            <top-result
            v-if="top.type === 'track' || top.type === 'album' "
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

      </v-row>
      <v-row v-if="artistsExist">
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
           >Artists</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()"
          @mouseover="typeToSee= 'artists'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2" v-for=" i in artistLength" :key="i-1">
            <div @click="local(artists[i-1].name, artists[i-1].type)">
              <ArtistCard
                :id="artists[i-1].id"
                :name="artists[i-1].name"
                :images="artists[i-1].image"
                :type="artists[i-1].type"
                :href="artists[i-1].href"
              >
              </ArtistCard>
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

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for=" i in albumLength" :key="i-1">
            <div @click="local(albums[i-1].id, albums[i-1].type)">
              <song-card
               :id="albums[i-1].id"
               :name="albums[i-1].name"
               :description="albums[i-1].description"
               :images="albums[i-1].images"
               :type="albums[i-1].type"
               :collaborative="albums[i-1].collaborative"
               :external_urls="albums[i-1].external_urls"
               :href="albums[i-1].href"
               :public="albums[i-1].public"
               :snapshot_id="albums[i-1].snapshot_id"
               :uri="albums[i-1].uri">
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

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="i in playlistLength"
            :key="i-1">
            <div @click="local(playlists[i-1].id, playlists[i-1].type)">
             <song-card
              :id="playlists[i-1].id"
              :name="playlists[i-1].name"
              :description="playlists[i-1].description"
              :images="playlists[i-1].images"
              :type="playlists[i-1].type"
              :collaborative="playlists[i-1].collaborative"
              :external_urls="playlists[i-1].external_urls"
              :href="playlists[i-1].href"
              :public="playlists[i-1].public"
              :snapshot_id="playlists[i-1].snapshot_id"
              :uri="playlists[i-1].uri"></song-card>
            </div>
          </v-col>
      </v-row>
      <v-row v-if="usersExist">
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
           >Profiles</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()"
          @mouseover="typeToSee= 'users'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="i  in userLength" :key="i-1">
                  <div @click="local(users[i-1].id, users[i-1].type)">
                   <ArtistCard
                   :id="users[i-1].id"
                   :name="users[i-1].name"
                   :images="users[i-1].image"
                   :type="users[i-1].type"
                   :href="users[i-1].href"
                   ></ArtistCard>
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
// import SearchSong from '../../components/SongsBar.vue';
import SongCard from '../../components/SongCard.vue';


export default {
  name: 'InputSearch',
  components: {
    TopResult,
    // SearchSong,
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
      users: [],
      NoResult: false,
      tracksExist: false,
      playlistsExist: false,
      albumsExist: false,
      artistsExist: false,
      usersExist: false,
      imageTop: '',
      SearchHistory: [],
      SavedData: { },
      artistLength: 0,
      playlistLength: 0,
      userLength: 0,
      albumLength: 0,
      trackLength: 0,
    };
  },
  methods: {
    async local(id, type) {
      console.log(id);
      let data;
      if (type === 'track') {
        data = await Client.fetchTrack(id);
      } else if (type === 'album') {
        data = await Client.fetchAlbum(id);
      } else if (type === 'artist') {
        data = await Client.fetchAnArtist(id);
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
      } else if (this.typeToSee === 'users') {
        this.$router.push(`/home/search/${this.$route.params.id}/users`);
      }
    },
    async fetchSearch() {
      this.artistsExist = false;
      this.tracksExist = false;
      this.playlistsExist = false;
      this.albumsExist = false;
      this.NoResult = false;
      const response = await Client.fetchSearch(this.$route.params.id);
      console.log(response);
      if (response) {
        if (response.artists) {
          this.artists = [];
          this.users = [];
          if (response.artists.length > 0) {
            for (let i = 0; i < response.artists.length; i += 1) {
              if (response.artists[i].type === 'artist') {
                this.artists.push(response.artists[i]);
              } else if (response.artists[i].type === 'user') {
                this.users.push(response.artists[i]);
              }
            }
            this.artistLength = this.artists.length < 6 ? this.artists.length : 6;
            this.artistsExist = this.artistLength ? true : 0;
            this.userLength = this.users.length < 6 ? this.users.length : 6;
            this.usersExist = this.userLength ? true : 0;
          }
        }
        if (response.albums) {
          if (response.albums.length > 0) {
            this.albums = response.albums;
            this.albumsExist = true;
            this.albumLength = this.albums.length < 6 ? this.albums.length : 6;
          }
        }
        if (response.playlists) {
          if (response.playlists.length > 0) {
            this.playlists = response.playlists;
            this.playlistsExist = true;
            this.playlistLength = this.playlists.length < 6 ? this.playlists.length : 6;
          }
        }
        if (response.tracks) {
          if (response.tracks.length > 0) {
            this.tracks = response.tracks;
            this.tracksExist = true;
          }
        }
        if (this.artistsExist && this.tracksExist) {
          if (this.artists[0].popularity >= this.tracks[0].popularity) {
            const top = this.artists[0];
            this.top = top;
            if (this.top.image) {
              this.imageTop = this.top.image.url;
            } else {
              this.imageTop = 'https://www.scdn.co/i/_global/twitter_card-default.jpg';
            }
          } else {
            const top = this.tracks[0];
            this.top = top;
            if (this.top.images.length) {
              this.imageTop = this.top.images[0].url;
            } else {
              this.imageTop = 'https://www.scdn.co/i/_global/twitter_card-default.jpg';
            }
          }
        } else if (this.artistsExist && !this.tracksExist) {
          const top = this.artists[0];
          this.top = top;
          this.top.type = 'artist';
          if (this.top.image) {
            this.imageTop = this.top.image.url;
          } else {
            this.imageTop = 'https://www.scdn.co/i/_global/twitter_card-default.jpg';
          }
        } else if (!this.artistsExist && this.tracksExist) {
          const top = this.tracks[0];
          this.top = top;
          this.top.type = 'track';
          if (this.top.images.length) {
            this.imageTop = this.top.images[0].url;
          } else {
            this.imageTop = 'https://www.scdn.co/i/_global/twitter_card-default.jpg';
          }
        }
        if (!this.artistsExist && !this.usersExist
        && !this.playlistsExist && !this.albumsExist && !this.tracksExist) {
          this.NoResult = true;
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
