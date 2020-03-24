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
          <s-card :song="QueueArray[0]" :counter="0"></s-card>
        </v-col>
      </v-row>
      <v-row no-gutters v-if="QueueArray.length > 1"
        ><v-col cols="12">
          <h2 class="header header-two">
            Next Up
          </h2>
        </v-col>
        <v-col v-for="i in QueueArray.length-1" :key="i" cols="12">
          <s-card :song="QueueArray[i]" :counter="i"></s-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import sCard from '../../components/SongsBar.vue';

// TODO[@Seif] Add Queue from store arrays and fix queue color
export default {
  name: 'Queue',
  components: { sCard },
  data: () => ({
    QueueArray: [
      {
        songname: 'Mutlu Sonuz (Delibal Original Sountrack)',
        artist: 'Çağatay Ulusoy ',
        album: ' Mutlu Sonsuz (Delibal Original Soundtrack)',
        duration: '2:15',
      },
      {
        songname: 'Mutlu Sonuz (Delibal Original Sountrack)',
        artist: 'Second song ',
        album: ' Mutlu Sonsuz (Delibal Original Soundtrack)',
        duration: '2:15',
      },
    ],
  }),
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
  background:#60606017;
}
</style>
