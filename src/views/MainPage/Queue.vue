<template>
  <div class="cover-color">
    <v-container class="cover-color">
      <v-row no-gutters>
        <v-col cols="12">
          <h1 class="header-one header">
            Play Queue
          </h1>
        </v-col>
        <v-col cols="12">
          <h2 class="header header-two">
            Now Playing
          </h2>
        </v-col>
        <v-col>
          <m-song></m-song>
        </v-col>
      </v-row>
      <v-row no-gutters
        ><v-col cols="12">
          <h2 class="header header-two">
            Next Up
          </h2>
        </v-col>
        <v-col v-for="i in 10" :key="i" cols="12">
          <m-song></m-song>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import mSong from '../../components/MockSongQ.vue';

export default {
  name: 'Queue',
  components: { mSong },
};
</script>

<style scoped>
.header {
  line-height: 1.6;
  font-weight: 600;
  letter-spacing: -0.36px;
  color: #fff;
  margin: 16px 0;
}
.header-one {
  font-size: 28px;
}
.header-two {
  font-size: 18px;
}
.div {
  font-family: spotify-circular, spotify-circular-cyrillic,
    spotify-circular-arabic, spotify-circular-hebrew, Helvetica Neue, Helvetica,
    Arial, Hiragino Kaku Gothic Pro, Meiryo, MS Gothic, sans-serif;
}
.cover-color {
  color: black;
  background-color: #121212;
}
</style>
