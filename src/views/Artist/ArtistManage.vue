<template>
  <v-container fluid="">
      <v-toolbar dark="" color="rgba(255, 255, 255, 0)">
          <v-toolbar-title class="display-1 font-weight-bold">Your Albums</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title class="mx-2 subtitle-1">Create An Album</v-toolbar-title>
          <v-dialog
            v-model="dialog"
            max-width="60%"
            dark=""
            overlay-color="black"
            overlay-opacity="0.9"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon="">
                <v-icon color="#D4AF37" v-on="on">mdi-plus-box</v-icon>
              </v-btn>
            </template>
            <v-container>
              <v-row align="center" justify="center">
                <v-subheader
                  class="display-2
      font-weight-bold white--text"
                  mr-5
                  >Create new album</v-subheader
                >
              </v-row>
            </v-container>
            <v-card>
              <v-card-title>
                <span class="title">New Album</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Album Name"
                        required
                        outlined=""
                        v-model="albumName"
                      ></v-text-field>
                      <v-text-field
                        label="Album Label"
                        required
                        outlined=""
                        v-model="albumLabel"
                      ></v-text-field>
                      <span class="subtitle-2 white--text">Genres</span>
                      <v-chip-group
                      mandatory
                      multiple=""
                      active-class="green--text"
                      v-model="albumGenresIndex"
                      >
                        <v-chip v-for="genre in genres" :key="genre">
                          {{ genre }}
                        </v-chip>
                    </v-chip-group>
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
                    CreateNewAlbum();
                  "
                  >Create</v-btn
                >
              </v-row>
            </v-container>
          </v-dialog>
      </v-toolbar>
      <album-bar v-for="(album, index) in artistAlbums.items" :key="index"
       class="my-2" :albumID="album.id" :albumName="album.name"
       @refreshAlbums="refreshTheAlbums"></album-bar>
  </v-container>
</template>

<script>
import client from 'api-client';
import AlbumBar from '../../components/AlbumBar.vue';

export default {
  data() {
    return {
      dialog: false,
      albumName: '',
      albumLabel: '',
      genres: [
        'pop',
        'rap',
        'oriental',
        'electronic',
        'folk',
        'metal',
        'rock',
      ],
      albumType: 'album',
      albumGenresIndex: [],
      albumGenres: [],
      artistAlbums: [],
    };
  },
  components: {
    AlbumBar,
  },
  methods: {
    refreshTheAlbums() {
      this.fetchArtistAlbum(this.token);
    },
    CreateNewAlbum() {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      this.albumGenresIndex.forEach((item) => {
        this.albumGenres.push(this.genres[item]);
      });

      client.createNewAlbum(
        {
          album_type: this.albumType,
          genres: this.albumGenres,
          label: this.albumLabel,
          name: this.albumName,
        },
        this.token,
      )
        .then((r) => {
          console.log(r);
          this.albumGenres = [];
          this.albumGenresIndex = [];
          this.albumName = '';
          this.albumLabel = '';
          this.fetchArtistAlbum(this.token);
        });
    },
    async fetchArtistAlbum(tk) {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      this.artistAlbums = await client.getArtistAlbum(JSON.parse(localStorage.getItem('currentUser')).data._id, tk);
    },
  },
  mounted() {
    const token = JSON.parse(localStorage.getItem('currentUser'));

    if (token === null) {
      this.token = 'token';
    } else {
      this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    }
    this.fetchArtistAlbum(this.token);
  },
};
</script>
