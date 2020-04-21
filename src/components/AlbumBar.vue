<template>
  <v-toolbar dense="">

      <v-dialog
            v-model="dialog2"
            max-width="60%"
            dark=""
            overlay-color="black"
            overlay-opacity="0.9"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon="">
                <v-icon v-on="on">mdi-image-plus</v-icon>
              </v-btn>
            </template>
            <v-container>
              <v-row align="center" justify="center">
                <v-subheader
                  class="display-2
      font-weight-bold white--text"
                  mr-5
                  >Upload Image</v-subheader
                >
              </v-row>
            </v-container>
            <v-card>
              <v-card-title>
                <span class="title">New Image</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-file-input
                        accept="image/*"
                        placeholder="Pick an image"
                        prepend-icon="mdi-image"
                        label="File Input"
                        @change="controlImageFile()"
                        v-model="uploadedImage"
                    ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions> </v-card-actions>
            </v-card>
            <v-container>
              <v-row align="center" justify="center">
                <v-btn
                  rounded
                  depressed
                  outlined
                  class="mx-4"
                  @click="dialog2 = false"
                  >Cancel</v-btn
                >
                <v-btn
                  rounded
                  depressed
                  color="success white--text"
                  class="mx-4"
                  @click="
                    dialog2 = false;
                    UploadNewImage();
                  "
                  >Upload</v-btn
                >
              </v-row>
            </v-container>
          </v-dialog>


      <v-subheader>Album</v-subheader>
        <v-toolbar-title>
            <router-link class="title" :to="albumRoute">{{albumName}}</router-link>
        </v-toolbar-title>
      <v-subheader class="ml-12">Genres</v-subheader>
      <v-toolbar-title class="mx-1" v-for="(genre, index) in albumInfo.genres"
      :key="index">{{genre}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-subheader>Tracks</v-subheader>
      <v-toolbar-title class="mr-2">{{albumInfo.tracks.length}}</v-toolbar-title>

     <v-dialog
            v-model="dialog"
            max-width="60%"
            dark=""
            overlay-color="black"
            overlay-opacity="0.9"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon="">
                <v-icon v-on="on">mdi-plus-box</v-icon>
              </v-btn>
            </template>
            <v-container>
              <v-row align="center" justify="center">
                <v-subheader
                  class="display-2
      font-weight-bold white--text"
                  mr-5
                  >Create new track</v-subheader
                >
              </v-row>
            </v-container>
            <v-card>
              <v-card-title>
                <span class="title">New Track</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Track Name"
                        required
                        outlined=""
                        v-model="trackName"
                      ></v-text-field>
                      <v-file-input
                        accept=".mp3"
                        placeholder="Pick a song"
                        prepend-icon="mdi-music-note"
                        label="File Input"
                        @change="controlMusicFile()"
                        v-model="uploadedSong"
                    ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions> </v-card-actions>
            </v-card>
            <v-container>
              <v-row align="center" justify="center">
                <v-btn
                  rounded
                  depressed
                  outlined
                  class="mx-4"
                  @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  rounded
                  depressed
                  color="success white--text"
                  class="mx-4"
                  @click="
                    dialog = false;
                    CreateNewTrack();
                  "
                  >Create</v-btn
                >
              </v-row>
            </v-container>
          </v-dialog>
    </v-toolbar>
</template>

<script>
import client from 'api-client';

export default {
  props: {
    albumID: String,
    albumName: String,
  },
  computed: {
    albumRoute() {
      return `/album/${this.albumID}`;
    },
  },
  data() {
    return {
      uploadedSong: [],
      uploadedImage: [],
      albumInfo: [],
      dialog: false,
      dialog2: false,
      songDuration: 0,
      trackName: '',
    };
  },
  async mounted() {
    this.albumInfo = await client.fetchAlbum(this.albumID);
    console.log(this.albumID);
  },
  methods: {
    controlImageFile() {
      console.log(this.uploadedImage);
    },
    controlMusicFile() {
      const audio = document.createElement('audio');
      const file = this.uploadedSong;
      const reader = new FileReader();

      reader.onload = function GetSongDuration(e) {
        audio.src = e.target.result;
        audio.addEventListener('loadedmetadata', () => {
          const { duration } = audio;
          this.songDuration = Math.floor(duration * 1000);
        }, false);
      }.bind(this);
      reader.readAsDataURL(file);
    },
    CreateNewTrack() {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }
      const created = client.createTrack(
        {
          name: this.trackName,
          album: this.albumID,
          disc_number: 1,
          duration_ms: this.songDuration,
          explicit: false,
        },
        this.token,
      );
      created.then((res) => {
        const formData = new FormData();
        formData.append('trackId', res.id);
        formData.append('track', this.uploadedSong);
        client.uploadTrack(formData, this.token);
      });
    },
    UploadNewImage() {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      const formData = new FormData();
      formData.append('image', this.uploadedImage);

      client.uploadAlbumImage(formData, this.albumID, this.token);
    },
  },
};
</script>

<style scoped>
.v-toolbar {
    border-radius: 10px;
}
.title {
  color: inherit;
  text-decoration: inherit;
}
</style>
