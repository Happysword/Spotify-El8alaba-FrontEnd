<template>
    <div absolute >
        <v-card class="d-inline-block mr-3 text-xs-top white--text"
        route :to="route" width=390 height="190" :color=color overflow="hidden">
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
    source: { },
    title: { },
    route: { },
    color: { },
  },
};
</script>

<style>
.prefImg {
  height: 130px;
  width: 130px;
  transform: translate( 240px , -25px ) rotate( -25deg );
},
.GCard{
 background: linear-gradient(0deg,rgba(0,0,0,1) 50%, rgba(1,1,1,1) 100%);
}
</style>
