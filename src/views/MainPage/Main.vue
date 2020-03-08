<template>
    <v-content
    :style="`background: linear-gradient(0deg,rgba(0,0,0,1) 56%, ${store.state.styling[1]} 100%);`">
      <Navbar></Navbar>
      <router-view></router-view>
    </v-content>
</template>

<script>
import Navbar from '../../components/NavBar.vue';
import store from '../../store';

export default {
  name: 'Main',

  components: {
    Navbar,
  },

  data: () => ({
    store,
  }),
};
</script>
