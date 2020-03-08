<template>
    <div>
        <v-card  v-for="i in 10" :key="i" class="d-inline-block my-0 mx-auto"
        width="700" color="#60606010" flat>
            <v-card-actions>
                <v-icon color="grey">
                mdi-music-note-outline
                </v-icon>
                <v-card-text class="grey--text"> Song {{i}} </v-card-text>
                <v-card-text class="grey--text" align="end">4:26</v-card-text>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
};
</script>
