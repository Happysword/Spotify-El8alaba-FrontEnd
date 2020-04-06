<template>
  <v-app :style="
        `background: linear-gradient(0deg,rgba(0,0,0,1) 70%, ${color} 100%);`
      ">
    <Navbar></Navbar>
    <Topbar></Topbar>
    <v-content
    >
      <router-view></router-view>
    </v-content>
    <music-player></music-player>
  </v-app>
</template>

<script>
import api from 'api-client';

import EventBus from '../../EventBus';
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
    color: 'rgba(10,10,10,255)',
  }),
  methods: {
    restoreColor() {
      this.color = 'rgba(10,10,10,255)';
    },
  },
  async mounted() {
    EventBus.$on('changeColor', (color) => {
      this.color = color;
    });

    // Update localStorage accordingly
    if (!localStorage.currentUser) {
      const tokenRes = await api.fetchToken();
      const profileRes = await api.getCurrentUserProfile();
      // 200 OK
      if (tokenRes.status === 200 && profileRes.status === 200) {
        const currentUser = { token: tokenRes.data.token, data: profileRes.data };
        localStorage.currentUser = JSON.stringify(currentUser);
      }
    }
  },
  watch: {
    $route: 'restoreColor',
  },
};
</script>
