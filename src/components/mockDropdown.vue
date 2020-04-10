<template>
      <v-list dark id="menu">
        <v-list-item
          v-for="(item, index) in store.state.items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
</template>

<script>
import store from '../store';

export default {
  name: 'Home',
  components: {
  },

  data: () => ({
    store,
  }),

};
</script>
