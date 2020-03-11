<template>
  <v-navigation-drawer app color="#040404" dark v-model="drawer">
    <v-list>
      <v-list-item-content>
        <v-img src="../assets/imgs/El-8alaba.png" contain height="120"></v-img>
      </v-list-item-content>
      <v-list-item
        v-for="link in links"
        :key="link.text"
        route
        :to="link.route"
      >
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="subtitle-2">{{
            link.text
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: true,
      links: [
        { icon: 'mdi-home', text: 'Home', route: '/home' },
        { icon: 'mdi-magnify', text: 'Search', route: '/home/search' },
      ],
    };
  },
  props: {
    searching: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
