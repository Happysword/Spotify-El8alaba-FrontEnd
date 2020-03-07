<template>
  <v-content class="black">
    <div class="wrap cover">
      <div class="cover svg-photo">
        <v-app-bar color="black" class="trans-bar">
          <v-img
            src="../assets/imgs/El-8alaba.png"
            contain="true"
            height="80"
            width="80"
          ></v-img>
          <v-spacer></v-spacer>
          <ul>
            <v-btn
              v-for="button in buttons"
              :key="button"
              type="li"
              left
              text
              color="white"
              :to="button.route"
            >
              {{ button.name }}</v-btn
            >
          </ul>
        </v-app-bar>
        <div class="text-main cover">
          <v-container fill-height>
            <v-row
              justify="center"
              class="font-weight-bold margin-bottom-small"
              :class="{
                'display-1': $vuetify.breakpoint.xs,
                'display-3': $vuetify.breakpoint.sm,
                'display-4': $vuetify.breakpoint.mdAndUp,
              }"
            >
              Music for everyone.
            </v-row>
            <v-row
              justify="center"
              :class="{
                title: $vuetify.breakpoint.smAndDown,
                'display-1': $vuetify.breakpoint.mdAndUp,
              }"
            >
              Millions of songs. Free for all.
            </v-row>
            <v-row justify="center">
              <v-btn
                to="/download"
                color="#1db954"
                class="text-main"
                rounded
                depressed
                x-large
              >
                Get spotify free
              </v-btn>
            </v-row>
          </v-container>
        </div>
      </div>
    </div>
  </v-content>
</template>

<script>
export default {
  name: 'Landing',
  data: () => ({
    buttons: [
      {
        name: 'Download',
        route: '/download',
      },
      {
        name: 'Premium',
        route: '/premium',
      },
      {
        name: 'Login',
        route: '/login',
      },
      {
        name: 'SignUp',
        route: '/signup',
      },
    ],
  }),
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
}
.opac-bar {
  opacity: 1;
}
</style>
