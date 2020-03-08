<template>
  <nav>
    <v-navigation-drawer app color="#040404" dark v-model="drawer">
      <v-list>
        <v-list-item-content>
          <v-img src="../assets/imgs/El-8alaba.png" contain height="120"></v-img>
        </v-list-item-content>
        <v-list-item v-for="link in links" :key="link.text" route :to="link.route">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitle-2">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#0C0C0C" dense dark app>
      <v-btn color="#040404" small fab class="mx-2" depressed>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn color="#040404" small fab class="mx-2" depressed>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn rounded depressed outlined class="mx-4" route to="/signup">SIGN UP</v-btn>

      <v-btn rounded depressed color="white black--text" class="mx-4"
      route to="/login">LOG IN</v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: true,
      links: [
        { icon: 'mdi-home', text: 'Home', route: '/' },
        { icon: 'mdi-heart', text: 'Liked Songs', route: '/library/tracks' },
      ],
    };
  },
};
</script>
