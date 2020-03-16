<template>
        <v-btn-toggle
          group
          color="white"
          dense
          dark="" rounded=""
        >
          <v-btn :value="selectBarValue" route :to="selectBarRoute"
          class="subtitle-2 font-weight-bold">
            {{ selectBarValue }}
          </v-btn>
        </v-btn-toggle>
</template>

<script>
export default {
  props: {
    selectBarValue: {
      type: String,
      required: true,
    },
    selectBarRoute: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.v-btn-toggle--rounded {
    border-radius: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}
</style>
