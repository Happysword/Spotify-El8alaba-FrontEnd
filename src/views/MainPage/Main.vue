<template>
  <v-app>
    <Navbar></Navbar>
    <Topbar></Topbar>
    <v-content class="grey darken-4" color="#282828">
      <router-view></router-view>
    </v-content>
    <music-player></music-player>
  </v-app>
</template>

<script>
import Navbar from '../../components/NavBar.vue';
import Topbar from '../../components/TopBar.vue';
import MusicPlayer from '../../components/MusicPlayer.vue';

export default {
  name: 'Main',

  components: {
    Navbar,
    Topbar,
    MusicPlayer,
  },

  data: () => ({
    //
  }),
};
</script>
