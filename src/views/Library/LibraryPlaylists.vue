<template>
    <v-container fluid="">
        <v-row>
            <v-col  xs="12" sm="6" md="3" lg="2"  v-for="card in playlists.items" :key="card.id">
                   <song-card :id="card.id" :name="card.name"
                   :description="card.description" :images="card.images"
                   :type="card.type"
                   ></song-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SongCard from '../../components/SongCard.vue';
import JsonPlaylists from '../../json/Get-Current-User-Playlists.json';

export default {
  data() {
    return {
      playlists: JsonPlaylists,
    };
  },
  components: {
    SongCard,
  },
};
</script>
