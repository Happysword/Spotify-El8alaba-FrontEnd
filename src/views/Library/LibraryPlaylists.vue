<template>
    <v-container fluid="">
        <v-row>
            <v-col  xs="12" sm="6" md="4" lg="3"  v-for="card in playlists.items" :key="card.id">
                   <song-card :id="card.id" :name="card.name"
                   :description="card.description" :images="card.images"
                   ></song-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SongCard from '../../components/SongCard.vue';
import Jsonplaylists from '../../json/Get-Current-User-Playlists.json';

export default {
  data() {
    return {
      playlists: Jsonplaylists,
    };
  },
  components: {
    SongCard,
  },
};
</script>
