<template>
  <div>
    <v-icon class="py-5" size="100" color="#FFFFFFE0">
      mdi-spotify
    </v-icon>
    <p class=" py-2 display-2 font-weight-bold white--text">
      It's a bit empty here...
    </p>
    <p class="subtitle-1 grey--text">
      Let's find some songs for your playlist
    </p>
    <v-btn light rounded width=200 class="body-2" route to="/home">
      NEW RELEASES
    </v-btn>
  </div>
</template>

<script>
export default {
};
</script>
