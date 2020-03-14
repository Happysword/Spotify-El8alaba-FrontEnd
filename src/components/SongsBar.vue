<template>
        <v-card
        class="d-block ml-5"
        color="#60606010"
        flat
        height="64"
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
                      {{songName}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="grey--text mx-2 text">
                      Artist . Album
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
                <label class="grey--text mx-2">{{SongTime}}</label>
              </v-card-text>
            </v-card-actions>
        </v-card>
</template>

<script>
import store from '../store';

export default {
  data: () => ({
    showIcon: 'mdi-music-note-outline',
    dotsIcon: '',
  }),
  props: {
    songName: String,
    SongTime: String,
  },
  components: {

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
