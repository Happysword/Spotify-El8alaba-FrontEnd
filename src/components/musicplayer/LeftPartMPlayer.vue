<template>
  <div>
    <div>
      <v-card class="mx-4" max-width="270">
        <v-layout justify-center>
          <v-flex align-self-center shrink>
            <router-link
              :to="
                '/home/album/' + $store.state.MusicPlayer.currentSong.albumId
              "
            >
              <v-img
                max-height="70"
                max-width="70"
                :src="$store.state.MusicPlayer.currentSong.image"
                contain
              ></v-img>
            </router-link>
          </v-flex>

          <v-flex align-self-center shrink>
            <router-link
              :to="
                '/home/album/' + $store.state.MusicPlayer.currentSong.albumId
              "
            >
              {{ $store.state.MusicPlayer.currentSong.name }}
            </router-link>

            <router-link
              :to="
                '/home/artist/' + $store.state.MusicPlayer.currentSong.artistId
              "
            >
              {{ $store.state.MusicPlayer.currentSong.artist }}
            </router-link>
          </v-flex>

          <v-flex align-self-center>
            <v-icon color="grey" class="mx-1" dense medium>
              mdi-skip-previous
            </v-icon>

            <v-icon color="grey" class="mx-1" dense medium>
              mdi-skip-previous
            </v-icon>

            <v-icon color="grey" class="mx-1" dense medium>
              mdi-skip-previous
            </v-icon>
          </v-flex>
        </v-layout>
      </v-card>
    </div>

    <div></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
