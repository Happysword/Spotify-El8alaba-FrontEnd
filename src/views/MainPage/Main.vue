<template>

    <v-content class="grey darken-4" color="#282828">

      <Navbar></Navbar>
      <router-view></router-view>

    </v-content>

</template>

<script>
import Navbar from '../../components/NavBar.vue';

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
