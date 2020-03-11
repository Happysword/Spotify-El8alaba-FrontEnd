<template>
    <div absolute >
        <v-card class="d-inline-block mr-3 text-xs-top white--text"
        route :to="route" width=190 height="190" :color=color overflow="hidden">
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
    source: { },
    title: { },
    route: { },
    color: { },
  },
};
</script>

<style>
.rotatedImg {
  height: 80px;
  width: 80px;
  transform: translate( 96px , 32px ) rotate( -25deg );
},
.GCard{
 background: linear-gradient(0deg,rgba(0,0,0,1) 50%, rgba(1,1,1,1) 100%);
}
</style>
