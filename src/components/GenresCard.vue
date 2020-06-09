<template>
    <div absolute>
        <v-card class="d-inline-block mr-3 white--text GCard"
         width="190" height="190" @click="routing()"
         :style="`background: linear-gradient(0deg, ${color} 30%, rgba(60,60,60,1) 100%);`">
            <v-card-title class="font-weight-bold headline">{{ title }}</v-card-title>
            <v-img :src="source? source : 'https://www.scdn.co/i/_global/twitter_card-default.jpg'"
             class="rotatedImg">
            </v-img>
            </v-card>
    </div>
</template>

<script>

export default {
  name: 'Genres',
  props: {
    source: String,
    title: String,
    route: String,
    color: String,
  },
  methods: {
    /**
   * routes to the genre's page
   */
    routing() {
      this.$router.push(`/genre/${this.route}-page`);
    },
  },
  created() {
    console.log(this.color);
    console.log(this.source);
  },
};
</script>

<style>
.rotatedImg {
  height: 80px;
  width: 80px;
  transform: translate( 160% , 60% ) rotate( 25deg );
}
.GCard{
 clip-path: inset(0 0 0 0 round 5%);
}
</style>
