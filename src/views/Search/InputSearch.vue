<template>
  <div>
    <v-container fluid="" class="cont" v-if="ready">
      <v-row v-if="artistsExist || tracksExist">
        <v-col xs="12" sm="12" md="6" lg="5">
          <span class="white--text mt-10 ml-8 display-1 font-weight-bold">Best result</span>
          <div @click="local(top.id, top.type)">
            <top-result
            v-if="top.type === 'album' "
            id="top1"
            :IDP="top.id"
            :name="top.name"
            :image="imageTop"
            :albumID="top.album"
            :type="top.type"
            :artists="top.artists"
            class="a"></top-result>
            <top-result
            v-if="top.type === 'track'"
            id="top1"
            :IDP="top.id"
            :name="top.name"
            :image="imageTop"
            :albumID="top.album"
            :type="top.type"
            :artists="top.artists"
            :track="top"
            class="a"></top-result>
          </div>
          <div @click="local(top.id, top.type)">
            <top-result
            v-if="top.type === 'artist'"
            id="top2"
            :IDP="top.id"
            :image="imageTop"
            :name="top.name"
            :type="top.type"
            class="a"></top-result>
          </div>
        </v-col>
        <v-col class="ss ml-6" v-if="tracksExist">
          <v-row class="mb-1 mt-2 head" >
            <span class="white--text display-1 font-weight-bold z">Tracks</span>
            <v-spacer></v-spacer>
            <span class="seeAll" id="seeAllTracks"
            @click="spanClicked()" @mouseover="typeToSee= 'tracks'">See All</span>
            </v-row>
          <v-row v-for="i in trackLength"  :key="i-1">
            <v-col xs="12" sm="12" md="12" lg="12" class="ss">
            <div @click="local(tracks[i-1].id, 'track')">
              <search-song
                :track="tracks[i-1]"
                ></search-song>
            </div>
            </v-col>
          </v-row>
        </v-col>

      </v-row>
      <v-row v-if="artistsExist">
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
           >Artists</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()" id="seeartists"
          @mouseover="typeToSee= 'artists'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2" v-for=" i in artistLength" :key="i-1">
            <div @click="local(artists[i-1].id, artists[i-1].type)">
              <ArtistCard
                :id="artists[i-1].id"
                :name="artists[i-1].name"
                :images="[artists[i-1].image]"
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
          <span class="seeAll" @click="spanClicked()" id="seealbums"
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
               :Public="albums[i-1].public"
               :snapshot_id="albums[i-1].snapshot_id"
               :uri="albums[i-1].uri"
               :owner="''">
              </song-card>
            </div>
          </v-col>
      </v-row>
      <v-row v-if="playlistsExist">
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
          >Playlists</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()" id="seeplaylists"
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
              :Public="playlists[i-1].public"
              :snapshot_id="playlists[i-1].snapshot_id"
              :owner="playlists[i-1].owner.id"
              :uri="playlists[i-1].uri"></song-card>
            </div>
          </v-col>
      </v-row>
      <v-row v-if="usersExist">
        <v-layout row class="attribute" xs="12" sm="12" md="12" lg="12">
          <span class="white--text display-1 font-weight-bold z"
           >Profiles</span>
           <v-spacer></v-spacer>
          <span class="seeAll" @click="spanClicked()" id="seeusers"
          @mouseover="typeToSee= 'users'">See All</span>
        </v-layout>

          <v-col  xs="12" sm="6" md="3" lg="2"  v-for="i  in userLength" :key="i-1">
                  <div @click="local(users[i-1].id, users[i-1].type)">
                   <profile-card
                   :profileName="users[i-1].name"
                   :id="users[i-1].id"
                   :images="users[i-1].image ? users[i-1].image : [{ url:'https://www.scdn.co/i/_global/twitter_card-default.jpg'}]"
                   :type="users[i-1].type"
                   ></profile-card>
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
    <v-container v-if="!ready">
      <br><br>
      <v-row>
        <v-skeleton-loader
          ref="skeleton"
          type="heading"
          class="py-1 pl-2"
          dark
          width="50%"
        ></v-skeleton-loader>
        <v-spacer></v-spacer>
        <v-skeleton-loader
          ref="skeleton"
          type="heading"
          class="py-1 pl-n6"
          dark
          width="50%"
        ></v-skeleton-loader>
      </v-row>
      <v-row>
        <v-col xs="12" sm="12" md="6" lg="5">
          <v-skeleton-loader
            ref="skeleton"
            type="card"
            class="mx-auto px-1"
            dark
            tile
          ></v-skeleton-loader>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="7">
          <v-skeleton-loader
            v-for="i in 3" :key="i"
            ref="skeleton"
            type="list-item-avatar-two-line"
            class="py-2"
            dark
            tile
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <div v-for="j in 3" :key="j">
        <v-col sm="6" md="6" lg="6">
          <v-skeleton-loader
            ref="skeleton"
            type="heading"
            class="pt-6"
            dark
          ></v-skeleton-loader>
        </v-col>
        <v-row class="py-6">
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
import ArtistCard from '../../components/ArtistCard.vue';
import TopResult from '../../components/TopResult.vue';
import SearchSong from '../../components/SearchSong.vue';
import SongCard from '../../components/SongCard.vue';
import ProfileCard from '../../components/ProfileCard.vue';

export default {
  name: 'InputSearch',
  components: {
    TopResult,
    ProfileCard,
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
      ready: false,
    };
  },
  methods: {
    /**
   * add the data to recent search as the user has clicked on it
   * @param {string} type type of data as it could be track, artist, user, album or playlist
   * @param {string} id id of data
   */
    async local(id, type) {
      // sending request to fetch related data
      let data;
      if (type === 'track') {
        data = await Client.fetchTrack(id);
        data = data.data;
      } else if (type === 'album') {
        data = await Client.fetchAlbum(id);
      } else if (type === 'artist') {
        data = await Client.fetchAnArtist(id);
        // eslint-disable-next-line prefer-destructuring
        data = data[0];
      } else if (type === 'playlist') {
        data = await Client.fetchList(id);
      } else if (type === 'user') {
        data = await Client.fetchaUserProfile(id, JSON.parse(localStorage.getItem('currentUser')).token);
      }
      // checking local storage if it contains the same id
      this.SearchHistory = JSON.parse(localStorage.getItem('SearchHistory') || '[]');
      if (!(this.SearchHistory.some((x) => x.id === data.id))) {
        const temp = JSON.parse(localStorage.getItem('currentUser'));
        this.SavedData.UserID = temp.data.id;
        this.SavedData.name = data.name;
        this.SavedData.id = data.id;
        this.SavedData.type = data.type;
        if (data.type === 'track') {
          this.SavedData.album = data.album;
        }
        if (data.type === 'track' || data.type === 'user') {
          this.SavedData.images = [{ url: 'https://www.scdn.co/i/_global/twitter_card-default.jpg' }];
        } else {
          // eslint-disable-next-line no-unused-expressions
          data.images.length ? this.SavedData.images = data.images : this.SavedData.images = [{ url: 'https://www.scdn.co/i/_global/twitter_card-default.jpg' }];
        }
        this.SearchHistory.push(this.SavedData);
        localStorage.setItem('SearchHistory', JSON.stringify(this.SearchHistory));
      }
    },
    /**
   * redirect to see specific type of data as clicked on "see all"
   */
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
    /**
   * fetch data related to the user's input
   */
    async fetchSearch() {
      const response = await Client.fetchSearch(this.$route.params.id);
      this.ready = false;
      this.artists = [];
      this.users = [];
      this.tracks = [];
      this.playlists = [];
      this.albums = [];
      this.artistsExist = false;
      this.usersExist = false;
      this.tracksExist = false;
      this.playlistsExist = false;
      this.albumsExist = false;
      this.NoResult = false;
      if (response) {
        if (response.artists) {
          if (response.artists) {
            if (response.artists.length > 0) {
              this.artists = response.artists;
              this.artistsExist = true;
              this.artistLength = this.artists.length < 6 ? this.artists.length : 6;
            }
          }
        }
        if (response.users) {
          if (response.users) {
            if (response.users.length > 0) {
              this.users = response.users;
              this.usersExist = true;
              this.userLength = this.users.length < 6 ? this.users.length : 6;
            }
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
            this.trackLength = this.tracks.length <= 3 ? this.tracks.length : 3;
          }
        }
        // selecting Top Result of data
        if (this.artistsExist && this.tracksExist) {
          if (this.artists[0].popularity >= this.tracks[0].popularity) {
            const top = this.artists[0];
            this.top = top;
            if (this.top.image) {
              /* istanbul ignore next */
              this.imageTop = this.top.image.url;
            } else {
              this.imageTop = 'https://www.scdn.co/i/_global/twitter_card-default.jpg';
            }
          } else {
            const top = this.tracks[0];
            this.top = top;
            if (this.top.images && this.top.images.length) {
              this.imageTop = this.top.images[0].url;
            } else {
              /* istanbul ignore next */
              this.imageTop = 'https://www.scdn.co/i/_global/twitter_card-default.jpg';
            }
          }
        } /* istanbul ignore next */ else if (this.artistsExist && !this.tracksExist) {
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
          this.top.albumID = top.album;
          this.top.type = 'track';
          this.imageTop = 'https://www.scdn.co/i/_global/twitter_card-default.jpg';
        }
        if (!this.artistsExist && !this.usersExist
        && !this.playlistsExist && !this.albumsExist && !this.tracksExist) {
          this.NoResult = true;
        }
      } else {
        this.NoResult = true;
      }
      this.ready = true;
    },
  },
  watch: {
    $route() {
      this.fetchSearch();
      // setTimeout(50);
      this.$forceUpdate();
      // setTimeout(50);
    },
  },
  async created() {
    await this.fetchSearch();
  },
  mounted() {
    this.$store.state.searching = true;
  },
  /* istanbul ignore next */
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
 margin-right: 40px;
 align-self: flex-end;
 justify-self: end;
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
  padding: 0px;
  }
.ss{
  padding: 0px;
  margin-right: 60px;
  }
  #NO{
    text-align: center;
  }
  #results{
    display: inline-block;
    overflow-wrap: break-word;
    }
  #seeAllTracks {
    margin-right: 60%;
  }
</style>
