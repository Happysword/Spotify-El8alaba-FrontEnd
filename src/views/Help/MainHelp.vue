<template>
  <v-app>
    <v-app-bar color="black" app>
      <!-- Controller for nav Drawer -->
      <v-btn
        @click.stop="drawer = !drawer"
        v-if="$vuetify.breakpoint.xs"
        depressed
      >
        <v-icon>mdi-view-sequential</v-icon>
      </v-btn>
      <v-btn x-large rounded class="green white--text ml-5" to="/">HOME</v-btn>
      <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
      <!-- List if Normal Desktops -->
      <ul v-if="$vuetify.breakpoint.smAndUp">
        <v-btn
          v-for="i in buttons.length"
          :key="i"
          class="btn-green text-none list-btns"
          type="li"
          left
          text
          large
          :id="buttons[i - 1].id"
          :to="buttons[i - 1].route"
        >
          {{ buttons[i - 1].name }}</v-btn
        >
      </ul>
    </v-app-bar>
    <!-- Drawer for mobile and Tablets-->
    <v-navigation-drawer
      app
      v-if="$vuetify.breakpoint.xs"
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list nav dense>
        <v-list-item-group
          v-for="i in buttons.length"
          :key="i"
          class="btn-green text-none"
        >
          <v-list-item :to="buttons[i - 1].route">
            <v-list-item-title>{{ buttons[i - 1].name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content class="white" app>
      <router-view></router-view>
    </v-content>

    <v-footer app absolute dark class="trans-bar">
      <v-btn to="/about">About</v-btn>
      <v-btn to="/help">Help</v-btn>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
/**
 * @vue-data {Booelan} drawer - Flag for the Navigation drawer
 * @vue-data {Array} Buttons - Array of Objects of the Buttons
 */
export default {
  name: 'Help',
  /* istanbul ignore next */

  data: () => ({
    buttons: [
      {
        name: 'DOWNLOAD',
        route: '/download',
        id: 'download-btn',
      },
      {
        name: 'PREMIUM',
        route: '/premium',
        id: 'premium-btn',
      },
      {
        name: 'LOGIN',
        route: '/login',
        id: 'login-btn',
      },
      {
        name: 'SIGN UP',
        route: '/signup',
        id: 'signup-btn',
      },
    ],
    drawer: false,
  }),
};
</script>

<style scoped>
.list-btns {
  color: white;
}
.list-btns:hover {
  color: rgb(4, 196, 4);
}
</style>
