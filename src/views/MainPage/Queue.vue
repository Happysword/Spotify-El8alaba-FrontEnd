<template>
  <div class="cover-color">
    <v-container class="cover-color ml-5 ">
      <v-row no-gutters>
        <v-col cols="12">
          <h1 class="header-one header mb-0">
            Play Queue
          </h1>
        </v-col>
        <v-col cols="12">
          <h2 class="header header-two">
            Now Playing
          </h2>
        </v-col>
        <v-col>
          <s-card
            :song="$store.state.MusicPlayer.currentSong"
            :list="$store.state.MusicPlayer.currentList"
            :counter="0"
          ></s-card>
        </v-col>
      </v-row>
      <v-row no-gutters v-if="$store.state.MusicPlayer.currentList.length > 1"
        ><v-col cols="12">
          <h2 class="header header-two">
            Next Up
          </h2>
        </v-col>
        <v-col
          v-for="i in $store.state.MusicPlayer.currentList.length"
          :key="i"
          cols="12"
        >
          <s-card
            :song="$store.state.MusicPlayer.currentList[i]"
            :counter="i"
            :list="$store.state.MusicPlayer.currentList"
          ></s-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import sCard from '../../components/SongsBar.vue';

// TODO[@Seif]  fix queue color

export default {
  name: 'Queue',
  components: { sCard },
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
  width: 100%;
  height: 100%;
  background: #60606017;
}
</style>
