<template>
  <div>
    <v-container v-if="empty" class="my-6 text-center">
      <v-icon class="py-5" size="100" color="#FFFFFFE0">
        mdi-spotify
      </v-icon>
      <p class=" py-2 display-2 font-weight-bold white--text">
        It's a bit empty here...
      </p>
      <p class="subtitle-1 grey--text">
        Let's find some songs for your playlist
      </p>
      <v-btn light rounded width=200 class="body-2" route to="/NewReleases">
        NEW RELEASES
      </v-btn>
    </v-container>
    <v-container v-if="!empty" class="my-1 pl-0 text-truncate">
      <songsCard v-for="(song,index) in songs"
        :key="index"
        :counter="index"
        :song="song"
        :list="songs"
        :listid="listId"
        listType="playlist"
        :listOwner="ownerID"
      >
      </songsCard>
    </v-container>
    <br><br><br>
    <template v-if="type === 'playlist'">
      <v-row>
        <v-col lg= "9" sm="6" md="9" class=" py-2 title white--text text-left"
          @click="showIcon()" style="cursor: pointer">
          Recommended Songs
          <v-icon color="white">
            {{ icon }}
          </v-icon>
        </v-col>
        <v-col lg= "3" sm="6" md="3">
          <v-btn rounded dark outlined width="130" class="mx-10" @click="refresh()">
            Refresh
          </v-btn>
        </v-col>
      </v-row>
      <template v-if="show">
        <songsCard class="text-left ml-n5" v-for="(song,index) in recommended"
          :key="index"
          :counter="index"
          :song="song"
          :list="recommended"
          :recommend="recommend"
          listType="album"
        >
        </songsCard>
      </template>
    </template>
  </div>
</template>

<script>
import server from 'api-client';
import songsCard from './SongsBar.vue';
import EventBus from '../EventBus';

export default {
  data() {
    return {
      show: true,
      icon: 'mdi-menu-up',
      recommended: [],
      recommend: true,
      songs: [],
      empty: true,
    };
  },
  props: {
    ownerID: String,
    listId: String,
    type: String,
  },
  components: {
    songsCard,
  },
  methods: {
    /**
     * Show/Hide recommended Tracks
     */
    showIcon() {
      this.show = !this.show;
      if (this.show === true) {
        this.icon = 'mdi-menu-up';
      } else {
        this.icon = 'mdi-menu-down';
      }
    },

    /**
     * Refresh recommended tracks
     */
    async refresh() {
      this.recommended = await server.fetchRecommendedTracks();
    },
  },
  created() {
    if (this.type === 'playlist') {
      this.refresh();
    }
  },
  mounted() {
    EventBus.$on('refreshSongs', async () => {
      server.fetchSongs(this.$route.params.id)
        .then((res) => {
          this.songs = res;
          if (this.songs.length > 0) {
            this.empty = false;
          } else {
            this.empty = true;
          }
        });
    });
  },
};
</script>
