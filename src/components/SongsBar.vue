<template>
        <v-card
        class="d-block ml-5"
        color="#60606010"
        flat
        height="64"
        active-class
        @mouseover="changeicon(1)"
        @mouseleave="changeicon(0)"
        @click="changeicon(2)"
        >
            <v-card-actions>
                <v-icon color="grey">
                 {{showIcon}}
                </v-icon>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="white--text mx-2 subtitle">
                      {{song.songname}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="grey--text mx-2 text">
                      {{ song.artist }} . {{song.album}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-text  align="end">
                  <v-menu absolute>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      size="20"
                      class="px-2 mx-2"
                      v-on="on"
                      color="#E0E0E0">
                       {{dotsIcon}}
                    </v-icon>
                  </template>
                  <dropDown></dropDown>
                </v-menu>
                <label class="grey--text mx-2">{{song.duration}}</label>
              </v-card-text>
            </v-card-actions>
        </v-card>
</template>

<script>
import store from '../store';
import dropDown from './mockDropdown.vue';

export default {
  data: () => ({
    showIcon: 'mdi-music-note-outline',
    dotsIcon: '',
  }),
  props: {
    song: Object,
  },
  components: {
    dropDown,
  },
  methods: {
    changeicon(hover) {
      this.dotsIcon = 'mdi-dots-horizontal';
      if (hover === 2) {
        store.commit('changePlay');
      }
      if (hover === 0) {
        this.showIcon = 'mdi-music-note-outline';
        this.dotsIcon = '';
      } else if (store.state.play === true) {
        this.showIcon = 'mdi-pause';
      } else {
        this.showIcon = 'mdi-play';
      }
    },
  },

};
</script>
<style scoped>
:hover{
  background-color: #38050520;
}
</style>
