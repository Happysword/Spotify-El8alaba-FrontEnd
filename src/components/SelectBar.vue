<template>
        <v-btn-toggle
          group
          color="success"
          dense
          dark=""
        >
          <v-btn :value="selectBarValue" route :to="selectBarRoute">
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
