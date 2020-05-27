<template>
  <v-container>
    <v-row class="pa-0">
      <v-col cols="3" class="mt-12 mb-12 pa-0">
        <v-row>
          <div class="display-1 mt-5 grey--text text--darken-1">
            How can we help you?
          </div>
        </v-row>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-row>
          <v-btn
            text
            class="font-weight-light black--text headline text-none mt-5 mb-10 pa-0"
            to="/help/player"
            >Player Features</v-btn
          >
        </v-row>

        <v-row>
          <v-btn
            text
            class="font-weight-light black--text headline text-none mb-10 pa-0"
            to="/help/profile"
            >Edit Profile</v-btn
          >
        </v-row>
        <v-row>
          <v-btn
            text
            class="font-weight-light black--text headline text-none mb-10 pa-0"
            to="/help/website"
            >Website Features</v-btn
          >
        </v-row>

        <v-row>
          <v-btn
            text
            class="font-weight-light black--text headline text-none mb-10 pa-0"
            to="/help/password"
            >Password Reset</v-btn
          >
        </v-row>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="8" class="mt-10 mb-12 ml-10">
        <div class="display-2 font-weight-black mb-12">
          Player Features for You
        </div>
        <div class="headline font-weight-light">
          Here are Some of Our Player Features for your Entertainment
        </div>
        <v-row align="center" justify="center" class="mb-12">
          <v-img
            class="mt-5"
            src="../../assets/imgs/Help/MusicPlayer.png"
          ></v-img>
        </v-row>
        <ul class="font-weight-medium body-1 ml-5 mt-5 mb-12">
          <li>
            You can expand the picture of the album on the left to the NavBar By
            pressing the arrow on the picture.
          </li>
          <li>
            You can Switch to the Album page or the Artist quickly by pressing
            on their names.
          </li>
          <li>
            You can Like/Unlike a Song that is played without going anywhere
            else.
          </li>
          <li>
            You can Enter Picture In Picture Mode to control your Music from
            Anyplace.
          </li>
          <li>
            You can Seek, Play, Pause, Skip Next/Previous, Shuffle and Repeat
            any song you like.
          </li>
          <li>
            You can go to your queue and change what you want to hear or change
            your volume and mute.
          </li>
        </ul>

        <div class="display-2 font-weight-black mb-12 mt-10">
          Picture in Picture
        </div>
        <div class="headline font-weight-light text-justify">
          The Picture-in-Picture component allows you to create a floating
          window that is always on top of other windows so that you may continue
          listening to Music while interacting with other sites or applications
          on your device.
        </div>
        <v-row align="center" justify="center" class="mb-12">
          <v-img
            class="mt-5"
            max-height="400"
            max-width="400"
            src="../../assets/imgs/Help/Pnp.png"
          ></v-img>
        </v-row> </v-col
    ></v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
