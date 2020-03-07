<template>
  <v-app-bar color="#0C0C0C" dense dark app>
    <v-btn color="#040404" small fab class="mx-2" flat>
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <v-btn color="#040404" small fab class="mx-2" flat>
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn rounded depressed outlined class="mx-4" route to="/signup"
      >SIGN UP</v-btn
    >

    <v-btn
      rounded
      depressed
      color="white black--text"
      class="mx-4"
      route
      to="/login"
      >LOG IN</v-btn
    >
  </v-app-bar>
</template>

<script>
export default {
  name: 'Topbar',
};
</script>
