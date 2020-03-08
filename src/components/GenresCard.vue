<template>
    <div absolute>
        <v-card class="d-inline-block mr-3 text-xs-top"
         dark route :to="route" :color="color" width=190>
            <v-card-title class="font-weight-bold headline">{{ title }}</v-card-title>
            <v-img height="150" :src="source">
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
