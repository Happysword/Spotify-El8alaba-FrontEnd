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
      <v-container>
        <v-row>
          <v-col
            ><div
              class=" headline font-weight-medium green--text mt-5 text--darken-1
              text-center"
            >
              This was made for a School Project Under the Software Engineering
              course. It is a replica of most of Spotify's features. We Hope you
              Like our Product.
            </div>
          </v-col></v-row
        >
        <v-row align="center" justify="center">
          <v-col cols="8">
            <div class="display-3 font-weight-bold mt-10  text-center">
              About Us
            </div>
            <div class="text-justify subtitle-1 font-weight-bold mt-5">
              With Spotify elghalaba it’s easy to find the right music for every
              moment – on your phone or your computer. There are millions of
              tracks on Spotify elghalaba. So whether you’re behind the wheel,
              working out, partying or relaxing, the right music is always at
              your fingertips. Choose what you want to listen to. You can also
              browse through the collections of friends, artists, and
              celebrities. Soundtrack your life with Spotify elghalaba.
              Subscribe or listen for free.
            </div>
            <div class="display-3 font-weight-bold mt-10  text-center">
              Disclaimer
            </div>
            <div class="subtitle-1 font-weight-bold mt-5 text-center">
              The Music Used does not in anyway belong to Us, and we do not
              encourage any redistribution without the consent of its Owners.
            </div>
          </v-col>
          <v-col cols="4" align-self="center">
            <v-img
              src="../../assets/imgs/El-8alaba.png"
              class="mt-4 ml-5"
              id="logo-about"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
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
  name: 'About',
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
#logo-about {
  height: 100%;
  width: 100%;
}
.list-btns {
  color: white;
}
.list-btns:hover {
  color: rgb(4, 196, 4);
}
</style>
