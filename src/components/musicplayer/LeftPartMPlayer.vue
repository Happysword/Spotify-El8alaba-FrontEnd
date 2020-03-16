<template>
  <div>
    <div>
      <v-card
        class="mx-1 justify-space-between "
        max-width="350"
        id="info-card"
        elevation="0"
      >
        <v-layout justify-start align-center class="mx-0">
          <v-flex align-self-center shrink class="mx-1">
            <router-link
              :to="
                '/home/album/' + $store.state.MusicPlayer.currentSong.albumId
              "
            >
              <v-img
                max-height="60"
                max-width="60"
                :src="$store.state.MusicPlayer.currentSong.image"
                contain
              ></v-img>
            </router-link>
          </v-flex>

          <v-flex align-self-center shrink class="mx-2">
            <v-layout justify-center align-center column>
              <router-link
                :to="
                  '/home/album/' + $store.state.MusicPlayer.currentSong.albumId
                "
                id="song-name"
              >
                {{ $store.state.MusicPlayer.currentSong.name }}
              </router-link>

              <router-link
                :to="
                  '/home/artist/' +
                    $store.state.MusicPlayer.currentSong.artistId
                "
                id="artist-name"
              >
                {{ $store.state.MusicPlayer.currentSong.artist }}
              </router-link>
            </v-layout>
          </v-flex>

          <v-flex align-self-center shrink class="mx-1 ml-5">
            <v-icon color="grey" class="mx-2" dense medium>
              mdi-heart-outline
            </v-icon>

            <v-icon color="grey" class="mx-2" dense medium>
              mdi-alpha-x-circle-outline
            </v-icon>

            <v-icon color="grey" class="mx-2" dense medium>
              mdi-shape-rectangle-plus
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

<style scoped>
#song-name {
  font-size: 13px;
  color: white;
  font-family: Helvetica Neue, Helvetica, Arial, Hiragino Kaku Gothic Pro,
    Meiryo, MS Gothic, sans-serif;
  text-decoration: none;
  text-align: left;
}
#artist-name {
  font-size: 13px;
  color: grey;
  font-family: Helvetica Neue, Helvetica, Arial, Hiragino Kaku Gothic Pro,
    Meiryo, MS Gothic, sans-serif;
  text-decoration: none;
  text-align: left;
}
#info-card {
  background-color: transparent;
  border-color: transparent;
}
</style>
