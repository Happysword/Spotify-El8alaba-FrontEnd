<template>
    <div class="ml-12">
        <v-card class="d-inline-block ml-12 justify-end" dark>
            <v-img  @mouseover="overlay=true" @mouseout="overlay=false"
                height="300"
                :src="store.state.playlistImg">
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
              <v-icon v-show="!store.state.liked" size="30" class="px-3" @click="changeLiked">
                mdi-heart-outline
              </v-icon>
              <v-icon v-show="store.state.liked" size="30"
              color='#1DB954' class="px-3" @click="changeLiked">
                mdi-heart
              </v-icon>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-icon size="30" class="px-3" v-on="on">
                    mdi-dots-horizontal
                  </v-icon>
                </template>
                <dropDown></dropDown>
              </v-menu>
            </v-card-actions>
            <p class="text-center grey--text">
               {{store.state.numberOfLikedSongs}} Songs
            </p>
        </v-card>
    </div>
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

  }),

  methods: {
    changeStatus() {
      store.commit('changePlay');
      if (store.state.play === true) {
        this.playSong = 'Pause';
      } else {
        this.playSong = 'Play';
      }
    },
    changeLiked() {
      store.commit('changeLiked');
    },
  },

  components: {
    dropDown,
  },
};
</script>
