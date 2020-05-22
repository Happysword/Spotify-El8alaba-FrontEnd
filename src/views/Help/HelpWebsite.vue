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
          Our Important Features
        </div>
        <div class="headline font-weight-light">
          What can we offer you is a lot. We will just show you a few.
        </div>

        <v-divider class="mt-5 mb-5"></v-divider>
        <div class="font-weight-light body-1 ml-5 mt-5 text-center">
          <div class="mb-3">
            You can Navigate through our WebPlayer through the NavBar.
          </div>
          <v-row align="center" justify="center">
            <v-img
              max-height="500"
              max-width="200"
              src="../../assets/imgs/Help/navbar.png"
            ></v-img>
          </v-row>
          <v-divider class="mt-5 mb-5"></v-divider>
          <div class="mt-5 mb-3">
            The Home page offers a variety of Playlist for you as well as your
            recently played
          </div>
          <v-row align="center" justify="center">
            <v-img
              max-height="600"
              max-width="600"
              src="../../assets/imgs/Help/homepage.png"
            ></v-img>
          </v-row>
          <v-divider class="mt-5 mb-5"></v-divider>
          <div class="mt-5 mb-3">
            You can Search through our database in the Search Section for your
            favourite Artists and Tracks
          </div>
          <v-row align="center" justify="center">
            <v-img
              max-height="600"
              max-width="600"
              src="../../assets/imgs/Help/search.png"
            ></v-img>
          </v-row>
          <v-divider class="mt-5 mb-5"></v-divider>
          <div class="mt-5 mb-3">
            You can create a New Playlist to Save all your favourite songs or to
            show your Friends.
          </div>
          <v-row align="center" justify="center">
            <v-img
              max-height="400"
              max-width="400"
              src="../../assets/imgs/Help/createplaylist.png"
            ></v-img>
          </v-row>
          <v-divider class="mt-5 mb-10"></v-divider>
          <div class="headline mt-10 mb-3">
            Join Now and Enjoy All these Features and Much More.
          </div>
          <v-btn
            x-large
            rounded
            class="green lighten-1 white--text"
            to="/signup"
            >Sign Up Now</v-btn
          >
        </div>
      </v-col></v-row
    >
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
