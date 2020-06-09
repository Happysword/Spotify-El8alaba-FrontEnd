<template>
    <div position="absolute">
        <v-card class="mx-auto white--text inline-block PCard"
         max-width="390" height="190" @click="routing()"
         :style="`background: linear-gradient(0deg, ${color} 40%, rgba(30,30,30,1) 100%);`">
            <v-card-title class="font-weight-bold headline display-4">{{ title }}</v-card-title>
            <v-img :src=source class="prefImg">
            </v-img>
            </v-card>
    </div>
</template>

<script>
/* istanbul ignore file */

export default {

  name: 'Genres',
  props: {
    source: String,
    title: String,
    route: String,
    color: String,
  },
  data() {
    return {
      // color: String,
    };
  },
  methods: {
  /**
   * routes to the genre's page
   */
    routing() {
      this.$router.push(`/genre/${this.route}-page`);
    },
  },
};
</script>

<style>
.prefImg {
  height: 130px;
  width: 130px;
  transform: translate( 217% , 0% ) rotate( 25deg );
}
.PCard {
  clip-path: inset(0 0 0 0 round 10px);
}
</style>
