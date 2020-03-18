<template>
    <div position="absolute">
        <v-card class="mx-auto white--text inline-block PCard"
        route :to="route" max-width="390" height="190" :color=color>
            <v-card-title class="font-weight-bold headline display-4">{{ title }}</v-card-title>
            <v-img :src=source class="prefImg">
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
