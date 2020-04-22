<template>
      <v-dialog
    v-model="$store.state.dialog"
    max-width="100%"
    dark=""
    overlay-color="black"
    overlay-opacity="0.9"
  >
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
          @click="$store.state.dialog = false"
          >Cancel</v-btn
        >
        <v-btn
          rounded
          depressed
          color="success white--text"
          class="mx-4"
          @click="
            $store.state.dialog = false;
            CreateNewPlaylist();
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
      token: '',
      drawer: true,
      createdPlaylistName: '',
      rules: {
        required: (value) => !!value || 'Required.',
      },
    };
  },
  methods: {
  /** Create a new playlist */
    async CreateNewPlaylist() {
      const token = JSON.parse(localStorage.getItem('currentUser'));
      if (token === null) {
        this.token = 'token';
      } else {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      }
      await client.createNewPlayList({
        name: this.createdPlaylistName,
        public: 'true',
        description: '',
      },
      this.token).then(async (r) => {
        console.log(r);
        this.createdPlaylistName = '';
      });
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('done');
        }, 500);
      });
      client.fetchCurrentUserPlaylists(this.token)
        .then((response) => {
          this.$store.state.userPlaylists = response;
        });
    },
  },
};
</script>
