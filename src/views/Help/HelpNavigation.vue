<template>
  <div class="svg-photo">
    <v-container class="pa-12">
      <v-row justify="center" align="center" class="mt-12 mb-12 pa-5">
        <v-col cols="12">
          <div class=" text-center white--text font-weight-medium display-4">
            How can we help you?
          </div></v-col
        ></v-row
      >
      <v-row align-content="center">
        <v-col>
          <v-row
            justify="center"
            align="center"
            class="font-weight-light grey--text headline mb-10 mt-10"
          >
            Learn about our player
          </v-row>
          <v-row justify="center">
            <v-btn class="font-weight-medium white--text" text to="/help/player"
              >Learn More</v-btn
            ></v-row
          >
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <v-row
            justify="center"
            align="center"
            class="font-weight-light grey--text headline mb-10 mt-10"
            >How to edit your profile
          </v-row>
          <v-row justify="center">
            <v-btn
              text
              class="font-weight-medium white--text"
              to="/help/profile"
              >Learn More</v-btn
            ></v-row
          >
        </v-col>

        <v-divider vertical></v-divider>
        <v-col>
          <v-row
            justify="center"
            align="center"
            class="font-weight-light grey--text headline mb-10 mt-10"
            >Forgot your password?
          </v-row>
          <v-row justify="center">
            <v-btn
              text
              class="font-weight-medium white--text"
              to="/help/password"
              >Learn More</v-btn
            ></v-row
          >
        </v-col>

        <v-divider vertical></v-divider>
        <v-col>
          <v-row
            justify="center"
            align="center"
            class="font-weight-light grey--text headline mb-10 mt-10"
            >Using our Website
          </v-row>
          <v-row justify="center">
            <v-btn
              text
              class="font-weight-medium white--text"
              to="/help/website"
              >Learn More</v-btn
            ></v-row
          >
        </v-col>
      </v-row>
    </v-container>
  </div></template
>

<script>
export default {};
</script>

<style scoped>
.svg-photo {
  background-image: url('https://support.scdn.co/static/img/fw/search-desktop.png');
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
