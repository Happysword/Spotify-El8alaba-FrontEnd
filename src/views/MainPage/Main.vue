<template>
  <v-content class="grey darken-4" color="#282828">
    <Navbar></Navbar>
    <Topbar></Topbar>
    <router-view></router-view>
  </v-content>
</template>

<script>
import Navbar from '../../components/NavBar.vue';
import Topbar from '../../components/TopBar.vue';

export default {
  name: 'Main',

  components: {
    Navbar,
    Topbar,
  },

  data: () => ({
    //
  }),
};
</script>
