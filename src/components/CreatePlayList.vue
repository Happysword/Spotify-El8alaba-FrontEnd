<template>
              <v-dialog
            v-model="dialog"
            max-width="100%"
            dark=""
            overlay-color="black"
            overlay-opacity="0.9"
          >
            <template v-slot:activator="{ on }">
              <v-list-item @click="drawer = !drawer" v-on="on">
                <v-list-item-icon>
                  <v-icon>mdi-plus-box</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2" id="createPlaylist"
                    >Create Playlist</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-container>
              <v-row align="center" justify="center">
                <v-subheader
                  class="display-2
      font-weight-bold white--text"
                  mr-5
                  >Create new playlist</v-subheader
                >
              </v-row>
            </v-container>
            <v-card>
              <v-card-title>
                <span class="title">Playlist Name</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="New Playlist"
                        required
                        outlined=""
                        v-model="createdPlaylistName"
                        :rules="[rules.required]"
                        id="createNewPlaylist"
                      ></v-text-field>
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
                    createNewPlaylist();
                  "
                  >Create</v-btn
                >
              </v-row>
            </v-container>
          </v-dialog>
</template>

<script>
import client from 'api-client';

export default {
  data() {
    return {
      drawer: true,
      createdPlaylistName: '',
      rules: {
        required: (value) => !!value || 'Required.',
      },
    };
  },
  methods: {
  /** Create a new playlist */
    createNewPlaylist() {
      const token = JSON.parse(localStorage.getItem('currentUser'));

      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }

      client
        .createNewPlayList(
          {
            name: this.createdPlaylistName,
            public: 'true',
            description: '',
          },
          this.token,
        )
        .then((r) => {
          console.log(r);
          this.createdPlaylistName = '';
          this.fetchUserPlaylists();
        });
    },
  },
};
</script>
