<template>

    <v-content class="grey darken-4 ml-12 mr-n12 pr-0 pl-12" fluid color="#282828">
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
