<template>
    <v-container fluid="">
        <v-row>
            <v-col  xs="12" sm="6" md="3" lg="2"
            v-for="card in albums.items" :key="card.album.id">
                   <song-card :id="card.album.id" :name="card.album.name"
                   :images="card.album.images" :artistName="card.album.artists[0].name"
                   :type="card.album.type"
                   ></song-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SongCard from '../../components/SongCard.vue';
import JsonAlbums from '../../json/Get-Current-User-Album.json';

export default {
  data() {
    return {
      albums: JsonAlbums,
    };
  },
  components: {
    SongCard,
  },
};
</script>
