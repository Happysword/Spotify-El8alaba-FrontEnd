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
          <v-flex
            align-self-center
            shrink
            class="mx-1"
            v-if="!$store.state.MusicPlayer.navBarImage"
          >
            <router-link
              :to="
                '/home/album/' +
                  $store.state.MusicPlayer.currentSong.track.album.artists[0].id
              "
              tag="button"
              :disabled="isLinkDisabled"
              id="image-album"
            >
              <v-img
                max-height="60"
                max-width="60"
                :src="
                  $store.state.MusicPlayer.currentSong.track.album.images[0].url
                "
                contain
                @mouseenter="imageButton = true"
                @mouseleave="imageButton = false"
              >
                <v-icon
                  color="grey"
                  v-show="imageButton"
                  @click="
                    ($store.state.MusicPlayer.navBarImage = true),
                      (isLinkDisabled = false)
                  "
                  @mouseenter="isLinkDisabled = true"
                  @mouseleave="isLinkDisabled = false"
                  >mdi-chevron-up-circle</v-icon
                ></v-img
              >
            </router-link>
          </v-flex>

          <v-flex align-self-center shrink class="mx-2">
            <v-layout justify-center align-center column>
              <router-link
                :to="
                  '/home/album/' +
                    $store.state.MusicPlayer.currentSong.track.album.artists[0]
                      .id
                "
                id="song-name"
              >
                {{ $store.state.MusicPlayer.currentSong.track.name }}
              </router-link>

              <router-link
                :to="
                  '/home/artist/' +
                    $store.state.MusicPlayer.currentSong.track.album.artists[0]
                      .id
                "
                id="artist-name"
              >
                {{
                  $store.state.MusicPlayer.currentSong.track.album.artists[0]
                    .name
                }}
              </router-link>
            </v-layout>
          </v-flex>
          <!-- TODO[@Seif] picture in picture api for hovering picture -->
          <v-flex align-self-center shrink class="mx-1 ml-5">
            <v-icon
              v-if="!heartcolor"
              color="grey"
              @click="changeHeart"
              class="mx-2 info-buttons"
              dense
              medium
              id="heart-outline"
            >
              mdi-heart-outline
            </v-icon>
            <v-icon
              v-else
              color="green"
              @click="changeHeart"
              class="mx-2 info-buttons"
              dense
              medium
              id="heart"
            >
              mdi-heart
            </v-icon>
            <v-snackbar v-model="snackbar" :timeout="timeout" color="#1DB954" id="snack-bar">
              <h3 class="white--text title font-weight-light mx-auto">
                {{ text }}
              </h3>
            </v-snackbar>
            <!-- Removed in new update
            <v-icon color="grey" class="mx-2 info-buttons" dense medium>
              mdi-alpha-x-circle-outline
            </v-icon>
-->
            <v-icon
              :color="hoverPic ? 'green' : 'grey'"
              @click="changeHoverPic"
              class="mx-2 info-buttons"
              dense
              medium
              id="pipButton"
            >
              mdi-picture-in-picture-bottom-right
            </v-icon>
          </v-flex>
        </v-layout>
      </v-card>
    </div>

    <div></div>
  </div>
</template>

<script>
import PlayerRequests from '../../store/modules/MusicPlayer/Requests';

export default {
  data: () => ({
    heartcolor: false,
    hoverPic: false,
    imageButton: false,
    isLinkDisabled: false,
    snackbar: false,
    text: '',
    timeout: 2000,
  }),
  methods: {
    async changeHeart() {
      let R;
      if (this.heartcolor) {
        R = await PlayerRequests.deleteTrack(
          this.$store.state.MusicPlayer.currentPlayback.item.id,
        );
      } else {
        R = await PlayerRequests.saveTrack(
          this.$store.state.MusicPlayer.currentPlayback.item.id,
        );
      }
      if (R) {
        this.heartcolor = !this.heartcolor;
        this.snackbar = true;
        if (this.heartcolor) this.text = 'Added to your Liked Songs';
        else this.text = 'Removed from your Liked Songs';
      }
    },
    changeHoverPic() {
      this.hoverPic = !this.hoverPic; // implement this
    },
  },
};
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
#song-name:hover {
  text-decoration: underline;
}
#artist-name {
  font-size: 13px;
  color: grey;
  font-family: Helvetica Neue, Helvetica, Arial, Hiragino Kaku Gothic Pro,
    Meiryo, MS Gothic, sans-serif;
  text-decoration: none;
  text-align: left;
}
#artist-name:hover {
  color: white;
}
.info-buttons:hover {
  color: white !important;
}
#info-card {
  background-color: transparent;
  border-color: transparent;
}
#snack-bar {
  bottom: 10%;
  left: 38%;
  height: 100px;
  width: 200px;
}
</style>
