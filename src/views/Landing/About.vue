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
      <v-btn x-large rounded class="green white--text ml-5">HOME</v-btn>
      <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
      <!-- List if Normal Desktops -->
      <ul v-if="$vuetify.breakpoint.smAndUp">
        <v-btn
          v-for="i in buttons.length"
          :key="i"
          class="btn-green text-none"
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
              This Was made for a School Project Under the Software Engineering
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
              encourage any redistribution without the consent of its composers
              and writers.
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
  </v-app>
</template>

<script>
/**
 * @vue-data {Booelan} drawer - Flag for the Navigation drawer
 * @vue-data {Array} Buttons - Array of Objects of the Buttons
 */
export default {
  name: 'Landing',
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
  created() {
    document.title = 'About - Spotify El8alaba';
  },
};
</script>

<style scoped>
.svg-photo {
  background-image: url('https://www.scdn.co/i/home/hero-burst-mobile.svg');
  background-size: cover;
}
.wrap {
  background-color: #f037a5;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(-60%, #f037a5),
    color-stop(140%, #fae62d)
  );
  background: linear-gradient(#f037a5 -60%, #fae62d 140%);
}
.cover {
  width: 100%;
  height: 100%;
}
.text-main {
  color: #ffffff;
  text-align: center;
}
.margin-bottom-small {
  margin-bottom: 5%;
}
.trans-bar {
  opacity: 0.7;
  position: fixed;
}
.btn-green {
  color: #ffffff;
}
.btn-green:hover {
  color: #20d15e;
}
#small-button {
  width: 10px;
}
#logo-about {
  height: 100%;
  width: 100%;
}
</style>
