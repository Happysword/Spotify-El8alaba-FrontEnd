<template>
  <v-app :style="
        `background: linear-gradient(0deg,rgba(0,0,0,1) 56%, ${color} 100%);`
      ">
    <Navbar></Navbar>
    <Topbar></Topbar>
    <v-content
    >
      <router-view></router-view>
    </v-content>
    <!--<music-player></music-player>-->
  </v-app>
</template>

<script>
import EventBus from '../../EventBus';
import Navbar from '../../components/NavBar.vue';
import Topbar from '../../components/TopBar.vue';
// import MusicPlayer from '../../components/MusicPlayer.vue';

export default {
  name: 'Main',

  components: {
    Navbar,
    Topbar,
    // MusicPlayer,
  },
  data: () => ({
    color: 'rgba(10,10,10,255)',
  }),
  methods: {
    restoreColor() {
      this.color = 'rgba(10,10,10,255)';
    },
  },
  mounted() {
    EventBus.$on('changeColor', (color) => {
      this.color = color;
    });
  },
  watch: {
    $route: 'restoreColor',
  },
};
</script>
