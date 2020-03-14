<template>
  <v-layout column>
    <v-row align="alignment" justify="justify" class="mx-0">
      <v-layout row align-center justify-center>
        <v-icon color="grey" class="mx-4" dense small>
          mdi-shuffle-variant
        </v-icon>

        <v-icon color="grey" class="mx-4" dense medium>
          mdi-skip-previous
        </v-icon>

        <v-icon
          color="grey"
          class="mx-4"
          dense
          x-large
          v-if="$store.state.MusicPlayer.isPlaying"
          @click="togglePlay"
        >
          mdi-pause-circle-outline
        </v-icon>

        <v-icon
          color="grey"
          class="mx-4"
          dense
          x-large
          v-else
          @click="togglePlay"
        >
          mdi-play-circle-outline
        </v-icon>

        <v-icon color="grey" class="mx-4" dense medium>
          mdi-skip-next
        </v-icon>

        <v-icon color="grey" class="mx-4" dense small>
          mdi-repeat
        </v-icon>
      </v-layout>
    </v-row>

    <v-row align-content="center" justify="center" class="mx-0" no-gutters>
      <v-layout justify-center align-center row>
        <v-col class="ml-5 mr-0 pa-0 " cols="1">
          <div class="number-div mx-0 pa-0">0:10</div>
        </v-col>

        <v-col class="mt-3 mb-3 mr-5 pa-0">
          <v-progress-linear background-color="grey" color="green" rounded>
          </v-progress-linear>
        </v-col>

        <v-col class=" pa-0 " cols="1">
          <div class="number-div">2:10</div>
        </v-col>
      </v-layout>
    </v-row>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['togglePlay']),
  },
};
</script>

<style scoped>
.number-div {
  width: 20px;
  height: 20px;
  color: rgb(146, 145, 145);
  font-size: 12px;
  font-family: Helvetica Neue, Helvetica, Arial, Hiragino Kaku Gothic Pro,
    Meiryo, MS Gothic, sans-serif;
}
</style>
