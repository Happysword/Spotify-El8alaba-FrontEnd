<template>
  <div>
    <Navbar :searching=true></Navbar>
  </div>
</template>

<script>
import Navbar from '../../components/NavBar.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
  },
};
</script>
