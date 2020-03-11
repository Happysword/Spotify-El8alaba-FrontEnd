<template>
  <v-app>
    <Navbar></Navbar>
    <Topbar></Topbar>
    <v-content
      :style="
        `background: linear-gradient(0deg,rgba(0,0,0,1) 56%, ${store.state.styling[1]} 100%);`
      "
    >
      <router-view></router-view>
    </v-content>
    <music-player></music-player>
  </v-app>
</template>

<script>
import Navbar from '../../components/NavBar.vue';
import Topbar from '../../components/TopBar.vue';
import MusicPlayer from '../../components/MusicPlayer.vue';
import store from '../../store';

export default {
  name: 'Main',

  components: {
    Navbar,
    Topbar,
    MusicPlayer,
  },

  data: () => ({
    store,
  }),
};
</script>
