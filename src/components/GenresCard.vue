<template>
    <div absolute >
        <v-card class="d-inline-block mr-3 white--text GCard"
        route :to="route" width="190" height="190" :color=color>
            <v-card-title class="font-weight-bold headline">{{ title }}</v-card-title>
            <v-img :src=source class="rotatedImg">
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
.rotatedImg {
  height: 80px;
  width: 80px;
  transform: translate( 160% , 60% ) rotate( 25deg );
}
.GCard{
 clip-path: inset(0 0 0 0 round 5%);
}
</style>
