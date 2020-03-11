<template>
  <v-container fluid>
    <v-row justify="space-around">
      <v-col xs='12' md='6' lg="4">
        <playlistCard></playlistCard>
      </v-col>
      <v-col xs='12' md='6' lg="8" class="my-8">
        <songsCard></songsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import playlistCard from '../../components/playlistCard.vue';
import songsCard from '../../components/mockSongsCard.vue';

export default {
  name: 'Home',
  components: {
    playlistCard,
    songsCard,
  },
};
</script>
