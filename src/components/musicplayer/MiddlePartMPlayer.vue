<template>
  <v-col align-self="center" class="mx-0">
    <v-row align="alignment" justify="justify" class="mx-0">
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
    </v-row>

    <v-row align-content="center" justify="center" class="mx-0">
      <v-col class="mx-0 pa-0">
        <div>0:10</div>
      </v-col>

      <v-col class="mx-5 pa-0">
        <v-progress-linear background-color="grey" color="green" rounded>
        </v-progress-linear>
      </v-col>

      <v-col class="mx-0 pa-0">
        <div>2:10</div>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  methods: {
    togglePlay() {
      this.$store.commit('togglePlay');
    },
  },
};
</script>

<style scoped></style>
