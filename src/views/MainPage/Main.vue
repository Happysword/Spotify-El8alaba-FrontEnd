<template>
  <v-app :style="`background: linear-gradient(0deg,rgba(18,18,18,20) 70%, ${color} 100%);`">
    <Navbar />
    <Topbar />
    <v-content>
      <router-view />
    </v-content>
    <music-player />
    <Overlays />
  </v-app>
</template>

<script>
import api from 'api-client';
import EventBus from '../../EventBus';
import Navbar from '../../components/NavBar.vue';
import Topbar from '../../components/TopBar.vue';
import MusicPlayer from '../../components/MusicPlayer.vue';
import Overlays from '../../components/Overlays.vue';

export default {
  name: 'Main',
  beforeRouteEnter(to, from, next) {
    next(() => {
      // Find the loggedIn cookie
      const notLoggedIn = document.cookie.search(/loggedIn=.+/) === -1;

      if (notLoggedIn) {
        next('/login');
      } else {
        next();
      }
    });
  },
  components: {
    Navbar,
    Topbar,
    MusicPlayer,
    Overlays,
  },
  data: () => ({
    color: 'rgba(18,18,18,255)',
    snackbar: {
      show: false,
      timeout: 2000,
      content: '',
    },
    overlay: false,
    listId: '',
  }),
  methods: {
    restoreColor() {
      this.color = 'rgba(18,18,18,255)';
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
