<template>
  <v-footer app dark class="mock-player" height="90">
    <v-container>
      <v-row>
        <v-col justify="center" align-self="center">
          <h1 id="mock-div">Music Player Mock</h1>
        </v-col>
        <v-col justify="center" align-self="center">
          <v-btn to="/home/queue">
            <v-icon>mdi-playlist-play</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container></v-footer>
</template>

<script>
export default {};
</script>

<style scoped>
.mock-player {
  color: white;
  width: 100%;
}
#mock-div {
  text-align: center;
}
</style>
