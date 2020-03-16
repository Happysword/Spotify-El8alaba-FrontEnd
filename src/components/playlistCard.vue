<template>
        <v-card class="mx-auto px-5 white--text"
        color="#00000000" flat max-width="344">
            <v-img  @mouseover="overlay=true" @mouseout="overlay= store.state.play"
                :src="store.state.playlistImg" class="mt-1">
                <v-overlay v-show="overlay" absolute>
                    <v-icon size="70" color="white"
                    v-if="!store.state.play" @click="changeStatus">
                    mdi-play-circle-outline
                    </v-icon>
                    <v-icon size="70" color="white"
                    v-if="store.state.play" @click="changeStatus">
                    mdi-pause-circle-outline
                    </v-icon>
                </v-overlay>
            </v-img>
            <v-card-title class="justify-center headline font-weight-bold" >
              {{store.state.playListName}}
            </v-card-title>
            <v-card-actions class="justify-center">
            <v-btn
            rounded
            inline-block
            dark
            color='#1DB954'
            class="mt-2 px-10"
            large
            @click="changeStatus">
            {{playSong}}
            </v-btn>
            </v-card-actions>
            <v-card-actions class="justify-center">
              <v-icon v-show="!store.state.liked" size="30"
              class="px-3" @click="changeLiked" color="#E0E0E0">
                mdi-heart-outline
              </v-icon>
              <v-icon v-show="store.state.liked" size="30"
              color='#1DB954' class="px-3" @click="changeLiked">
                mdi-heart
              </v-icon>
              <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                color='#1DB954'
              >
                <h3 class="white--text title font-weight-light mx-auto">{{ text }}</h3>
              </v-snackbar>
              <v-menu absolute>
                <template v-slot:activator="{ on }">
                  <v-icon
                    size="30"
                    class="px-3"
                    v-on="on"
                    @click="tooltip = false"
                    @mouseover="tooltip = true"
                    @mouseleave="tooltip = false"
                    color="#E0E0E0">
                      mdi-dots-horizontal
                  </v-icon>
                </template>
                <dropDown></dropDown>
              </v-menu>
              <v-tooltip right v-model="tooltip">
                <template v-slot:activator="{ on1 }">
                  <v-icon v-on="on1"></v-icon>
                </template>
                <span>More</span>
              </v-tooltip>
            </v-card-actions>
            <p class="text-center grey--text">
               {{store.state.numberOfLikedSongs}} Songs
            </p>
        </v-card>
</template>
<script>
import store from '../store';
import dropDown from './mockDropdown.vue';

export default {
  name: 'LikedTracks',

  data: () => ({

    overlay: false,
    playSong: 'Play',
    store,
    snackbar: false,
    text: '',
    timeout: 2000,
    tooltip: false,

  }),

  methods: {
    changeStatus() {
      store.commit('changePlay');
    },
    changeLiked() {
      store.commit('changeLiked');
      this.snackbar = true;
      if (store.state.liked === true) {
        this.text = 'Saved to Your Library';
      } else {
        this.text = 'Removed from Your Library';
      }
    },
  },
  updated() {
    if (store.state.play === true) {
      this.playSong = 'Pause';
    } else {
      this.playSong = 'Play';
    }
  },
  components: {
    dropDown,
  },
};
</script>
