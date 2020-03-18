<template>
        <v-card class="mx-auto px-5 white--text"
        color="#00000000" flat max-width="344">
            <v-img  @mouseover="overlay=true" @mouseout="overlay= play"
                :src="images.url" class="mt-1">
                <v-overlay v-show="overlay" absolute>
                    <v-icon size="70" color="white"
                    v-if="!play" @click="changeStatus">
                    mdi-play-circle-outline
                    </v-icon>
                    <v-icon size="70" color="white"
                    v-if="play" @click="changeStatus">
                    mdi-pause-circle-outline
                    </v-icon>
                </v-overlay>
            </v-img>
            <v-card-title class="justify-center headline font-weight-bold pb-0" >
              {{name}}
            </v-card-title>
            <v-card-title class="justify-center body-2 text grey--text pt-0" v-if="show">
              <span v-for="(owner,i) in owners" :key="i">{{owner.name}}</span>
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
              <v-icon v-show="!store.state.liked" v-if="show" size="30"
              class="px-3" @click="changeLiked" color="#E0E0E0">
                mdi-heart-outline
              </v-icon>
              <v-icon v-show="store.state.liked" v-if="show" size="30"
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
              <span v-show="show">
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
              </span>
              <v-tooltip right v-model="tooltip">
                <template v-slot:activator="{ on1 }">
                  <v-icon v-on="on1"></v-icon>
                </template>
                <span>More</span>
              </v-tooltip>
            </v-card-actions>
            <p class="text-center grey--text">
               {{songsNum}} Songs
            </p>
        </v-card>
</template>
<script>
import store from '../store';
import dropDown from './mockDropdown.vue';
import EventBus from '../EventBus';

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
    play: false,

  }),
  props: {
    songsNum: Number,
    show: Boolean,
    images: Object,
    name: String,
    owners: Array,
  },
  methods: {
    changeStatus() {
      this.play = !this.play;
      EventBus.$emit('pause', this.play);
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
  mounted() {
    EventBus.$on('changePlay', (play) => {
      this.play = play;
    });
  },
  updated() {
    if (this.play === true) {
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
