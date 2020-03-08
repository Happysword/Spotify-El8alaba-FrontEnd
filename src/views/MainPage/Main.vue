<template>

    <v-content class="grey darken-4">

      <Navbar></Navbar>
      <router-view></router-view>

    </v-content>

</template>

<script>
import Navbar from '../../components/NavBar.vue';

export default {
  name: 'Main',

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
