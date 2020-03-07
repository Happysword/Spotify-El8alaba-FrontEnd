<template>
        <v-btn-toggle
          v-model="text"
          group
          color="success"
          dense="true"
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
