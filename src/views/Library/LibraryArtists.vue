<template>
    <v-container fluid="">
        <v-row>
            <v-col  xs="12" sm="6" md="4" lg="2"
            v-for="card in artistsJson.artists.items" :key="card.id">
                   <artist-card :id="card.id" :profileName="card.name"
                   :images="card.images"
                   :type="card.type"
                   ></artist-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ArtistCard from '../../components/ArtistCard.vue';
import JsonArtists from '../../json/Get-User-Followed-Artists.json';

export default {
  data() {
    return {
      artistsJson: JsonArtists,
    };
  },
  components: {
    ArtistCard,
  },
};
</script>
